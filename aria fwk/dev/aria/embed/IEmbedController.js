/*
 * Copyright Amadeus
 */
/**
 * Default interface for an embed controller
 * @class aria.embed.IEmbedController
 */
Aria.interfaceDefinition({
	$classpath : 'aria.embed.IEmbedController',
	$extends : 'aria.templates.IModuleCtrl',
	$interface : {
		/**
		 * Called when the widget is being displayed
		 * @param {HtmlElement} domContainer Container of this embed based widget
		 * @param {json} args arguments given in the embed Element widget
		 */
		onEmbededElementCreate : function (domContainer, arg) {},
		/**
		 * Called when the widget is being disposed
		 * @param {HtmlElement} domContainer Container of this embed based widget
		 * @param {json} args arguments given in the embed Element widget
		 */
		onEmbededElementDispose : function (domContainer, arg) {}
	}
});
