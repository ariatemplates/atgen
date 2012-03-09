/*
 * Copyright Amadeus
 */
/**
 * Template script definition for aria.tester.runner.view.popup.generic.Generic
 */
Aria.tplScriptDefinition({
	$classpath : 'aria.tester.runner.view.popup.generic.GenericScript',
	$dependencies : [],
	$constructor : function () {
		this.keys = this._getKeys();
		var keys = this.keys;	
		for (var i = 0, l = keys.length ; i < l ; i++) {
			aria.templates.NavigationManager.addGlobalKeyMap({
				key : keys[i][0],
				callback :{
					fn : keys[i][1],
					scope : this
				}
			});
		}
	},
	
	$destructor : function () {
		var keys = this.keys;	
		for (var i = 0, l = keys.length ; i < l ; i++) {
			aria.templates.NavigationManager.removeGlobalKeyMap({
				key : keys[i][0],
				callback :{
					fn : keys[i][1],
					scope : this
				}
			});
		}
	},
	$prototype : {
		getLabelWithShortcut : function (label) {
			var firstChar = "<u>" + label.substring(0,1).toUpperCase() + "</u>";
			var labelWithShortcut = firstChar + label.substring(1);
			return labelWithShortcut;
		}
	}
});