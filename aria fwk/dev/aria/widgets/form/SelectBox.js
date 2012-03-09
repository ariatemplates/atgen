/*
 * Copyright Amadeus
 */
/**
 * SelectBox widget allows to select a value in an array of predefined values
 * @extends aria.widgets.form.DropDownTextInput
 * @class aria.widgets.form.SelectBox
 */
Aria.classDefinition({
	$classpath : "aria.widgets.form.SelectBox",
	$extends : "aria.widgets.form.DropDownTextInput",
	$dependencies : ["aria.widgets.form.DropDownListTrait", "aria.widgets.controllers.SelectBoxController"],
	$css : ["aria.widgets.css." + aria.widgets.AriaSkinInterface.getSkinName() + ".SelectBox",
			"aria.widgets.css." + aria.widgets.AriaSkinInterface.getSkinName() + ".List",
			"aria.widgets.css." + aria.widgets.AriaSkinInterface.getSkinName() + ".Div"],
	$statics : {
		DUPLICATE_VALUE : "%1 - Duplicate values %2 found in options"
	},
	$constructor : function (cfg, ctxt, lineNumber) {
		if (!this._skinnableClass) {
			this._skinnableClass = "SelectBox";
		}

		var controller = new aria.widgets.controllers.SelectBoxController();
		this.$DropDownTextInput.constructor.call(this, cfg, ctxt, lineNumber, controller);
		this.controller.setListOptions(this._cfg.options);
	},

	$destructor : function () {
		this.$DropDownTextInput.$destructor.call(this);
	},
	$prototype : {
		$init : function (p) {
			var src = aria.widgets.form.DropDownListTrait.prototype;
			for (var key in src) {
				if (src.hasOwnProperty(key) && !p.hasOwnProperty(key)) {
					// copy methods which are not already on this object (this avoids copying $classpath and
					// $destructor)
					p[key] = src[key];
				}
			}
		},
		/**
		 * This method checks the consistancy of the values provided in the attributes of SelectBox and logs and error
		 * if there are any descripancies
		 */
		_checkCfgConsistency : function () {
			this.$DropDownTextInput._checkCfgConsistency.call(this);
			var opt = this._cfg.options;
			var values = [];
			var dupValues = [];
			var map = {};

			for (var count = 0; count < opt.length; count++) {
				if (map[opt[count].value]) {
					dupValues.push(opt[count].value);
				} else {
					map[opt[count].value] = true;
					values.push(opt[count]);
				}
			}
			if (dupValues.length > 0) {
				this.controller.setListOptions(values);
				this.$logError(this.DUPLICATE_VALUE, [dupValues]);
			}

		}
	}
});