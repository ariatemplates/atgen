/*
 * Copyright Amadeus
 */

Aria.interfaceDefinition({
	$classpath : 'aria.tester.runner.ModuleControllerFlowInterface',
	$extends : 'aria.templates.IFlowCtrl',
	$events : {
		"stateChange" : "raised when the current flow state changed"
	},
	$interface: {
		/**
		 * List of available states
		 * @type Object
		 */
		STATES:{$type: "Object"},
		
		/**
		 * Notify the flow that the display is ready
		 * Permission used to allow certain flow transitions
		 */
		displayReady:{$type : "Function"},
		
		/**
		 * Triggers the transition from one state to another
		 * Navigation will only be performed if authorized by the flow
		 * @see isValidTransition
		 * @param {String} state
		 */
		navigate:{$type : "Function"},
		
		/**
		 * Tells if a transition is authorized
		 */
		isTransitionValid:{$type : "Function"}
	}
});
