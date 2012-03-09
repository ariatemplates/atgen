/*
 * Copyright Amadeus
 */
/**
 * Utils for general Objects/Map
 * @class aria.utils.Object
 * @extends aria.core.JsObject
 * @singleton
 */
Aria.classDefinition({
	$classpath : "aria.utils.Object",
	$singleton : true,
	$constructor : function () {},
	$prototype : {
		/**
		 * Returns an array of all own enumerable properties found upon a given object, in the same order as that provided by a for-in loop.
		 * @public
		 * @param {Object} object
		 * @return {Array}
		 */
		keys : (Object.keys) ? function (object) {
			if (!aria.utils.Type.isObject(object)) {
				return [];
			}

			return Object.keys(object);
		} : function (object) {
			if (!aria.utils.Type.isObject(object)) {
				return [];
			}
			var enumKeys = [];
			for (var key in object) {
				if (object.hasOwnProperty(key)) {
					enumKeys.push(key);
				}
			}
			return enumKeys;
		},

		/**
		 * Returns true if the object has no own enumerable properties
		 * @public
		 * @param {Object} object
		 * @return {Boolean}
		 */
		isEmpty : function (object) {
			var keys = this.keys(object);
			return (keys.length == 0) ? true : false;
		}
	}
});