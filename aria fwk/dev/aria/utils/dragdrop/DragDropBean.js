/*
 * Copyright Amadeus
 */
Aria.beanDefinitions({
	$package : "aria.utils.dragdrop.DragDropBean",
	$description : "Definition of parameters used by Drag/Drop classes",
	$namespaces : {
		"json" : "aria.core.JsonTypes"
	},
	$beans : {
		"DragCfg" : {
			$type : "json:Object",
			$description : "Parameters for aria.utils.dragdrop.Drag constructor",
			$properties : {
				"handle" : {
					$type : "json:MultiTypes",
					$description : "This is the element from which drag can be initialized by the user.",
					$contentTypes : [{
								$type : "json:String",
								$description : "Element ID"
							}, {
								$type : "json:ObjectRef",
								$description : "HTML Element"
							}]
				},

				"cursor" : {
					$type : "json:String",
					$description : "css cursor property to be added on the draggable element or the handle. If not specified no value will be added."
				},

				"proxy" : {
					$type : "ProxyCfg",
					$description : ""
				},
				"constrainTo" : {
					$type : "json:MultiTypes",
					$description : "Element to which the movement should be constrained.",
					$contentTypes : [{
								$type : "json:String",
								$description : "Can be only aria.utils.Dom.VIEWPORT"
							}, {
								$type : "json:String",
								$description : "Id of the element"
							}, {
								$type : "json:ObjectRef",
								$description : "HTML Element"
							}]
				},
				"axis" : {
					$type : "json:Enum",
					$description : "Direction of the movement",
					$enumValues : ["x", "y"]
				}
			}
		},

		"ProxyCfg" : {
			$type : "json:Object",
			$description : "Configuration object for the element that moves with the mouse.",
			$properties : {
				"type" : {
					$type : "json:Enum",
					$description : "Type of proxy. It corresponds to the class aria.utils.overlay.[type]",
					$enumValues : ["Overlay", "CloneOverlay"]
				},

				"cfg" : {
					$type : "json:ObjectRef",
					$description : "Argument passed to the constructor of the overlay described by type."
				}
			}
		}
	}
});