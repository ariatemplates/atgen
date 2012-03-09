/*
 * Copyright Amadeus
 */
(function(){
var tplScriptDefinition = {
	$classpath : 'aria.tester.runner.view.filter.FilterScript',
	$prototype : {
		/**
		 * Callback triggered when the user clicks on the header button
		 */
		onFilterLinkClick : function (evt, args) {
			var type = evt.target.getExpando("type");
			if (type) {
				this.$json.setValue(this.data.view.filter, "type", type);
			}
		}
	}
};
Aria.tplScriptDefinition(tplScriptDefinition);
})();
