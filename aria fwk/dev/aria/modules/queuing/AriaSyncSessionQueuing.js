/*
 * Copyright Amadeus
 */
/**
 * Simple one at a time implementation, cancel any new request, Sync with Aria (equivalent to aria USER_ACTION)
 */
Aria.classDefinition({
	$classpath : "aria.modules.queuing.AriaSyncSessionQueuing",
	$dependencies : ["aria.utils.Function", "aria.modules.RequestMgr"],
	$constructor : function () {
		/**
		 * Map a given id with a session
		 * @protected
		 * @type Object
		 */
		this._idSessionMap = {};

		/**
		 * Map of session id and associated queues
		 * @protected
		 * @type Object
		 */
		this._sessionQueues = {};

		/**
		 * First check
		 * @protected
		 * @type Boolean
		 */
		this._mixedModeCheck = false;
	},
	$statics : {
		/**
		 * Session id key when no session id is available
		 * @type String
		 */
		NO_SESSION_ID_KEY : '1'
	},
	$destructor : function () {
		this._idSessionMap = null;
		this._sessionQueues = null;

		// hijack handleNextRequest to prevent unexpected behaviours
		this.handleNextRequest = function () {};
	},
	$prototype : {

		/**
		 * Execute the request if possible, otherwise discard it
		 * @param {Object} requestObject
		 * @param {Object} jsonData
		 * @param {aria.core.JsObject.Callback} callback for this request
		 * @param {Object} session This param is DEPRECATED, use requestObject instead.
		 * @param {Object} requestHandler This param is DEPRECATED, use requestObject instead.
		 * @return {Integer} queuing status : executed / queued / discarded
		 */
		pushRequest : function (requestObject, jsonData, cb) {
			var queue, sessionId = requestObject.session.id;

			// can only be used in mixed mode. As Aria might be loaded after AT, check this only now
			var a = Aria.$window.a; // Global a variable in the view frame (we guess Aria JSP will be there)
			if (!this._mixedModeCheck) {
				if (typeof a == 'undefined' || !a.actionQueueImpl || !a.actionQueueImpl.lockQueue) {
					this.$logError("Mixed Mode with Aria is not Enabled");
				} else {
					this._mixedModeCheck = true;
				}
			}

			if (!sessionId) {
				sessionId = this.NO_SESSION_ID_KEY;
			}

			queue = this._getQueue(sessionId);

			if (queue.length > 0) {
				// case 1: The queue is not empty, put the request in queue
				queue.push({
					requestObject : requestObject,
					jsonData : jsonData,
					cb : cb
				});
				return aria.modules.RequestMgr.QUEUE_STATUS;
			} else {
				// case 2: queue is empty
				// if aria ssa is not available -> queue
				if (!a.actionQueueImpl.isSsaAvailable(null, sessionId)) {

					// define proper callback to handle the queue when
					if (queue.length == 0) {
						// define handler
						a.actionQueueImpl.setExternalHandler(aria.utils.Function.bind(this.__handleQueue, this, sessionId), sessionId);
					}

					queue.push({
						requestObject : requestObject,
						jsonData : jsonData,
						cb : cb
					});
					return aria.modules.RequestMgr.QUEUE_STATUS;

				} else {
					// case 3: no request ongoing, and ssa available: go for it
					var requestId = this._sendRequest(requestObject, jsonData, cb);
					if (requestId === aria.modules.RequestMgr.ERROR_STATUS) {
						return requestId;
					} else {
						a.actionQueueImpl.lockQueue(sessionId);
						// This request is ongoing
						this._idSessionMap[requestId] = sessionId;
						queue.push(requestId);
						return aria.modules.RequestMgr.EXECUTE_STATUS;
					}
				}
			}

		},

		/**
		 * Handle the following request in the queue if any.
		 * @param {String} id finishing request id
		 */
		handleNextRequest : function (id) {
			// this check is for early disposal
			if (!this._idSessionMap) {
				return;
			}
			// retrieve id
			var sessionId = this._idSessionMap[id], next, nextId;
			if (sessionId) {
				delete this._idSessionMap[id];

				// execute next in queue and clean it
				var empty = this.__handleQueue(sessionId, id);
				if (empty) {
					// no more element in queue -> remove handler, give the hand back to aria
					var a = Aria.$window.a; // Global a variable in the view frame (we guess Aria JSP will be there)
					a.actionQueueImpl.setExternalHandler(null, sessionId);
					a.actionQueueImpl.unLockQueue(sessionId);
				}
			} else {
				// log Error
			}
		},

		/**
		 * Find next request in queue for given session Id, and execute it
		 * @param {String} sessionId
		 * @param {String} removeId optional request Id to remove from the queue
		 * @return {Boolean} true if is empty
		 */
		__handleQueue : function (sessionId, removeId) {
			var next, nextId;
			var queue = this._getQueue(sessionId);
			if (removeId) {
				// queue should exists and it first element should be id
				this.$assert(135, queue && queue.length > 0);
				this.$assert(136, queue[0] === removeId);
				// remove element
				queue.splice(0, 1);
			}
			while (queue.length > 0) {
				next = queue[0];
				nextId = this._sendRequest(next.requestObject, next.jsonData, next.cb);
				if (nextId === aria.modules.RequestMgr.ERROR_STATUS) {
					queue.splice(0, 1);
				} else {
					this._idSessionMap[nextId] = sessionId;
					queue[0] = nextId;
					break;
				}
			}

			// return true if queue is empty
			return (!queue.length);
		},

		/**
		 * Send an unqueued request
		 * @protected
		 * @param {Object} requestObject
		 * @param {Object} jsonData
		 * @param {aria.core.JsObject.Callback} callback for this request
		 * @return {Integer} request id
		 */
		_sendRequest : function (requestObject, jsonData, cb) {
			return aria.modules.RequestMgr.sendJsonRequest(requestObject, jsonData, cb);
		},

		/**
		 * Get a queue object for this session id. By default every session gives a new queue.
		 * @param {String} session Id of the session
		 * @return {Array}
		 */
		_getQueue : function (session) {
			if (!this._sessionQueues[session]) {
				this._sessionQueues[session] = [];
			}

			return this._sessionQueues[session];
		}
	}
});