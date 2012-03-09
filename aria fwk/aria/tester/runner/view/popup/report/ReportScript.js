/*
 * Copyright Amadeus
 */
/**
 * Template script definition for aria.tester.runner.view.popup.report.Report
 */
Aria.tplScriptDefinition({
	$classpath : 'aria.tester.runner.view.popup.report.ReportScript',
	$dependencies : [],
	$prototype : {
		getTestsWithErrors : function () {
			var __testUtils = aria.tester.runner.utils.TestUtils;
			var rootSuite = this.data.campaign.testsTree[0];
			
			if (!rootSuite.$TestSuite) {
				return [];
			}
			var failedTests = []; 
			var subTests = __testUtils.getSubTestsAsArray(rootSuite);
			for (var i = 0, l = subTests.length ; i < l ; i++) {
				var subTest = subTests[i];
				var instance = subTest.instance;
				if (instance.hasError && instance.hasError()) {
					failedTests.push(subTest);
				}
			}
			return failedTests;
		},
		
		getTestErrors : function (test) {
			return test.instance.getErrors();
		},
		
		formatTestClasspath : function (testCase) {
			var __testUtils = aria.tester.runner.utils.TestUtils;
			return __testUtils.formatTestCaseName(testCase);
		},
		
		formatTestErrorsCount : function (testCase) {
			var __testUtils = aria.tester.runner.utils.TestUtils;
			return __testUtils.formatTestErrorsCount(testCase);
		},
		
		formatErrorMessage : function (error) {
			return "<b>" + error.testMethod.replace("()", "") + " : </b>" + error.description;
		},
		
		_onCloseButtonClicked : function (evt, args) {
			this.__close();
		},
		
		_onReloadButtonClicked : function (evt, args) {
			this.moduleCtrl.reload();
		},
		
		__close : function () {
			this.data.view.highlightedTest = null;
			this.flowCtrl.navigate("finished");
		},
		
		_getKeys : function () {
			var keys = [
				["C", this._onCloseButtonClicked]
			];
			return keys;
		}
	}
});