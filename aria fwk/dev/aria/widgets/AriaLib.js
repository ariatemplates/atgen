/*
 * Copyright Amadeus
 */
/**
 * Widget library provided by the Aria Templates framework.
 */
Aria.classDefinition({
	$classpath : 'aria.widgets.AriaLib',
	$singleton : true,
	$extends : 'aria.widgetLibs.WidgetLib',
	$prototype : {
		/**
		 * Map of all the widgets in the library. Keys in the map are widget names as they can be used in templates.
		 * Values are the corresponding classpaths.
		 * @type {Object}
		 */
		widgets : {
			"Fieldset" : "aria.widgets.container.Fieldset",
			"Button" : "aria.widgets.action.Button",
			"IconButton" : "aria.widgets.action.IconButton",
			"Tooltip" : "aria.widgets.container.Tooltip",
			"Text" : "aria.widgets.Text",
			"Calendar" : "aria.widgets.calendar.Calendar",
			"Dialog" : "aria.widgets.container.Dialog",
			"Link" : "aria.widgets.action.Link",
			"Div" : "aria.widgets.container.Div",
			"TextField" : "aria.widgets.form.TextField",
			"Textarea" : "aria.widgets.form.Textarea",
			"Tab" : "aria.widgets.container.Tab",
			"TabPanel" : "aria.widgets.container.TabPanel",
			"PasswordField" : "aria.widgets.form.PasswordField",
			"DateField" : "aria.widgets.form.DateField",
			"DatePicker" : "aria.widgets.form.DatePicker",
			"MultiSelect" : "aria.widgets.form.MultiSelect",
			"TimeField" : "aria.widgets.form.TimeField",
			"NumberField" : "aria.widgets.form.NumberField",
			"AutoComplete" : "aria.widgets.form.AutoComplete",
			"CheckBox" : "aria.widgets.form.CheckBox",
			"RadioButton" : "aria.widgets.form.RadioButton",
			"Icon" : "aria.widgets.Icon",
			"SelectBox" : "aria.widgets.form.SelectBox",
			"Select" : "aria.widgets.form.Select",
			"SortIndicator" : "aria.widgets.action.SortIndicator",
			// "IconLib":"aria.widgets.IconLib",
			"Template" : "aria.widgets.Template",
			"List" : "aria.widgets.form.list.List",
			"Gauge" : "aria.widgets.form.Gauge",
			"ErrorList" : "aria.widgets.errorlist.ErrorList"
		},

		/**
		 * This method is deprecated. It no longer does anything.
		 * @deprecated
		 */
		/* BACKWARD-COMPATIBILITY-BEGIN */registerWidget : function () {
			this.$logWarn("The registerWidget method is deprecated and does nothing. You should remove any call to this method.");
		},/* BACKWARD-COMPATIBILITY-END */

		/**
		 * This method is deprecated. It returns "aria.widgets.CfgBeans" for backward-compatibility.
		 * @return {Object}
		 * @deprecated
		 */
		/* BACKWARD-COMPATIBILITY-BEGIN */getBeanConfig : function () {
			this.$logWarn("The getBeanConfig method is deprecated. You should remove any call to this method.");
			return "aria.widgets.CfgBeans";
		}/* BACKWARD-COMPATIBILITY-END */
	}
});
