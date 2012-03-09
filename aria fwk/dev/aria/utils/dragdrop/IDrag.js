/*
 * Copyright Amadeus
 */
Aria.interfaceDefinition({
	$classpath : "aria.utils.dragdrop.IDrag",
	$interface : {
		/**
		 * Start of drag event.
		 * @param {Object} coordinates X and Y coordinates of the initial mouse position
		 */
		start : {
			$type : "Function"
		},

		/**
		 * Drag move event.
		 * @param {aria.DomEvent} evt Move event
		 */
		move : {
			$type : "Function"
		},

		/**
		 * End of drag event.
		 */
		end : {
			$type : "Function"
		}
	},
	$events : {
		"dragstart" : "Occurs when the user starts drag operation",
		"move" : "Occurs when the user moves the draggable element",
		"dragend" : "Occurs when the user ends drag operation"
	}
});