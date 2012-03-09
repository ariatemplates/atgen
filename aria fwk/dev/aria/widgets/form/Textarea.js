/*
 * Copyright Amadeus
 */
/**
 * @class aria.widgets.form.Textarea Textarea widget
 * @extends aria.widgets.form.TextInput
 */
Aria.classDefinition({
	$classpath : 'aria.widgets.form.Textarea',
	$extends : 'aria.widgets.form.TextInput',
	$dependencies : ['aria.widgets.controllers.TextDataController'],
	$css : ["aria.widgets.css." + aria.widgets.AriaSkinInterface.getSkinName() + ".Textarea"],
	$statics : {
		LABEL_HEIGHT : 13
	},
	/**
	 * Textarea constructor
	 * @param {aria.widgets.CfgBeans.TextareaCfg} cfg the widget configuration
	 * @param {aria.templates.TemplateCtxt} ctxt template context
	 */
	$constructor : function (cfg, ctxt, lineNumber) {
		if (!this._skinnableClass) {
			/**
			 * Skinnable class to use for this widget.
			 * @protected
			 * @type String
			 */
			this._skinnableClass = "Textarea";
		}
		var controller = new aria.widgets.controllers.TextDataController();
		this.$TextInput.constructor.call(this, cfg, ctxt, lineNumber, controller);
		this._isTextarea = true;
		cfg.labelHeight = (cfg.labelHeight > -1) ? cfg.labelHeight : this.LABEL_HEIGHT;
	},
	$prototype : {

}
});
