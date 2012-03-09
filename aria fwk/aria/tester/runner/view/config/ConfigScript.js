/*
 * Copyright Amadeus
 */
/**
 * Template script definition for aria.tester.runner.view.Report
 */
Aria.tplScriptDefinition({
	$classpath : 'aria.tester.runner.view.config.ConfigScript',
	$dependencies : [
		'aria.tester.runner.utils.TestUtils',
		'aria.tester.runner.utils.Hash'
	],
	$prototype : {		
		/**
		 * Format information about a test suite for display purposes.
		 * @param {aria.jsunit.TestSuite} testSuite
		 * @return {String} Formatted information
		 */
		getSuiteInfo : function (testSuite) {
			var __testUtils = aria.tester.runner.utils.TestUtils;
			return __testUtils.getTestSuiteInfo(testSuite);
		},
		
		
		getSuiteName : function (testSuite) {
			var __testUtils = aria.tester.runner.utils.TestUtils;
			return __testUtils.formatTestSuiteName(testSuite);
		},
		
		/**
		 * 
		 * @param {Object} evt
		 * @param {Object} args
		 */
		onSuiteClick : function (evt, args) {
			var suite = args.testSuite;
			if (suite.isSelected() == -1) {
				suite.setSelected();
			} else {
				suite.setUnselected();
			}
			
			this.moduleCtrl.updateTests();
		}
	}
});