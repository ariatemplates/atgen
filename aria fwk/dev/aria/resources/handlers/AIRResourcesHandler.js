/*
 * Copyright Amadeus
 */
(function () {

	// Shortcuts
	var downloadManager;
	var appEnv;
	var stringUtil;

	/**
	 * Resources handler for AIR suggestions.
	 */
	Aria.classDefinition({
		$classpath : "aria.resources.handlers.AIRResourcesHandler",
		$dependencies : ["aria.core.DownloadMgr", "aria.utils.String",
				"aria.resources.handlers.AIRResourcesHandlerBean", "aria.core.environment.Environment"],
		$constructor : function () {

			/**
			 * Minimum number of letter to return suggestions
			 * @type {Number}
			 */
			this.threshold = 3;

		},
		$destructor : function () {

		},
		$statics : {

			/**
			 * Suggestion bean that validates a given suggestion
			 * @type String
			 */
			SUGGESTION_BEAN : "aria.resources.handlers.AIRResourcesHandlerBean.Suggestion",

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
			 * @param {String} textEntry
			 * @param {Function} callback
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

					logicalPath = Aria.FRAMEWORK_RESOURCES + 'AIR/' + region + '/' + firstChar + '.txt';

					// PROFILING // var profilingId = this.$startMeasure("waiting for resources");
					downloadManager.loadFile(logicalPath, {
						fn : this._onResourceReceive,
						scope : this,
						args : {
							// PROFILING // profilingId : profilingId,
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
				return 'aria.widgets.form.list.templates.AIRList';
			},

			/**
			 * Call for a search of the suggestions when the appropriate resource has been loaded
			 * @protected
			 * @param {Event} evt
			 * @param {Object} args textEntry and suggestions callback
			 */
			_onResourceReceive : function (evt, args) {
				var textEntry = args.textEntry, callback = args.callback;
				// PROFILING // this.$stopMeasure(args.profilingId);
				if (!evt.downloadFailed) {
					// PROFILING // var profilingId = this.$startMeasure("creating suggestions list");
					var res = aria.core.DownloadMgr.getFileContent(args.logicalPath);
					var suggestions = this._getSuggestions(textEntry, res);
					// PROFILING // this.$stopMeasure(profilingId);
					this.$callback(callback, suggestions);
				} else {
					this.$callback(callback, null);
				}
			},

			/**
			 * Get suggestions which match with the query string.
			 * @protected
			 * @param {String} str The matching string (ex: Pari)
			 * @param {String} res The complete XHR string to parse (ex: [ZAAfrique du Sud/AAM-,Mala
			 * Mala/ADY-,Alldays/AFD-,Port Alfred...)
			 * @return {Array} An array of Suggestion objects.
			 */
			_getSuggestions : function (str, res) {

				// no suggestions provided is not enought letters
				if (str.length < this.threshold) {
					return null;
				}

				// no resources corresponding to this suggestions, return an empty array
				if (res == null) {
					return [];
				}

				str = decodeURIComponent(str);
				var tRes = [];

				// Search by Code
				if (str.length < 4) {
					var iSrh = '#' + str.toUpperCase();
					this._searchSuggestion(res, iSrh, tRes);
				}

				// these are perfect matches
				if (str.length == 3) {
					for (var index = 0, l = tRes.length; index < l; index++) {
						tRes[index].exactMatch = true;
					}
				}

				// Search by Name

				// Make the string to search. it needs to like like this:
				// "This Is The Search String"
				var nSrh = ",";
				var lastIsExtraChar = true;
				for (var i = 0; i < str.length; i++) {
					if (lastIsExtraChar) {
						lastIsExtraChar = false;
						nSrh += str.charAt(i).toUpperCase();
					} else {
						nSrh += str.charAt(i).toLowerCase();
					}
					if (str.charAt(i) == ' ') {
						lastIsExtraChar = true;
					}
				}
				this._searchSuggestion(res, nSrh, tRes);

				return tRes;
			},

			/**
			 * In case of cities containing multiple IATA airports, this method can be used to extract the number of
			 * IATA airports found in the file.
			 * @param {String} str The string being searched
			 * @param {Number} startIndex The index from which the string is being searched for multiple airports
			 * @protected
			 * @return {Number} The number of airports in this city, 0 in case this was not found to be a multiple
			 * airport city
			 */
			_getNbOfIATAAirportsInMultiCity : function (str, startIndex) {
				var nb = str.substring(startIndex + 1, str.indexOf(',', startIndex));
				if (nb == "" || isNaN(nb)) {
					return 0;
				} else {
					return parseInt(nb);
				}
			},

			/**
			 * Search for a given entry in the resource string.
			 * @protected
			 * @param {String} res Text resource to parse
			 * @param {String} srh String to search
			 * @param {Array} tRes array of resources
			 */
			_searchSuggestion : function (res, srh, tRes) {

				var city, citySc, cityScn, cityCc, cityCcn, aan, noa;

				// Original results are stored with accents
				var bkpRes = res;
				// Accents are stripped for search
				res = stringUtil.stripAccents(res);

				// res = util.strip.accents(res);
				var pN = res.indexOf(srh); // position Name
				while (pN != -1) {
					// Get country code (cc)
					var pSCC = res.lastIndexOf('[', pN) + 1; // position Start Country Code
					var cc = res.substr(pSCC, 2);

					// Get country name (ccn)
					var ccn = this._getCountryName(bkpRes, pSCC + 2);

					// Get state code and state name
					var pSSC = res.lastIndexOf(']', pN) + 1; // position Start State Code
					var sc = "";
					var scn = "";
					if (pSSC != -1 && pSSC > pSCC) {
						sc = res.substr(pSSC, 2);
						// Get state name (scn)
						var pESCN = res.indexOf('#', pSSC); // position End State Code Name
						scn = res.substring(pSSC + 2, pESCN);
					}

					// Get iata code (ic)
					var pSIC = res.lastIndexOf('#', pN) + 1; // position Start Iata Code
					var ic = res.substr(pSIC, 3);

					// Get city name (cn)
					var pSCN = res.indexOf(",", pSIC) + 1; // position start of city name
					city = this._getCityName(bkpRes, pSCN);
					var cn = city.name;
					if (city.stateCode != "") {
						sc = city.stateCode;
					}
					if (city.stateName != "") {
						scn = city.stateName;
					}
					if (city.countryCode != "") {
						cc = city.countryCode;
					}
					if (city.countryName != "") {
						ccn = city.countryName;
					}
					// Get Type
					pSIC += 3; // Move on type position
					var type = res.charAt(pSIC);

					if (type === '{') {

						// city containing IATA airports (ex: PAR contains CDG, ORY)

						this._addSuggestion(tRes, 1, ic, cn, null, sc, scn, cc, ccn);

						// Get number of airports (noa)
						noa = this._getNbOfIATAAirportsInMultiCity(res, pSIC);

						for (var i = 0; i < noa; i++) {

							// Get additionnal airport code (aac)
							var pCAC = res.indexOf("#", pSIC) + 1; // position Current Airport
							// Code
							var aac = res.substr(pCAC, 3);

							// Get additionnal airport name (aan)
							pCAC += 5; // Move on the additionnal airport name
							city = this._getCityName(res, pCAC);
							aan = city.name;
							citySc = (city.stateCode != "") ? city.stateCode : sc;
							cityScn = (city.stateName != "") ? city.stateName : scn;
							cityCc = (city.countryCode != "") ? city.countryCode : cc;
							cityCcn = (city.countryName != "") ? city.countryName : ccn;

							this._addSuggestion(tRes, 2, aac, cn, aan, citySc, cityScn, cityCc, cityCcn);
							pSIC = res.indexOf('#', pCAC); // Move to search next
						}
						// } else if (type === '(') {

						// city only
						// addSuggestion(tRes, 3, ic, cn, null, null, null, cc, ccn);
					} else if (type === ')') {

						// airport only

						// Get the real city name (rcn) (so Paris for Charles de Gaulle or Orly)
						var pS1 = res.lastIndexOf('{', pSIC); // Get the last position of city tagged as city
						// containing airports
						var pS2 = res.lastIndexOf('+', pSIC); // Get the last position of city tagged as city&airport
						var pS3 = res.lastIndexOf('-', pSIC);
						if (pS3 > pS2) {
							pS2 = pS3;
						}
						if (pS2 > pS1) {
							pS1 = pS2; // Get the max first last so the maximum
						}

						// Get the name
						var pSRCN = res.indexOf(',', pS1) + 1; // position Start Real City Name
						city = this._getCityName(bkpRes, pSRCN);
						var rcn = city.name;
						citySc = (city.stateCode != "") ? city.stateCode : sc;
						cityScn = (city.stateName != "") ? city.stateName : scn;
						cityCc = (city.countryCode != "") ? city.countryCode : cc;
						cityCcn = (city.countryName != "") ? city.countryName : ccn;

						// check if airport has been already added to the suggestion list within city airport - due to
						// PTR 04429078
						var addCity = true;
						for (var i = 0; i < tRes.length; i++) {
							if (tRes[i].iata == ic) {
								addCity = false;
								break;
							}
						}
						if (addCity) {
							this._addSuggestion(tRes, 4, ic, rcn, cn, citySc, cityScn, cityCc, cityCcn);
						}
					} else if (type === '+' || type === '-') {
						// city and airport (ex: NCE)

						// Get the airport name (an)
						var an = cn;
						citySc = sc;
						cityScn = scn;

						if (type == '+') {
							var pSAN = res.indexOf(',', pSIC + 5) + 1; // position Start Airport Name
							city = this._getCityName(bkpRes, pSAN);
							an = city.name;
							citySc = (city.stateCode != "") ? city.stateCode : sc;
							cityScn = (city.stateName != "") ? city.stateName : scn;
						}

						// Get number of airports (noa)
						noa = this._getNbOfIATAAirportsInMultiCity(res, pSIC);
						var isMultiAirports = !(noa === 0);

						if (isMultiAirports) {
							this._addSuggestion(tRes, 7, ic, cn, an, citySc, cityScn, cc, ccn);
							this._addSuggestion(tRes, 2, ic, cn, an, citySc, cityScn, cc, ccn);
						} else {
							this._addSuggestion(tRes, 5, ic, cn, an, citySc, cityScn, cc, ccn);
						}

						// Search all sub airports
						if (isMultiAirports) {
							for (var i = 0; i < noa; i++) {

								// Get additionnal airport code (aac)
								var pCAC = res.indexOf('#', pSIC) + 1; // position Current Airport Code
								var aac = res.substr(pCAC, 3);

								// Get additionnal airport name (aan)
								pCAC += 5; // Move on the additionnal airport name
								city = this._getCityName(bkpRes, pCAC);
								aan = city.name;
								citySc = (city.stateCode != "") ? city.stateCode : sc;
								cityScn = (city.stateName != "") ? city.stateName : scn;

								this._addSuggestion(tRes, 2, aac, cn, aan, citySc, cityScn, cc, ccn);
								pSIC = res.indexOf('#', pCAC); // Move to search next
							}
						}
					}

					// Next name
					pN++;
					pN = res.indexOf(srh, pN);
				}
			},

			/**
			 * Retrieve information on a element from its position in the resource string
			 * @protected
			 * @param {String} s the resource string
			 * @param {Number} p the position
			 * @return {Object}
			 */
			_getCityName : function (s, p) {

				var name = "", stateCode = "", stateName = "", countryCode = "", countryName = "";

				var p1 = s.indexOf(',', p);
				var p2 = s.indexOf('#', p);
				var p3 = s.indexOf('[', p);
				var p4 = s.indexOf(']', p);
				var p5 = s.indexOf('%', p);
				var p6 = s.indexOf('~', p);

				if (p1 == -1) {
					p1 = s.length;
				}
				if (p2 == -1) {
					p2 = s.length;
				}
				if (p3 == -1) {
					p3 = s.length;
				}
				if (p4 == -1) {
					p4 = s.length;
				}
				if (p5 == -1) {
					p5 = s.length;
				}
				if (p6 == -1) {
					p6 = s.length;
				}

				if (p2 < p1) {
					p1 = p2;
				}
				if (p3 < p1) {
					p1 = p3;
				}
				if (p4 < p1) {
					p1 = p4;
				}

				if (p5 < p1) {
					name = s.substring(p, p5);
					// An airport is associated to a city and to a state
					// In some cases, the city is not in the state, that's why we need
					// to have the real state associated to the airport
					stateCode = s.substring(p5 + 1, p5 + 3);
					stateName = s.substring(p5 + 3, p1);
				} else if (p6 < p1) {
					name = s.substring(p, p6);
					// An airport is associated to a city and to a country
					// In some cases, the city is not in the country, that's why we need
					// to have the real state associated to the airport
					countryCode = s.substring(p6 + 1, p6 + 3);
					countryName = s.substring(p6 + 3, p1);
				} else {
					name = s.substring(p, p1);
				}

				return {
					name : name,
					stateCode : stateCode,
					stateName : stateName,
					countryCode : countryCode,
					countryName : countryName
				};
			},

			/**
			 * Retrieve the name of the country with the position of an element in the resource string
			 * @protected
			 * @param {String} s the resource string
			 * @param {Number} p the position
			 * @return {String}
			 */
			_getCountryName : function (s, p) {

				var p1 = s.indexOf('#', p);
				var p2 = s.indexOf(']', p);

				if (p1 == -1) {
					p1 = s.length;
				}
				if (p2 == -1) {
					p2 = s.length;
				}

				if (p2 < p1) {
					p1 = p2;
				}
				return s.substring(p, p1);
			},

			/**
			 * Store a valid suggestion
			 * @protected
			 * @param {Array} tRes the existing suggestions list
			 * @param {Number} type
			 * @param {String} iata
			 * @param {String} cityName
			 * @param {String} airportName
			 * @param {String} stateCode
			 * @param {String} stateName
			 * @param {String} countryCode
			 * @param {String} countryName
			 */
			_addSuggestion : function (tRes, type, iata, cityName, airportName, stateCode, stateName, countryCode,
					countryName) {

				for (var index = 0, l = tRes.length, existing; index < l; index++) {
					existing = tRes[index];
					if (existing.iata == iata && existing.type == type) {
						return;
					}
				}
				tRes.push({
					type : type,
					iata : iata,
					cityName : cityName,
					airportName : airportName,
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
					var airportPart = suggestion.airportName ? ("," + suggestion.airportName) : '';
					return suggestion.cityName + airportPart + " (" + suggestion.iata + ")";
				} else {
					return suggestion.iata;
				}
			}
		}
	});
})();