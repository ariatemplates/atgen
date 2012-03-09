/*
 * Copyright Amadeus
 */
/**
 * Object which raises an event when an object is loaded.
 * @class aria.templates.ObjectLoading
 */
Aria.classDefinition({
	$classpath : 'aria.templates.ObjectLoading',
	$extends : 'aria.templates.PublicWrapper',
	$implements : ['aria.templates.IObjectLoading'],
	$constructor : function () {
		this.$PublicWrapper.constructor.call(this);
	},
	$prototype : {
		$publicInterfaceName : 'aria.templates.IObjectLoading',

		/**
		 * Notify listeners that the object is loaded.
		 * @param {Object} object reference to the object just loaded.
		 */
		notifyObjectLoaded : function (object) {
			this.$raiseEvent({
				name : "objectLoaded",
				object : object
			});
		}
	}
});