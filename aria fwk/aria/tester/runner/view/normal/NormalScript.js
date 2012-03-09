/*
 * Copyright Amadeus
 */
Aria.tplScriptDefinition({
	$classpath : 'aria.tester.runner.view.normal.NormalScript',
	$prototype : {
		navigate:function(transition) {
			// TODO: offer the possibility to support callbacks without res arg
			this.flowCtrl.navigate(transition)
		},
		
		$displayReady : function () {
			this.flowCtrl.displayReady();
		}
	}
});