/*
 * Copyright Amadeus
 */
/**
 * @class aria.widgets.form.DropDownInput Base class for input widgets that use a drop-down popup without being a text
 * input
 * @extends aria.widgets.form.Input
 */
Aria.classDefinition({
	$classpath : 'aria.widgets.form.DropDownInput',
	$extends : 'aria.widgets.form.InputWithFrame',
	$dependencies : ['aria.widgets.form.DropDownTrait'],
	$css : ['aria.widgets.css.' + aria.widgets.AriaSkinInterface.getSkinName() + '.DropDownInput'],
	/**
	 * DropDownInput constructor
	 * @param {aria.widgets.CfgBeans.DropDownInputCfg} cfg the widget configuration
	 * @param {aria.templates.TemplateCtxt} ctxt template context
	 */
	$constructor : function () {
		this.$InputWithFrame.constructor.apply(this, arguments);
	},
	$destructor : function () {
		this._closeDropdown();
		this.$InputWithFrame.$destructor.call(this);
	},
	$prototype : {
		$init : function (p) {
			var src = aria.widgets.form.DropDownTrait.prototype;
			for (var key in src) {
				if (src.hasOwnProperty(key) && !p.hasOwnProperty(key)) {
					// copy methods which are not already on this object (this avoids copying $classpath and
					// $destructor)
					p[key] = src[key];
				}
			}
		},

		/**
		 * Handle key event on keydown or keypress
		 * @protected
		 * @param {Object|aria.DomEvent} event object containing keyboard event information (at least charCode and
		 * keyCode properties). This object may be or may not be an instance of aria.DomEvent.
		 */
		_handleKey : function (event) {
			var controller = this.controller;
			if (controller) {
				if (!event.ctrlKey && !event.altKey) {
					var report = controller.checkKeyStroke(event.charCode, event.keyCode);

					// event may not always be a DomEvent object, that's why we check for the existence of
					// preventDefault on it
					if (report && report.cancelKeyStroke && event.preventDefault) {
						event.preventDefault(true);
					}
					this._reactToControllerReport(report);
				}
			}
		},

		/**
		 * Internal method called when the popup should be either closed or opened depending on the state of the
		 * controller and whether it is currently opened or closed. Called by the dropdown button for example.
		 * @protected
		 */
		_toggleDropdown : function () {
			var controller = this.controller;
			if (controller) {
				var report = controller.toggleDropdown();
				this._reactToControllerReport(report);
			}
		}
	}
});