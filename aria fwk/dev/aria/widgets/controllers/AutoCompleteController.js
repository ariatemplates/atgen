/*
 * Copyright Amadeus
 */
(function () {

	// shortcut
	var jsonUtils;
	var typeUtil;

	/**
	 * Controller for the AutoComplete widget. This controller manage the keystroke forwarded by the autocomplete
	 * widget, and the resources handler.
	 * @class aria.widgets.controllers.AutoCompleteController
	 * @extends aria.widgets.controllers.TextDataController
	 */
	Aria.classDefinition({
		$classpath : "aria.widgets.controllers.AutoCompleteController",
		$extends : "aria.widgets.controllers.DropDownListController",
		$dependencies : ["aria.DomEvent", "aria.utils.Json", "aria.templates.RefreshManager",
				"aria.widgets.controllers.reports.DropDownControllerReport", "aria.utils.Type"],
		$resources : {
			res : "aria.widgets.WidgetsRes"
		},
		$onload : function () {
			jsonUtils = aria.utils.Json;
			typeUtil = aria.utils.Type;
		},
		$onunload : function () {
			jsonUtils = null;
			typeUtil = null;
		},
		$constructor : function () {

			this.$DropDownListController.constructor.call(this);

			/**
			 * Resources handler used by this controller
			 * @protected
			 * @type {aria.resources.handlers.ResourcesHandler}
			 */
			this._resourcesHandler = null;

			/**
			 * Autofill behaviour enabled
			 * @type {Boolean}
			 */
			this.autoFill = false;

			/**
			 * Freetext allowed
			 * @type {Boolean}
			 */
			this.freeText = true;
			/**
			 * Specifies if the Expand button is set
			 * @type {Boolean}
			 */
			this.expandButton = false;

			/**
			 * Specificies if the handler was created by the controller, and has to be disposed.
			 * @protected
			 * @type Boolean
			 */
			this._autoDisposeHandler = false;

			/**
			 * Number of resource request in progress
			 * @type Number
			 * @protected
			 */
			this._pendingRequestNb = 0;

			/**
			 * Maximum allowed length for the autocomplete value. Infinite if negative
			 * @type Number
			 */
			this.maxlength = -1;

			/**
			 * To Remove focus when call back has no suggestions.
			 * @type Boolean
			 */
			this._resetFocus = false;
		},
		$destructor : function () {
			if (this._autoDisposeHandler && this._resourcesHandler) {
				this._resourcesHandler.$dispose();
			}
			this.$DropDownListController.$destructor.call(this);
		},
		$prototype : {

			/**
			 * Set the resourceHandler for this controller
			 * @param {String|Object} resourcesHandler classpath or instance
			 */
			setResourcesHandler : function (resourcesHandler) {
				if (typeUtil.isString(resourcesHandler)) {
					resourcesHandler = Aria.getClassInstance(resourcesHandler);
					this._autoDisposeHandler = true;
				}
				this._resourcesHandler = resourcesHandler;
			},

			/**
			 * Return the template to use in the dropdown
			 * @return {String}
			 */
			getDefaultTemplate : function () {
				return this._resourcesHandler.getDefaultTemplate();
			},

			/**
			 * override TextDataController.checkText
			 * @param {String} text
			 * @return {aria.widgets.controllers.reports.DropDownControllerReport}
			 */
			checkText : function (text) {

				var dataModel = this._dataModel;

				if (text != '' && text !== dataModel.text) {
					dataModel.text = text;

					this._pendingRequestNb++;
					this._resourcesHandler.getSuggestions(text, {
						fn : this._suggestionsCallback,
						scope : this,
						args : {
							nextValue : text,
							triggerDropDown : false
						}
					});

					// return null as there is asynchrone handling
					return null;
				}

				// returned object
				var report = new aria.widgets.controllers.reports.DropDownControllerReport();

				// an empty field is usually not considered as an error
				if (text == '') {
					dataModel.value = null;
					dataModel.text = '';
					report.ok = true;
					report.value = null;
				} else {
					if (this.freeText) {
						report.ok = true;
						if (this._pendingRequestNb > 0 && !dataModel.value) {
							report.value = dataModel.text;
						}
					} else {
						if (!dataModel.value) {

							if (this.expandButton && dataModel.listContent && this._checkValueList()) {
								report.ok = true;
							} else {
								report.ok = false;
								report.value = null;
								report.errorMessages.push(this.res.errors["40020_WIDGET_AUTOCOMPLETE_VALIDATION"]);
							}
						}

					}
					// if there is no value in the dataModel, user was just browsing selections
					if (dataModel.value) {
						report.value = dataModel.value;
					}

				}
				return report;
			},
			/**
			 * Checks the displayed text is available in the returned suggestion, this will apply only in case of
			 * freetext is set to false
			 * @param {Object} value
			 * @return {Boolean}
			 */
			_checkValueList : function () {
				var freeTxtStatus = false, dataListContent = this._dataModel.listContent;
				for (var i = 0, len = dataListContent.length; i < len; i++) {
					if (this._dataModel.text === dataListContent[i].value.label) {
						freeTxtStatus = true;
						break;
					}
				}
				return freeTxtStatus;
			},

			/**
			 * OVERRIDE Verify a given value
			 * @param {Object} value
			 * @return {aria.widgets.controllers.reports.DropDownControllerReport}
			 * @override
			 */
			checkValue : function (value) {
				var report = new aria.widgets.controllers.reports.DropDownControllerReport(), dataModel = this._dataModel;
				if (value == null) {
					// can be null either because it bound to null or because a request is in progress
					dataModel.text = (this._pendingRequestNb > 0 && dataModel.text) ? dataModel.text : "";
					dataModel.value = null;
					report.ok = true;
				} else if (value && !typeUtil.isString(value)) {
					if (aria.core.JsonValidator.check(value, this._resourcesHandler.SUGGESTION_BEAN)) {
						var text = this._getLabelFromSuggestion(value);
						dataModel.text = text;
						dataModel.value = value;
						report.ok = true;
					} else {
						dataModel.value = null;
						report.ok = false;
						this.$logError("Value does not match definition for this autocomplete: "
								+ this._resourcesHandler.SUGGESTION_BEAN, [], value);
					}
				} else {
					if (typeUtil.isString(value)) {
						dataModel.text = value;
					}
					if (!this.freeText) {
						report.ok = false;
						dataModel.value = null;
					} else {
						report.ok = true;
						dataModel.value = value;
					}
				}
				report.value = dataModel.value;
				report.text = dataModel.text;
				return report;
			},

			/**
			 * Check for the case when the displayedValue will change
			 * @param {Integer} charCode
			 * @param {Integer} keyCode
			 * @param {String} nextValue the value that should be next in the textfield
			 * @param {Integer} caretPos
			 * @return {aria.widgets.controllers.reports.ControllerReport}
			 */
			_checkInputKey : function (charCode, keyCode, nextValue, caretPosStart, caretPosEnd) {

				// Before reacting to the controller report we check that the maxlength is not exceeded
				// It is done here because the report is asynchronous and will programmatically set the
				// value of the text input, thus bypassing maxlength attribute on text input
				if (this.maxlength > 0 && nextValue.length > this.maxlength) {
					return;
				}
				// Setting the Data Model value to entered Text if the free text is allowed PTR05245510
				this._dataModel.value = this.freeText ? nextValue : null;
				this._dataModel.text = nextValue;
				// The timeout was moved from the _raiseReport method to here
				// so that we never send an old report after having received a new key
				// and so that it is possible to quickly cancel the display of suggestions when typing fast
				if (this._typeTimout) {
					clearTimeout(this._typeTimout);
					this._typeTimout = null;
				}
				var controller = this;
				this._typeTimout = setTimeout(function () {
					controller._typeTimout = null;

					controller._pendingRequestNb++;
					controller._resourcesHandler.getSuggestions(nextValue, {
						fn : controller._suggestionsCallback,
						scope : controller,
						args : {
							nextValue : nextValue,
							triggerDropDown : true,
							caretPosStart : caretPosStart,
							caretPosEnd : caretPosEnd
						}
					});
				}, 10);

				// return null as there is asynchrone handling
				return null;

			},

			/**
			 * Callback after the asynchronous suggestions
			 * @param {Array} suggestions
			 * @param {Object} args nextValue and triggerDropDown properties
			 */
			_suggestionsCallback : function (res, args) {

				this._pendingRequestNb--;

				var suggestions = null;
				var error = null;
				if (res != null) {
					if ("suggestions" in res) {
						suggestions = res.suggestions;
						error = res.error;
					} else {
						suggestions = res;
					}
				}

				// default selection is first element
				var nextValue = args.nextValue, triggerDropDown = args.triggerDropDown, matchValueIndex = -1, dataModel = this._dataModel;

				// don't do anything if displayedValue has changed
				// -> user has typed something else before the callback returned
				if (dataModel && (nextValue == dataModel.text) || (args.keepSelectedValue)) {

					// a null return is different from an empty array
					// null : not enought letters
					// empty array : no suggestions for this entry
					var suggestionsAvailable = (suggestions !== null);

					if (suggestionsAvailable) {

						if (args.keepSelectedValue && dataModel.value) {
							var code = dataModel.value.code;
							for (var i = 0; i < suggestions.length; i++) {
								suggestions[i].exactMatch = (suggestions[i].code === code);
							}
						}
						// reformat the suggestions to be compatible with the list widget
						matchValueIndex = this._prepareSuggestionsAndMatch(suggestions, nextValue);

					} else {
						suggestions = [];
					}
					var hasSuggestions = suggestions.length > 0;
					// for resetting focus when suggestions are empty
					this._resetFocus = suggestions.length > 0 || !(this.expandButton);
					aria.templates.RefreshManager.stop();
					// as item are changed, force datamodel to change to activate selection
					jsonUtils.setValue(dataModel, 'selectedIdx', -1);

					// update datamodel through setValue to update the list has well
					jsonUtils.setValue(dataModel, 'listContent', suggestions);
					jsonUtils.setValue(dataModel, 'selectedIdx', matchValueIndex);

					var report = new aria.widgets.controllers.reports.DropDownControllerReport();
					report.text = nextValue;
					report.caretPosStart = args.caretPosStart;
					report.caretPosEnd = args.caretPosEnd;

					if (matchValueIndex != -1) {
						dataModel.value = dataModel.listContent[matchValueIndex].value;
					} else {
						if (this.freeText && nextValue) {
							// return the text from the autocomplete
							dataModel.value = nextValue;
						} else {
							dataModel.value = null;
						}
					}

					report.value = dataModel.value;
					report.cancelKeyStroke = true;

					if (error != null) {
						report.ok = !error;
					} else {
						if (!this.freeText && suggestionsAvailable && !hasSuggestions) {
							report.ok = false;
						} else {
							report.ok = true;
						}
					}
					if (report.ok && suggestionsAvailable && !hasSuggestions) {
						dataModel.value = nextValue;
					}
					report.displayDropDown = hasSuggestions && triggerDropDown;
					var arg = {};
					arg.stopValueProp = true;
					this._raiseReport(report, arg);
					aria.templates.RefreshManager.resume();
				}
			},

			/**
			 * reformat the suggestions to be compatible with the list widget and search for perfect match
			 * @param {Array} suggestions
			 * @param {String} textEntry
			 * @return {Number} index of the first exact match, or -1
			 */
			_prepareSuggestionsAndMatch : function (suggestions, textEntry) {
				var matchValueIndex = -1, suggestion;
				for (var index = 0, l = suggestions.length, label; index < l; index++) {
					suggestion = suggestions[index];
					// if it's the first exact match, store it
					if (matchValueIndex == -1) {
						if (suggestion.exactMatch) {
							matchValueIndex = index;
						}
					}
					label = this._getLabelFromSuggestion(suggestion);
					var tmp = {
						entry : textEntry,
						label : label,
						value : suggestion
					};
					suggestions[index] = tmp;
				}
				return matchValueIndex;
			},

			/**
			 * Retrieve the label to display in the textfield for a given suggestion.
			 * @param {Object} value
			 */
			_getLabelFromSuggestion : function (value) {
				return this._resourcesHandler.suggestionToLabel(value);
			},

			/**
			 * Retrieve the label to display in the textfield for an element of the list in the datamodel. This element
			 * may be different from the element in the 'value' parameter of the datamodel.
			 * @param {Object} value
			 * @return {String}
			 */
			_getLabelFromListValue : function (listValue) {
				if (this.autoFill) {
					return this._getLabelFromSuggestion(listValue.value);
				}
				return null;
			},
			/**
			 * Public method that converts the suggestion object into the displayed text by relying on the protected
			 * method _getLabelFromSuggestion
			 * @param {Object} selectedValues
			 * @return {String}
			 */
			getDisplayTextFromValue : function (value) {
				var returnValue = (value) ? this._getLabelFromSuggestion(value) : "";
				return (returnValue) ? returnValue : value;
			},
			/**
			 * Prepare the drop down list
			 * @param {String} displayValue
			 * @param {Boolean} currentlyOpen
			 * @return {aria.widgets.controllers.reports.DropDownControllerReport}
			 */
			toggleDropdown : function (displayValue, currentlyOpen) {
				this._resourcesHandler.getAllSuggestions({
					fn : this._suggestionsCallback,
					scope : this,
					args : {
						nextValue : displayValue,
						triggerDropDown : !currentlyOpen,
						keepSelectedValue : true
					}
				});
			}

		}
	});
})();