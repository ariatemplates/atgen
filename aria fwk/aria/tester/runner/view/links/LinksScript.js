/*
 * Copyright Amadeus
 */
Aria.tplScriptDefinition({
	$classpath : 'aria.tester.runner.view.links.LinksScript',
	$prototype : {
		getTopspotLinks : function () {
			return ([
				{
					href : "http://topspot/index.php/Aria_Templates_Testing_Documentation",
					title : "Topspot : Testing Documentation"
				},
				{
					href : "http://topspot/index.php/Category:Aria_Templates_Testing",
					title : "Topspot : Testing Category"
				},
				{
					href : "http://topspot/index.php/Aria_Templates_Testing_Documentation_:_Assert",
					title : "Topspot : List of Assert Methods"
				},
				{
					href : "http://topspot/index.php/Aria_Templates_Testing_Documentation_:_First_Steps_Tutorial",
					title : "Topspot : First Tutorial"
				},
				{
					href : "http://topspot/index.php/Aria_Templates_Testing_Documentation_:_Test_Runner",
					title : "Topspot : Tester User Guide"
				}
			]);
		},
		getKeyboardShortcuts : function () {
			var shortcuts = [{
				key : "F",
				description : "fullscreen on/<b>off</b>",
				callback : this.switchView
			},{
				key : "R",
				description : "Run/Reload the test",
				callback : this.runTest
			},{
				key : "E",
				description : "Display End test report",
				callback : this.navigateToReport
			}];
			return shortcuts;
		},
		switchView : function () {
			this.moduleCtrl.switchView();
		},
		navigateToOptions : function () {
			this.flowCtrl.navigate(this.flowCtrl.STATES.OPTIONS);
		},
		navigateToReport : function () {
			this.flowCtrl.navigate(this.flowCtrl.STATES.REPORT);
		}
	}
});