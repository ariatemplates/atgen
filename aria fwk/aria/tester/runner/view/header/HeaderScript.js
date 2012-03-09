/*
 * Copyright Amadeus
 */
(function(){
var tplScriptDefinition = {
	$classpath : 'aria.tester.runner.view.header.HeaderScript',
	$prototype : {
		/**
		 * Callback triggered when the user clicks on the header button
		 */
		_onStartTestsButtonClick : function () {
			var state = this.data.flow.currentState;
			var STATES = this.flowCtrl.STATES;
			if (state == STATES.READY) {
				this.moduleCtrl.startCampaign();
			} else if (state == STATES.ONGOING) {
				//this.flowCtrl.navigate(STATES.PAUSING);
			} else if (state == STATES.PAUSED) {
				this.flowCtrl.navigate(STATES.ONGOING);
			} else if (state == STATES.FINISHED) {
				this.reload();
			}
		},
		
		_onErrorCountClick : function (evt, args) {
			this.flowCtrl.navigate(this.flowCtrl.STATES.REPORT);
		},
		
		isButtonDisabled : function () {
			var state = this.data.flow.currentState;
			return this.__isButtonDisabledForState(state);
		},
		
		__isButtonDisabledForState : function (state) {
			var disabledStates = [
				this.flowCtrl.STATES.INIT,
				this.flowCtrl.STATES.FAILURE,
				this.flowCtrl.STATES.PAUSING,
				this.flowCtrl.STATES.ONGOING,
				this.flowCtrl.STATES.OPTIONS
			];
			if (aria.utils.Array.indexOf(disabledStates, state) != -1) {
				return true;
			}
			return false;
		},
		
		/**
		 * For the current flow state, retrieve the label to use for the action button
		 * @return {String} The label to use for the action button
		 */
		getButtonLabel : function () {
			var state = this.data.flow.currentState;
			return this.__getButtonLabelForState(state);
		},
		
		
		/**
		 * Given a state, retrieve the label to use for the action button
		 * @private
		 * @return {String} The label to use for the action button
		 */
		__getButtonLabelForState : function (state) {
			if (
				state == this.flowCtrl.STATES.READY || 
				state == this.flowCtrl.STATES.OPTIONS) {
				return "Run";
			} else if (
				state == this.flowCtrl.STATES.INIT ||
				state == this.flowCtrl.STATES.FAILURE 
			) {
				return "Loading";
			} else if (
				state == this.flowCtrl.STATES.FINISHED ||
				state == this.flowCtrl.STATES.REPORT			
			) {
				return "Reload";
			} else if (state == this.flowCtrl.STATES.ONGOING) {
				return "Running"
			} else {
				return "#"+state+"#"
			}
		},	
		
		/**
		 * 
		 */
		reload : function () {
			this.moduleCtrl.reload();
		}
	}
};
Aria.tplScriptDefinition(tplScriptDefinition);
})();
