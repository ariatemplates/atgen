/*
 * Copyright Amadeus
 */
/**
 * Template script definition for aria.tester.runner.view.popup.warning.Warning
 */
Aria.tplScriptDefinition({
	$classpath : 'aria.tester.runner.view.popup.warning.WarningScript',
	$dependencies : [],
	$prototype : {
		_onReloadButtonClicked : function () {
			this.$json.setValue(
				this.data.campaign,
				"rootClasspath", 
				this.data.campaign.newClasspath
			);
			var moduleCtrl = this.moduleCtrl;
			
			this.flowCtrl.navigate("init");
			moduleCtrl.init();
		},
		
		_getKeys : function () {
			var keys = [
				["ENTER", this._onReloadButtonClicked]
			];
			return keys;
		}
	}
});