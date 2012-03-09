/*
 * Copyright Amadeus
 */
/**
 * Report emitted by a controller on a check for a controller that support dropdown
 * @class aria.widgets.controllers.reports.DropDownControllerReport
 * @extends aria.widgets.controllers.reports.ControllerReport
 */
Aria.classDefinition({
	$classpath : 'aria.widgets.controllers.reports.DropDownControllerReport',
	$extends : 'aria.widgets.controllers.reports.ControllerReport',
	$dependencies : [],
	$constructor : function () {

		this.$ControllerReport.constructor.call(this);
		
		/**
		 * Report notifies that dropdown has to be opened or closed
		 * null value is for the case where nothing has to be done.
		 * @type {Boolean}
		 */
		this.displayDropDown = null;

	},
	$destructor : function () {
		this.displayDropDown = null;
		this.$ControllerReport.$destructor.call(this);
	}

});