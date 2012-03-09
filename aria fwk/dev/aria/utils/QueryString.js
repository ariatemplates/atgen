/*
 * Copyright Amadeus
 */
/**
 * @class aria.utils.QueryString Utils for javascript query strings
 * @extends aria.core.JsObject
 * @singleton
 */
Aria.classDefinition({
	$classpath : 'aria.utils.QueryString',
	$singleton : true,
	$constructor : function () {
		this.keyValues = null;
	},
	$prototype : {
		/**
		 * Parses current query string (from the window where the framework is loaded) and extracts the key values
		 */
		_init : function () {
			var window = Aria.$frameworkWindow;
			if (window != null) {
				this.keyValues = this.parseQueryString(window.location.search);
			} else {
				this.keyValues = {};
			}
		},

		/**
		 * Parses a query string and returns a map of parameter/values.
		 * @param {String} queryString Query string. Can either be empty, or start with a "?" character.
		 * @return {Object}
		 */
		parseQueryString : function (queryString) {
			var res = {};
			if (queryString == null || queryString.length == 0) {
				return res;
			}
			queryString = queryString.substr(1, queryString.length); // remove "?" sign

			var pairs = queryString.split("&");
			for (var i = 0; i < pairs.length; i++) {
				var pair = pairs[i].split('=');
				var key = decodeURIComponent(pair[0]);
				var value = (pair.length == 2) ? decodeURIComponent(pair[1]) : key;
				res[key] = value;
			}
			return res;
		},

		/**
		 * Gets the value of specific query string key (from the window where the framework is loaded,
		 * Aria.$frameworkWindow)
		 * @param {String} key
		 * @return {String}
		 */
		getKeyValue : function (key) {
			if (!this.keyValues) {
				this._init();
			}
			return this.keyValues[key];
		}
	}
});