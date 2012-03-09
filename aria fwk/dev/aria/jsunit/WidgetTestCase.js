/*
 * Copyright Amadeus
 */
Aria.classDefinition({
	$classpath : 'aria.jsunit.WidgetTestCase',
	$extends : 'aria.jsunit.TestCase',
	$dependencies : ["aria.jsunit.helpers.OutObj", "aria.widgets.AriaSkinInterface"],
	$constructor : function () {
		this.$TestCase.constructor.call(this);
		this.outObj = aria.jsunit.helpers.OutObj;
	},
	$destructor : function () {
		this.outObj.clearAll();
		this.outObj = null;
		
		this.$TestCase.$destructor.call(this);
	}
});