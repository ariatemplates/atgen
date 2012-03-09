/*
 * Copyright Amadeus
 */
Aria.tplScriptDefinition({
	$classpath : 'aria.tester.runner.view.mini.MiniScript',
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