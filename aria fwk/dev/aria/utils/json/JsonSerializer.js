/*
 * Copyright Amadeus
 */
/**
 * Utility to convert data to a JSON string
 * @class aria.utils.json.JsonSerializer
 * @extends aria.core.JsObject
 */
Aria.classDefinition({
	$classpath : "aria.utils.json.JsonSerializer",
	$dependencies : ["aria.utils.Type"],
	$constructor : function () {

		/**
		 * Shortcut to the framework type util
		 * @protected
		 * @type {aria.utils.Type}
		 */
		this._typeUtil = aria.utils.Type;
	},
	$prototype : {

		/**
		 * Normalize the options by calling the protected method _normalizeOptions and call the protected method
		 * _serialize
		 * @public
		 * @param {Object|Array|String|Number|Boolean|Date|RegExp|Function} item item to serialize
		 * @param {aria.utils.json.JsonSerializerBeans.JsonSerializeOptions} options options for the serialization
		 * @return {String} the serialized item. It is set to null if there is an error during the serialization
		 */
		serialize : function (item, options) {
			options = (options) ? options : {};
			this._normalizeOptions(options);
			return this._serialize(item, options);
		},

		/**
		 * Normalize the options given to serialize
		 * @protected
		 * @param {aria.utils.json.JsonSerializerBeans.JsonSerializeOptions} options
		 */
		_normalizeOptions : function (options) {
			options["indent"] = ("indent" in options) ? options["indent"] : "";
			options["maxDepth"] = ("maxDepth" in options) ? options["maxDepth"] : 100;
			options["escapeKeyNames"] = ("escapeKeyNames" in options) ? options["escapeKeyNames"] : true;
			options["encodeParameters"] = ("encodeParameters" in options) ? options["encodeParameters"] : false;
			options["reversible"] = ("reversible" in options) ? options["reversible"] : false;
			options["serializedDatePattern"] = ("serializedDatePattern" in options)
					? options["serializedDatePattern"]
					: "yyyy/MM/dd HH:mm:ss";
			options["keepMetadata"] = options["keepMetadata"] === true;
		},

		/**
		 * Internal method to be called recursively in order to serialize an item. I does not perform options
		 * normalization
		 * @protected
		 * @param {Object|Array|String|Number|Boolean|Date|RegExp} item item to serialize
		 * @param {aria.utils.json.JsonSerializerBeans.JsonSerializeAdvancedOptions} options options for the
		 * serialization
		 * @return {String} the serialized item. It is set to null if there is an error during the serialization
		 */
		_serialize : function (item, options) {

			if (item === null) {
				return this._serializeNull(options);
			}
			if (this._typeUtil.isBoolean(item)) {
				return this._serializeBoolean(item, options);
			}
			if (this._typeUtil.isNumber(item)) {
				return this._serializeNumber(item, options);
			}
			if (this._typeUtil.isString(item)) {
				return this._serializeString(item, options);
			}
			if (this._typeUtil.isDate(item)) {
				return this._serializeDate(item, options);
			}
			if (this._typeUtil.isRegExp(item)) {
				return this._serializeRegExp(item, options);
			}
			if (this._typeUtil.isArray(item)) {
				return this._serializeArray(item, options);
			}
			if (this._typeUtil.isObject(item)) {
				return this._serializeObject(item, options);
			}
			if (this._typeUtil.isFunction(item)) {
				return this._serializeFunction(item, options);
			}

			return '"[' + typeof(item) + ']"';
		},

		/**
		 * Protected method that is called whenever an object has to be serialized
		 * @protected
		 * @param {Object} item object to serialize
		 * @param {aria.utils.json.JsonSerializerBeans.JsonSerializeAdvancedOptions} options options for the
		 * serialization
		 * @return {String} the serialized item. It is set to null if there is an error during the serialization
		 */
		_serializeObject : function (item, options) {
			var indent = options.indent, output, baseIndent = (options.baseIndent) ? options.baseIndent : "";
			var subIndent = (indent) ? baseIndent + indent : null;

			if (options.maxDepth < 1) {
				if (options.reversible) {
					return null;
				}
				return '{...}';
			}
			var res = ["{"];
			if (indent) {
				res.push("\n");
			}
			var isEmpty = true;

			for (var key in item) {
				if (item.hasOwnProperty(key) && this.__preserveObjectKey(key, options)) {
					isEmpty = false;
					if (indent) {
						res.push(subIndent);
					}

					if (options.escapeKeyNames || key.match(/\:/)) {
						res.push('"' + key + '":');
					} else {
						res.push(key + ':');
					}
					var newOptions = aria.utils.Json.copy(options, true);
					newOptions.baseIndent = subIndent;
					newOptions.maxDepth = options.maxDepth - 1;
					output = this._serialize(item[key], newOptions);
					if (output === null) {
						return null;
					}
					res.push(output);
					if (indent) {
						res.push(",\n");
					} else {
						res.push(',');
					}

				}
			}
			if (!isEmpty) {
				res[res.length - 1] = ""; // remove last ','
			}
			if (indent) {
				res.push("\n" + baseIndent + "}");
			} else {
				res.push("}");
			}
			return res.join('');

		},

		/**
		 * Wheter a key should be serialized in the result object or not. Metadata might be excluded depending on the
		 * options.
		 * @param {String} key Key name
		 * @param {aria.utils.json.JsonSerializerBeans.JsonSerializeAdvancedOptions} options options for the
		 * serialization
		 * @return {Boolean}
		 * @private
		 */
		__preserveObjectKey : function (key, options) {
			if (!options.keepMetadata) {
				return !aria.utils.Json.isMetadata(key);
			}
			return true;
		},

		/**
		 * Protected method that is called whenever an array has to be serialized
		 * @protected
		 * @param {Array} item array to serialize
		 * @param {aria.utils.json.JsonSerializerBeans.JsonSerializeAdvancedOptions} options options for the
		 * serialization
		 * @return {String} the serialized item. It is set to null if there is an error during the serialization
		 */
		_serializeArray : function (item, options) {
			var indent = options.indent, output, baseIndent = (options.baseIndent) ? options.baseIndent : "";
			var subIndent = (indent) ? baseIndent + indent : null;

			if (options.maxDepth < 1) {
				if (options.reversible) {
					return null;
				}
				return '[...]';
			}
			var sz = item.length;
			if (sz === 0) {
				return "[]";
			} else {
				var res = ["["];
				if (indent) {
					res.push("\n");
				}
				for (var i = 0; sz > i; i++) {
					if (indent) {
						res.push(subIndent);
					}
					var newOptions = aria.utils.Json.copy(options, true);
					newOptions.baseIndent = subIndent;
					newOptions.maxDepth = options.maxDepth - 1;
					output = this._serialize(item[i], newOptions);
					if (output === null) {
						return null;
					}
					res.push(output);
					if (i != sz - 1) {
						res.push(",");
						if (indent) {
							res.push("\n");
						}
					}
				}
				if (indent) {
					res.push("\n" + baseIndent + "]");
				} else {
					res.push("]");
				}
			}
			return res.join('');

		},

		/**
		 * Protected method that is called whenever a string has to be serialized
		 * @protected
		 * @param {String} item string to serialize
		 * @param {aria.utils.json.JsonSerializerBeans.JsonSerializeAdvancedOptions} options options for the
		 * serialization
		 * @return {String} the serialized item. It is set to null if there is an error during the serialization
		 */
		_serializeString : function (item, options) {
			var stringContent;
			item = item.replace(/([\\\"])/g, "\\$1").replace(/(\r)?\n/g, "\\n");
			if (options.encodeParameters === true) {
				stringContent = encodeURIComponent(item);
			} else {
				stringContent = item;
			}

			return '"' + stringContent + '"';
		},

		/**
		 * Protected method that is called whenever a number has to be serialized
		 * @protected
		 * @param {Number} item number to serialize
		 * @param {aria.utils.json.JsonSerializerBeans.JsonSerializeAdvancedOptions} options options for the
		 * serialization
		 * @return {String} the serialized item. It is set to null if there is an error during the serialization
		 */
		_serializeNumber : function (item, options) {
			return item + '';
		},

		/**
		 * Protected method that is called whenever a boolean has to be serialized
		 * @protected
		 * @param {Boolean} item boolean to serialize
		 * @param {aria.utils.json.JsonSerializerBeans.JsonSerializeAdvancedOptions} options options for the
		 * serialization
		 * @return {String} the serialized item. It is set to null if there is an error during the serialization
		 */
		_serializeBoolean : function (item, options) {
			return (item) ? 'true' : 'false';
		},

		/**
		 * Protected method that is called whenever a date has to be serialized
		 * @protected
		 * @param {Date} item date to serialize
		 * @param {aria.utils.json.JsonSerializerBeans.JsonSerializeAdvancedOptions} options options for the
		 * serialization
		 * @return {String} the serialized item. It is set to null if there is an error during the serialization
		 */
		_serializeDate : function (item, options) {
			if (options.reversible || !aria.utils.Date) {
				return 'new Date(' + item.getTime() + ')';
			} else {
				return '"' + aria.utils.Date.format(item, options.serializedDatePattern) + '"';
			}
		},

		/**
		 * Protected method that is called whenever a regexp has to be serialized
		 * @protected
		 * @param {RegExp} item regexp to serialize
		 * @param {aria.utils.json.JsonSerializerBeans.JsonSerializeAdvancedOptions} options options for the
		 * serialization
		 * @return {String} the serialized item. It is set to null if there is an error during the serialization
		 */
		_serializeRegExp : function (item, options) {
			return item + "";
		},

		/**
		 * Protected method that is called whenever a function has to be serialized
		 * @protected
		 * @param {Function} item function to serialize
		 * @param {aria.utils.json.JsonSerializerBeans.JsonSerializeAdvancedOptions} options options for the
		 * serialization
		 * @return {String} the serialized item. It is set to null if there is an error during the serialization
		 */
		_serializeFunction : function (item, options) {
			return '"[function]"';
		},

		/**
		 * Protected method that is called whenever null has to be serialized
		 * @protected
		 * @param {aria.utils.json.JsonSerializerBeans.JsonSerializeAdvancedOptions} options options for the
		 * serialization
		 * @return {String} the serialized item. It is set to null if there is an error during the serialization
		 */
		_serializeNull : function () {
			return 'null';
		}
	}
});