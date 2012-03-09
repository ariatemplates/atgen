/*
 * Copyright Amadeus
 */
/**
 * This class implements a basic Resource provider as defined by the specs at
 * http://topspot/index.php/AriaTemplates_spec_-_CR_4131733_-_Handling_global/shared_configuration_data_in_modules#Interfaces
 * @class aria.resources.providers.BaseProvider
 */
Aria.classDefinition({
	$classpath : 'aria.resources.providers.BaseProvider',
	$constructor : function () {
		/**
		 * The handler is a key used to identifies a family of provider. For SEP provider, its also used during the
		 * request as part of the url.
		 * @protected
		 * @type String
		 */
		this._handler = "_no_handler_";
	},
	$destructor : function () {
		this._resources = null;
	},
	$statics : {
		// ERROR MESSAGE:
		METHOD_NOT_IMPLEMENTED : "Class '%1' has no implementation of method '%2', required by '%3'.",
		MISSING_RESOURCES : "This provider was called without specifying resources. Check %1.",

		/**
		 * Simple global key-value store. Shared by all providers.
		 * @protected
		 * @type Object
		 */
		_beans : {},

		/**
		 * Data is stored specific to handler/resource e.g. Shared by all providers.
		 * 
		 * <pre>
		 *  {
		 *  	'/handler/1' : {
		 *  		resA :  {
		 *  			label1: 'ok'  
		 *  		}
		 *  	},
		 *  	'/handler/2' : {
		 *  		resB : {
		 *  			label1: 'myvalue'
		 *  		},
		 *  		resC: { }
		 *  	 }
		 *  }
		 * </pre>
		 * 
		 * @protected
		 * @type Object
		 */
		_data : {}

	},
	$prototype : {

		/**
		 * Sets the handler (base used to store resources)
		 * @param {String} handler e.g. /[host]/[webApp]/[apf+ servlet]/
		 */
		setHandler : function (handler) {
			this._handler = handler || "";
		},

		/**
		 * Sets the resources will be requested at the handler
		 * @param {Array} resources
		 */
		setResources : function (resources) {
			this._resources = resources || [];
		},

		/**
		 * Fetches data using previously defined handler and resources list. WARNING: not for use by template
		 * developers. Use refreshData instead().
		 * @param {aria.core.JsObject.Callback} cb Called when the data has been fetched
		 * @param {String} caller [Internal] The class which declared the resource provider (used by Aria.js)
		 * @param {Boolean} isRefresh true if data needs to be refreshed
		 */
		fetchData : function (cb, caller, isRefresh) {
			this._dataLoaded = false;

			// var resources = this._resources;
			var resources = [];

			if (!this._resources || this._resources.length == 0) {
				return this.$logError(this.MISSING_RESOURCES, [caller]);
			}

			// TODO we don't account for multiple concurrent requests
			if (this._data[this._handler] == null) {
				resources = this._resources;
			} else {
				for (var i = 0; i < this._resources.length; i++) {
					if (this._data[this._handler][this._resources[i]] == null || isRefresh == true) {
						// either the resource has not been downloaded
						// yet or this is a refresh: download it
						resources.push(this._resources[i]);
					}
				}
			}
			if (resources.length > 0) {
				this._downloadResources(cb, caller, resources);
			} else {
				this.$callback(cb, caller);
			}
		},

		/**
		 * Fetches data using previously defined handler and resources list. *To be implemented by developers*.
		 * @protected
		 * @param {aria.core.JsObject.Callback} cb Called when the data has been fetched
		 * @param {String} caller [Internal] The class which declared the resource provider (used by Aria.js)
		 * @param {Array} the list of available resources
		 */
		_downloadResources : function (cb, caller, resources) {
			this.$logWarn(this.METHOD_NOT_IMPLEMENTED, [this.$classpath, '_downloadResources',
					'aria.resources.providers.BaseProvider']);
		},

		/**
		 * Set Json data into internal data structures.
		 * @param {Object} respJson
		 */
		setJsonData : function (respJson) {
			// this will print an error on the logs if the JSON is not
			// valid.
			// can't catch the exception though as it is masked
			var data = this._data;
			if (data[this._handler] == null) {
				data[this._handler] = {};
			}

			// add individual resources
			for (var res in respJson) {
				if (respJson.hasOwnProperty(res)) {
					data[this._handler][res] = respJson[res];
				}
			}

			this._dataLoaded = true;
		},

		/**
		 * Refresh the data defined by the handler and resources defined by this instance.
		 * @param {aria.core.JsObject.Callback} cb
		 */
		refreshData : function (cb) {
			this.fetchData(cb, null, true);
		},

		/**
		 * Internal function called by getData() [which is "defined" in Aria.js] WARNING: Template developers should use
		 * getData() instead.
		 * @private
		 * @param {aria.core.JsObject} caller The class which declared the resource provider.
		 * @return {Object}
		 */
		__getData : function (caller) {
			var result = {};
			var resName = null;
			for (var i = 0; i < this._resources.length; i++) {
				resName = this._resources[i];
				result[resName] = this._data[this._handler][resName];
			}
			return result;
		},

		/**
		 * Returns true if data has been succesfully loaded. If a data refresh has been issued, will return false until
		 * the new data has been loaded.
		 * @return {Boolean}
		 */
		dataLoaded : function () {
			return this._dataLoaded;
		},

		/**
		 * Sets the value for a global bean
		 * @param {String} bean
		 * @param {Object} value
		 */
		setBean : function (bean, value) {
			this._beans[bean] = value;
		},

		/**
		 * Gets the value for a global bean
		 * @param {String} bean
		 * @return {Object}
		 */
		getBean : function (bean) {
			return this._beans[bean];
		}
	}

});
