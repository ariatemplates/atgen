/*
 * Copyright Amadeus
 */
/**
 * Template script definition for aria.tester.runner.view.popup.options.Options
 */
Aria.tplScriptDefinition({
	$classpath : 'aria.tester.runner.view.popup.options.OptionsScript',
	$dependencies : [],
	$prototype : {
		_onApplyButtonClicked : function () {
			this.flowCtrl.navigate(this.flowCtrl.STATES.READY);
		},
		
		_onCancelButtonClicked : function () {
			this.flowCtrl.navigate(this.flowCtrl.STATES.READY);
		},
		
		_getKeys : function () {
			var keys = [
				["A", this._onApplyButtonClicked],
				["C", this._onCancelButtonClicked]
			];
			return keys;
		}
	}
});