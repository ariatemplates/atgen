/*
 * Copyright Amadeus
 */
/**
 * Public API of the runner module
 * @class aria.tester.runner.ModuleControllerInterface
 */
Aria.interfaceDefinition({
	$classpath : 'aria.tester.runner.ModuleControllerInterface',
	$extends : 'aria.templates.IModuleCtrl',
	$events : {	
		"initSuccessful" : "initSuccessful",
		"preloadEnd" : "preloadEnd",
		"testEnd" : "testEnd",
		"testStateChange" :  "testStateChange"
	},
	$interface : {
		"startCampaign" : {
			$type : "Function",
			$callbackParam : 0			
		},
		
		"preloadSuites" : {
			$type : "Function",
			$callbackParam : 0			
		},		
		
		"updateTests" : {
			$type : "Function",
			$callbackParam : 0			
		},
		
		"reload" : {
			$type : "Function",
			$callbackParam : 0
		},
		
		"switchView" : {
			$type : "Function",
			$callbackParam : 0
		}
	}
});
