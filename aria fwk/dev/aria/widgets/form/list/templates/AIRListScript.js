/*
 * Copyright Amadeus
 */
/**
 * Script for the AIRList template : same as default template script
 * @class aria.widgets.form.list.templates.AIRListScript
 * @extends aria.widgets.form.list.ListTemplateScript
 */
Aria.tplScriptDefinition({
	$classpath : 'aria.widgets.form.list.templates.AIRListScript',
	$constructor : function () {
	
		// override 
		this._refContainer = "suggestionsRows";
		
		// override
		this._itemShift = 0;
	},
	$prototype : {
		
		
		/**
		 * Override item Click because structure is more complex.
		 * @param {Event} evt
		 */
		itemClick : function (evt) {
			if (!this.data.disabled) {
				var itemIdx = evt.target.getExpando("itemIdx", true);
				if (itemIdx) {
					this.moduleCtrl.itemClick(itemIdx);
				}
			}
		}		
		
	}
});
