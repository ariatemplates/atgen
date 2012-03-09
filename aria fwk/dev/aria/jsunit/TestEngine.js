/*
 * Copyright Amadeus
 */
/**
 * @class aria.jsunit.TestEngine This class drives the test execution by looping on all Tests it is associated to It
 * also acts as test listener and maintain global informations on the test executions (e.g. what test have been run, how
 * many failures found, etc...). Some UI listeners can be associated to it to display real-time information to the user.
 * Note: Tests are run in an asynchronous way in order to give HTML UIs the possibility to refresh information
 * (otherwise the refresh would only occur at the end of the Thread execution) Note2: This class doesn't display any
 * information - see TestRunner to get a runner with an HTML UI
 * @extends aria.core.JsObject
 */
Aria.classDefinition({
	$classpath : 'aria.jsunit.TestEngine',
	$events : {
		/**
		 * @event change
		 */
		"change" : {
			description : "raised when some data have changed in the test report",
			properties : {
				testReport : "{Object} the test report object",
				changeType : "{Enum} error | failure | testStart | testEnd | testProcessingState"
			}
		}
	},
	$constructor : function () {
		/**
		 * Data model representing the test report in real time This data model is a tree where each node as the
		 * following structure: [Test]: { testClass:{String) test classpath totalNbrOfFailures: {Integer}: total number
		 * of failures (including sub tests) totalNbrOfErrors: {Integer}: total number of errors (including sub tests)
		 * totalNbrOfAsserts: {Integer}: total number of assertions (including sub tests) state: {String} "loaded",
		 * "processing" or "done" processingState: {String} description of the internal state when processing
		 * subTests:[{Test}] Array of sub-tests - null if none failures: [{TestFailure}] Array of failures discovered in
		 * this test (doesn't include sub-tests) [TestFailure] : { testState: {String} name of the test method in which
		 * the failure was found, description: {String} Failure description } errors:[{TestError}] Array of the errors
		 * caught in this test [TestError] : { testState: {String} name of the test method in which the error was
		 * caught, description: {String} Error description, exception: {Error} The error object caught in the catch
		 * statement } }
		 */
		this.testReport = null;
		/**
		 * Internal stack used to retrieve a test parent
		 * @private
		 */
		this._testStack = [];
		/**
		 * Last test in the test stack
		 * @private
		 */
		this._currentTest = null;

		/**
		 * Flag checking if the test campaign is finished
		 * @type Boolean
		 */
		this._isFinished = false;
	},
	$destructor : function () {
		this.testReport = null;
	},
	$prototype : {
		/**
		 * Main method called to start a test execution
		 * @param {aria.jsunit.Test} testObject the Test to run
		 * @param {Array} skipTests A collection of tests to be skipped (Test case or Test suite)
		 */
		runTest : function (testObject, skipTests) {
			this.skipTests = skipTests;
			this._registerAsListener(testObject);
			testObject.run();
		},

		/**
		 * Event listener called when a failure is discovered in one of the test that the current class is listening to
		 * @param {Object} evt the event object
		 * @private
		 */
		_onFailure : function (evt) {
			// TODO check evt.testClass
			if (this._currentTest.failures == null)
				this._currentTest.failures = [];
			this._currentTest.failures.push({
				testState : evt.testState,
				description : evt.description
			});
			// increment nbr of failures in all test stack
			var sz = this._testStack.length;
			for (var i = 0; sz > i; i++)
				this._testStack[i].totalNbrOfFailures++;
			this._raiseChange("failure");
		},

		/**
		 * Event listener called when an error is caught in the current test Test report data model is updated
		 * @param {Object} evt the event object
		 * @private
		 */
		_onError : function (evt) {
			// TODO extract exception msg (browser dependent)
			if (this._currentTest.errors == null)
				this._currentTest.errors = [];
			this._currentTest.errors.push({
				testState : evt.testState,
				description : evt.msg,
				exception : evt.exception
			});
			// increment nbr of errors in all test stack
			var sz = this._testStack.length;
			for (var i = 0; sz > i; i++)
				this._testStack[i].totalNbrOfErrors++;

			this._raiseChange("error");
		},

		/**
		 * Event listener called when a new test is loaded by a sub-test Note: Test report is not updated as long as the
		 * test hasn't started
		 * @param {Object} evt the event object
		 * @private
		 */
		_onTestLoad : function (evt) {
			// verify if the test is supposed to be skipped and store the value
			if (this.skipTests != null && aria.utils.Array.contains(this.skipTests, evt.testObject.$classpath)) {
				evt.testObject.skipTest = true;
			}

			this._registerAsListener(evt.testObject);
		},

		/**
		 * Event listener called when a new test execution starts Test report data model is updated to integrate the new
		 * test
		 * @param {Object} evt the event object
		 * @private
		 */
		_onTestStart : function (evt) {
			// add new test in the model
			var tst = {
				testClass : evt.testObject.$classpath,
				instance : evt.testObject,
				totalNbrOfFailures : 0,
				totalNbrOfErrors : 0,
				totalNbrOfAsserts : 0,
				state : "processing",
				processingState : "",
				subTests : null,
				failures : null,
				errors : null,
				retryURL : this._getRetryTestUrl(evt.testObject.$classpath)
			};
			var sz = this._testStack.length;
			if (sz == 0) {
				this._testStack.push(tst);
				this.testReport = tst;
			} else {
				// add test in parent subTests list
				var parentTest = this._testStack[sz - 1];
				if (parentTest.subTests == null)
					parentTest.subTests = [];
				parentTest.subTests.push(tst);

				this._testStack.push(tst);
			}
			this._currentTest = tst;
			this._raiseChange("testStart");
		},

		/**
		 * Event listener called when a test terminates The internal testStack and the data model must be thus updated
		 * @param {Object} evt the event object
		 * @private
		 */
		_onTestEnd : function (evt) {

			// unregister from the test object
			evt.testObject.$unregisterListeners(this);

			// change processing state and process execution time
			this._currentTest.processingState = "";

			// set the correct state if the test was skipped
			if (evt.testObject.skipTest) {
				this._currentTest.state = "skipped";
			} else {
				this._currentTest.state = "done";
			}

			// increment nbr of assertions in all test stack
			if (evt.nbrOfAsserts) {
				this._currentTest.totalNbrOfAsserts += evt.nbrOfAsserts;
			}

			// remove test from the stack
			this._testStack.pop();
			var sz = this._testStack.length;
			if (sz > 0) {
				this._currentTest = this._testStack[sz - 1];
			} else {
				this._currentTest = null; // last test !
				this._isFinished = true;
			}
			this._raiseChange("testEnd");
		},

		/**
		 * Retrieve the status of the test campaign
		 * @return {Boolean}
		 */
		isFinished : function () {
			return this._isFinished === true;
		},

		/**
		 * Event listenere called when a test state changes
		 * @param {Object} evt the event object
		 * @private
		 */
		_onStateChange : function (evt) {
			// update the processingState data
			this._currentTest.processingState = evt.testState;
			this._raiseChange("testProcessingState");
		},

		/**
		 * Internal method used to register as a listener on a new test object
		 * @param {Object} testObject the test object to register to
		 * @private
		 */
		_registerAsListener : function (testObject) {
			testObject.$on({
				'failure' : this._onFailure,
				'error' : this._onError,
				'start' : this._onTestStart,
				'end' : this._onTestEnd,
				'stateChange' : this._onStateChange,
				'testLoad' : this._onTestLoad,
				scope : this
			});
		},

		/**
		 * @private
		 */
		_raiseChange : function (changeType) {
			this.$raiseEvent({
				name : "change",
				testReport : this.testReport,
				changeType : changeType
			});
		},

		/**
		 * Compute the URL to use to retry a given test This has __NOTHING__ to do in this class but will do for now
		 * @private
		 * @param {String} testClasspath
		 * @return {String} the URL to use to retry the test
		 */
		_getRetryTestUrl : function (testClasspath) {
			var queryStringUtil = aria.utils.QueryString;
			queryStringUtil.getKeyValue("testClasspath");
			var keyValues = queryStringUtil.keyValues;
			keyValues["testClasspath"] = testClasspath;

			var keyValuesArray = [];

			for (var i in keyValues) {
				if (!keyValues.hasOwnProperty(i) || i == "store") {
					continue;
				}
				keyValuesArray.push([i, keyValues[i]].join("="));
			}
			var searchValue = "?" + keyValuesArray.join("&");

			var window = Aria.$frameworkWindow;
			var retryLinkHref = window.location.href.replace(/#$/, "");
			retryLinkHref = retryLinkHref.replace(window.location.search, "");
			retryLinkHref = retryLinkHref + searchValue;
			return retryLinkHref;
		},

		/**
		 * Return the instance of the current running test
		 * @return {Object} test,
		 * @see _onTestStart
		 */
		getCurrentTest : function () {
			return this._currentTest;
		}
	}
});