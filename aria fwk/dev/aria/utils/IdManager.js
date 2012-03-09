/*
 * Copyright Amadeus
 */
/**
 * Handle Id generation
 * @class aria.utils.IdManager
 */
Aria.classDefinition({
	$classpath : 'aria.utils.IdManager',
	$dependencies : ['aria.utils.Array'],

	/**
	 * Constructor
	 * @param {String} prefix
	 */
	$constructor : function (prefix) {
		/**
		 * Map of free ids
		 * @protected
		 * @type Object
		 */
		this._freeIdMap = {};

		/**
		 * Counter for ids when none is free
		 * @protected
		 * @type Number
		 */
		this._idCounter = 0;

		/**
		 * Prefix for the ids
		 * @type String
		 */
		this.prefix = prefix || "";

	},
	$destructor : function () {
		this._freeIdMap = null;
	},
	$prototype : {

		/**
		 * Create a unique id. Either reuse an existing reusable id or create a new one if none exist.
		 */
		getId : function () {
			for (var i in this._freeIdMap) {
				if (!this._freeIdMap.hasOwnProperty(i)) {
					continue;
				}
				delete this._freeIdMap[i];
				return i;
			}
			
			var id = this.prefix + this._idCounter;
			this._idCounter++;
			return id;
		},

		/**
		 * Release an id (register it to be reused).
		 * @param {String} id
		 */
		releaseId : function (id) {
			if (id) {
				this._freeIdMap[id] = true;
			}
		}
	}
});