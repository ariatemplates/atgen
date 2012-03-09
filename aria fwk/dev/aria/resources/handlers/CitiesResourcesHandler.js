/*
 * Copyright Amadeus
 */
(function () {

	// Shortcuts
	var downloadManager;
	var appEnv;
	var stringUtil;

	/**
	 * Resources handler for Cities suggestions.
	 * @class aria.resources.handlers.CitiesResourcesHandler.
	 */
	Aria.classDefinition({
		$classpath : 'aria.resources.handlers.CitiesResourcesHandler',
		$dependencies : ['aria.core.DownloadMgr', 'aria.utils.String',
				'aria.resources.handlers.CitiesResourcesHandlerBean'],
		$constructor : function () {

			/**
			 * Minimum number of input characters to return suggestions.
			 * @type {Number}.
			 */
			this.threshold = 3;

		},

		$statics : {

			/**
			 * Suggestion bean that validates a given suggestion.
			 * @type String.
			 */
			SUGGESTION_BEAN : "aria.resources.handlers.CitiesResourcesHandlerBean.Suggestion",

			/**
			 * Test if entry starts with a latin letter
			 * @type {RegExp}
			 */
			LATIN_CHAR_REGEXP : /^[a-z]/i
		},
		$onload : function () {
			downloadManager = aria.core.DownloadMgr;
			appEnv = aria.core.environment.Environment;
			stringUtil = aria.utils.String;
		},
		$onunload : function () {
			downloadManager = null;
			appEnv = null;
			stringUtil = null;
		},
		$prototype : {

			/**
			 * Call the callback with an array of suggestions in its arguments. Suggestions that are exact match are
			 * marked with parameter exactMatch set to true.
			 * @param {String} textEntry.
			 * @param {Function} callback.
			 */
			getSuggestions : function (textEntry, callback) {
				var valid = false;
				var firstChar;
				if (textEntry) {
					firstChar = textEntry.charAt(0).toUpperCase();
					valid = true;
					if (!this.LATIN_CHAR_REGEXP.test(firstChar)) {
						// PTR 04842957: russian (and other non-latin characters) must be correctly handled
						firstChar = firstChar.charCodeAt(0);
						if (firstChar < 128) {
							valid = false;
						}
					}
				}

				if (valid) {
					var region = appEnv.getRegion(), logicalPath;
					textEntry = stringUtil.stripAccents(textEntry).toLowerCase();
					logicalPath = Aria.FRAMEWORK_RESOURCES + 'IATANonIATACities/' + region + '/' + firstChar + '.txt';

					downloadManager.loadFile(logicalPath, {
						fn : this._onResourceReceive,
						scope : this,
						args : {
							textEntry : textEntry,
							callback : callback,
							logicalPath : logicalPath
						}
					});

				} else {
					this.$callback(callback, null);
				}
			},

			/**
			 * Returns the classpath of the default template for this resourceHandler
			 * @return {String}
			 */
			getDefaultTemplate : function () {
				return 'aria.widgets.form.list.templates.CitiesList';
			},

			/**
			 * Call for a search of the suggestions when the appropriate resource has been loaded
			 * @param {Event} evt
			 * @param {Object} args textEntry and suggestions callback
			 * @protected
			 */
			_onResourceReceive : function (evt, args) {
				var textEntry = args.textEntry, callback = args.callback;
				if (!evt.downloadFailed) {
					var res = aria.core.DownloadMgr.getFileContent(args.logicalPath);
					var suggestions = this._getSuggestions(textEntry, res);
					this.$callback(callback, suggestions);
				} else {
					this.$callback(callback, null);
				}
			},

			/**
			 * Get suggestions which match with the query string.
			 * @param {String} matchingString The matching string.
			 * @param {String} res The complete XHR string to parse.
			 * @return {Array} tRes An array of Suggestion objects
			 * @protected
			 */
			_getSuggestions : function (matchingString, res) {

				// Return out as not enough input characters provided
				if (matchingString.length < this.threshold) {
					return null;
				}

				// No resources corresponding to this suggestions, return an empty array
				if (res == null) {
					return [];
				}

				matchingString = decodeURIComponent(matchingString);
				var tRes = [];

				// Search by Code
				if (matchingString.length < 4) {
					var itemSeparator = '#' + matchingString.toUpperCase();
					this._searchSuggestion(res, itemSeparator, tRes, true);
				}

				// Perfect matches
				if (matchingString.length == 3) {
					for (var index = 0, l = tRes.length; index < l; index++) {
						tRes[index].exactMatch = true;
					}
				}

				var dataSeparator = ",";
				var lastIsExtraChar = true;
				for (var i = 0; i < matchingString.length; i++) {
					if (lastIsExtraChar) {
						lastIsExtraChar = false;
						dataSeparator += matchingString.charAt(i).toUpperCase();
					} else {
						dataSeparator += matchingString.charAt(i).toLowerCase();
					}
					if (matchingString.charAt(i) == ' ') {
						lastIsExtraChar = true;
					}
				}

				this._searchSuggestion(res, dataSeparator, tRes, false);

				return tRes;
			},

			/**
			 * Search for a given entry in the resource string.
			 * @param {String} res The complete XHR string to parse.
			 * @param {String} stringToSearch String to search.
			 * @param {Array} tRes An array of Suggestion objects.
			 * @param {Boolean} exactMatch An indicator to determine if an exact match has been made.
			 * @param {Number} newPosition Contains the new start position when looking for a city.
			 * @param {Number} positionNumber The current position.
			 * @protected
			 */
			_searchSuggestion : function (res, stringToSearch, tRes, exactMatch, newPosition, positionNumber) {
				var city;
				// Original results are stored with accents
				var backupRes = res;

				// Accents are stripped for search
				res = stringUtil.stripAccents(res);
				var positionNumber = (positionNumber) ? positionNumber : res.indexOf(stringToSearch);
				while (positionNumber != -1) {

					// Get iata code
					var positionStartIataCode = res.lastIndexOf('#', positionNumber) + 1;
					var iataCode = res.substr(positionStartIataCode, 3);

					// Get city name
					var positionStartCityName = (newPosition) ? newPosition : res.indexOf(",", positionStartIataCode)
							+ 1;

					city = this._getCityName(backupRes, positionStartCityName, stringToSearch, exactMatch);

					if (city.newPosition) {
						this._searchSuggestion(backupRes, stringToSearch, tRes, exactMatch, city.newPosition, positionNumber);
						break;
					} else if (newPosition) {
						newPosition = null;
					}

					var cityName = city.name;

					// Get country code
					var positionStartCountryCode = res.lastIndexOf('[', positionNumber) + 1;
					var countryCode = res.substr(positionStartCountryCode, 2);
					// Get country name
					var countryCodeName = this._getCountryName(backupRes, positionStartCountryCode + 2);

					// Get state code
					var positionStartStateCode = res.lastIndexOf(']', positionNumber) + 1;
					var stateCode = "";
					var stateName = "";
					if (positionStartStateCode != -1 && positionStartStateCode > positionStartCountryCode) {
						stateCode = res.substr(positionStartStateCode, 2);
						// Get state name
						var positionEndStateName = res.indexOf('#', positionStartStateCode);
						stateName = res.substring(positionStartStateCode + 2, positionEndStateName);
					}

					// Get Type
					positionStartIataCode += 3; // Move on type position

					var type = res.charAt(positionStartIataCode);

					if (type === '(') {
						this._addSuggestion(tRes, iataCode, cityName, stateCode, stateName, countryCode, countryCodeName);
					}

					// Next name
					positionNumber++;
					positionNumber = res.indexOf(stringToSearch, positionNumber);
				}
			},

			/**
			 * Retrieve information on an element from its position in the resource string.
			 * @param {String} resourceString The resource string.
			 * @param {Number} position the starting position of the city name.
			 * @param {String} stringToSearch String to search.
			 * @param {Boolean} exactMatch An indicator to determine if an exact match has been made.
			 * @return {Object} Contains either the city name or the new position from which to search again
			 * @protected
			 */
			_getCityName : function (resourceString, position, stringToSearch, exactMatch) {

				var name = "";
				if (!exactMatch) {
					var nameCheck = stringToSearch.slice(1, stringToSearch.length);
				}

				var position1 = resourceString.indexOf(',', position);
				var position2 = resourceString.indexOf('#', position);
				var position3 = resourceString.indexOf('[', position);
				var position4 = resourceString.indexOf(']', position);

				if (position1 == -1) {
					position1 = resourceString.length;
				}
				if (position2 == -1) {
					position2 = resourceString.length;
				}
				if (position3 == -1) {
					position3 = resourceString.length;
				}
				if (position4 == -1) {
					position4 = resourceString.length;
				}

				if (position2 < position1) {
					position1 = position2;
				}
				if (position3 < position1) {
					position1 = position3;
				}
				if (position4 < position1) {
					position1 = position4;
				}

				name = resourceString.substring(position, position1);

				if (exactMatch) {
					return {
						name : name
					};
				}

				if (name.indexOf(nameCheck) === 0) {
					return {
						name : name
					};
				}

				var newPosition = position1 + 1;

				return {
					newPosition : newPosition
				};

			},

			/**
			 * Retrieve the name of the country with the position of an element in the resource string.
			 * @param {String} resourceString The resource string.
			 * @param {Number} position The position
			 * @return {String}
			 * @protected
			 */
			_getCountryName : function (resourceString, position) {

				var position1 = resourceString.indexOf('#', position);
				var position2 = resourceString.indexOf(']', position);

				if (position1 == -1) {
					position1 = resourceString.length;
				}
				if (position2 == -1) {
					position2 = resourceString.length;
				}

				if (position2 < position1) {
					position1 = position2;
				}
				return resourceString.substring(position, position1);
			},

			/**
			 * Store a valid suggestion.
			 * @param {Array} tRes The existing suggestions list.
			 * @param {String} iata
			 * @param {String} cityName
			 * @param {String} stateCode
			 * @param {String} stateName
			 * @param {String} countryCode
			 * @param {String} countryName
			 * @protected
			 */
			_addSuggestion : function (tRes, iata, cityName, stateCode, stateName, countryCode, countryName) {

				for (var index = 0, l = tRes.length, existing; index < l; index++) {
					existing = tRes[index];
					if (existing.iata == iata) {
						return;
					}
				}
				tRes.push({
					iata : iata,
					cityName : cityName,
					stateCode : stateCode,
					stateName : stateName,
					countryCode : countryCode,
					countryName : countryName
				});
			},

			/**
			 * Provide a label for given suggestion. Used to fill the textfield of the autocomplete
			 * @param {Object} suggestion
			 * @return {String}
			 */
			suggestionToLabel : function (suggestion) {
				if (suggestion.cityName) {
					return suggestion.cityName + " (" + suggestion.iata + ")";
				} else {
					return suggestion.iata;
				}
			}
		}
	});
})();