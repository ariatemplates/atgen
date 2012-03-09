/*
 * Copyright Amadeus
 */
/**
 * Interface for the error list controller.
 * @class aria.widgets.errorlist.IErrorListController
 */
Aria.interfaceDefinition({
	$classpath : 'aria.widgets.errorlist.IErrorListController',
	$extends : 'aria.templates.IModuleCtrl',
	$events : {
		"messagesChanged" : "Raised when the list of messages to be displayed has changed."
	},
	$interface : {
		/**
		 * Method to be called when changing the messages data structure.
		 */
		setMessages : function (messages) {},
		/**
		 * Set the focus on the field which corresponds to the specified message.
		 * @param {Object} message aria.utils.validators.CfgBeans.Message
		 */
		focusField : function (message) {}
	}
});
