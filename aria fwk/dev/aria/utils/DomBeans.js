/*
 * Copyright Amadeus
 */
/**
 * @class aria.utils.DomBeans Configuration beans for frequently used DOM description objects
 */
Aria.beanDefinitions({
	$package : "aria.utils.DomBeans",
	$description : "",
	$namespaces : {
		"json" : "aria.core.JsonTypes"
	},
	$beans : {
		"Size" : {
			$type : "json:Object",
			$description : "Object description for the size of bi-dimensional object",
			$properties : {
				"width" : {
					$type : "json:Integer",
					$description : "Width value of the Size object",
					$default : 0
				},
				"height" : {
					$type : "json:Integer",
					$description : "Height value of the Size object",
					$default : 0
				}
			}
		},
		"Position" : {
			$type : "json:Object",
			$description : "Object description for the position of bi-dimensional object",
			$properties : {
				"top" : {
					$type : "json:Integer",
					$description : "Top value of the Position object",
					$default : 0
				},
				"left" : {
					$type : "json:Integer",
					$description : "Left value of the Position object",
					$default : 0
				},
				"scrollTop" : {
					$type : "json:Integer",
					$description : "The total scrolling offset (Top)",
					$default : 0
				},
				"scrollLeft" : {
					$type : "json:Integer",
					$description : "The total scrolling offset (Left)",
					$default : 0
				}
			}
		},
		"Geometry" : {
			$type : "json:Object",
			$description : "Object description for the geometry of bi-dimensional object",
			$properties : {
				"y" : {
					$type : "json:Integer",
					$description : "y coordinate of the top-left corner",
					$default : 0
				},
				"x" : {
					$type : "json:Integer",
					$description : "x coordinate of the top-left corner",
					$default : 0
				},
				"width" : {
					$type : "json:Integer",
					$description : "Width of an element",
					$default : 0
				},
				"height" : {
					$type : "json:Integer",
					$description : "Height of an element",
					$default : 0
				}
			}
		}
	}
});