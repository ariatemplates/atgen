/*
 * Copyright Amadeus
 */
/**
 * Template script for the default ErrorListTemplate
 * @class aria.widgets.errorlist.ErrorListTemplateScript
 */
Aria.tplScriptDefinition({
	$classpath : "aria.widgets.errorlist.ErrorListTemplateScript",
	$dependencies : ["aria.utils.Data"],
	$statics : {
		/**
		 * Links each type of message with an icon. The order in the array is important as the first entry for which
		 * messages of that type exist in the messages list is used. Since it depends on aria.utils.Data wait for it to
		 * be loaded by the dependency manager
		 * @type Array
		 */
		ICONS : [],

		/**
		 * Icon used if there is no matching icon in ICONS.
		 * @type String
		 */
		DEFAULT_ICON : "std:missing"
	},
	$prototype : {
		/**
		 * Initialize this class building the icons object. It's done here so we are sure that aria.utils.Data is
		 * already loaded
		 * @param {aria.widgets.errorlist.ErrorListTemplateScript} proto Class prototype
		 */
		$init : function (proto) {
			// Using push instead of resetting the reference because items are not copied from proto but from the
			// parameter of tplScriptDefinition directly
			proto.ICONS.push({
				type : aria.utils.Data.TYPE_ERROR,
				icon : "std:error"
			}, {
				type : aria.utils.Data.TYPE_WARNING,
				icon : "std:warning"
			}, {
				type : aria.utils.Data.TYPE_INFO,
				icon : "std:info"
			}, {
				type : aria.utils.Data.TYPE_FATAL,
				icon : "std:error"
			}, {
				type : aria.utils.Data.TYPE_NOTYPE,
				icon : "std:info"
			}, {
				type : aria.utils.Data.TYPE_CRITICAL_WARNING,
				icon : "std:warning"
			}, {
				type : aria.utils.Data.TYPE_CONFIRMATION,
				icon : "std:confirm"
			});
		},

		/**
		 * React to module events
		 * @param {Event} evt
		 */
		onModuleEvent : function (evt) {
			if (evt.name == "messagesChanged") {
				this.$refresh();
			}
		},

		/**
		 * Click on an error message
		 * @param {Event} evt Not used
		 * @param {Object} msg Error message
		 */
		clickOnMessage : function (evt, msg) {
			this.moduleCtrl.focusField(msg);
		},

		/**
		 * Get the icon name for the current message type
		 * @return {String} Icon name
		 */
		getIcon : function () {
			var messageTypes = this.data.messageTypes;
			var res = this.DEFAULT_ICON;
			var icons = this.ICONS;
			for (var i = 0, l = icons.length; i < l; i++) {
				var curIcon = icons[i];
				if (messageTypes[curIcon.type] > 0) {
					res = curIcon.icon;
					break;
				}
			}
			return res;
		},

		/**
		 * Get the message to be displayed as label of the error list item
		 * @param {Object} msg Error message
		 * @return {String} localized message
		 */
		getDisplayMessage : function (msg) {
			if (this.data.displayCodes && (msg.code || msg.code === 0)) {
				return msg.localizedMessage + " (" + msg.code + ")";
			}
			return msg.localizedMessage;
		}
	}
});