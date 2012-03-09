/*
 * Copyright Amadeus
 */
/**
 * Abstract widget which enables an easy implementation of any template-based widget.
 * @class aria.widgets.TemplateBasedWidget
 */
Aria.classDefinition({
	$classpath : "aria.widgets.TemplateBasedWidget",
	$extends : "aria.widgets.container.Container",
	$dependencies : ["aria.widgets.Template"],
	$constructor : function (cfg, ctxt) {
		aria.widgets.TemplateBasedWidget.superclass.constructor.call(this, cfg, ctxt);
	},
	$events : {
		"widgetContentReady" : {
			description : "Raised when the template content is displayed."
		}
	},
	$destructor : function () {
		if (this._subTplModuleCtrl) {
			this._subTplModuleCtrl.$unregisterListeners(this);
			this._subTplModuleCtrl = null;
		}
		this._subTplCtxt = null;
		this._subTplData = null;
		if (this._tplWidget) {
			this._tplWidget.$dispose();
			this._tplWidget = null;
		}
		aria.widgets.TemplateBasedWidget.superclass.$destructor.call(this);
	},
	$prototype : {
		/**
		 * Initialize the template associated to this template based widget. It will create a new instance of the
		 * Template.
		 * @param {aria.templates.CfgBeans.LoadTemplateCfg} tplCfg Template configuration object
		 * @protected
		 */
		_initTemplate : function (tplCfg) {
			if (this._cfgOk) {
				var cfg = this._cfg;
				/*
				 * if (!tplCfg.hasOwnProperty("width")) { tplCfg.width = cfg.width; } if
				 * (!tplCfg.hasOwnProperty("height")) { tplCfg.height = cfg.height; }
				 */
				if (!tplCfg.hasOwnProperty("tooltip")) {
					tplCfg.tooltip = cfg.tooltip;
				}
				if (!tplCfg.hasOwnProperty("tooltipId")) {
					tplCfg.tooltipId = cfg.tooltipId;
				}
				if (!tplCfg.hasOwnProperty("tabIndex")) {
					tplCfg.tabIndex = cfg.tabIndex;
				}
				if (!tplCfg.hasOwnProperty("margins")) {
					tplCfg.margins = cfg.margins;
				}
				if (!tplCfg.hasOwnProperty("block")) {
					tplCfg.block = cfg.block;
				}
				if (!tplCfg.hasOwnProperty("printOptions")) {
					tplCfg.printOptions = cfg.printOptions;
				}
				if (cfg.defaultTemplate) {
					// allow the customization of the template:
					tplCfg.defaultTemplate = cfg.defaultTemplate;
				}
				this._tplWidget = new aria.widgets.Template(tplCfg, this._context, this._lineNumber);
				this._tplWidget.tplLoadCallback = {
					fn : this._tplLoadCallback,
					scope : this
				};
			}
		},

		/**
		 * FIXME: doc
		 * @param {Event} evt
		 */
		_onModuleEvent : function (evt) {
			// Override me!
		},

		/**
		 * Callback executed after the template is loaded and initialized. As this widget has _directInit it gets
		 * initialized soon after writing it to the DOM, however the callback can be executed after the first refresh if
		 * the template context is not available
		 * @param {Object} args Contains information about the load and instance of the template context
		 * @protected
		 */
		_tplLoadCallback : function (args) {
			if (args.success) {
				this._subTplCtxt = args.templateCtxt;
				this._subTplModuleCtrl = args.templateCtxt.moduleCtrl;
				this._subTplData = this._subTplCtxt.data;
				if (this._subTplModuleCtrl) {
					this._subTplModuleCtrl.$on({
						'*' : this._onModuleEvent,
						scope : this
					});
				}
				// only register the bindings here, when the widget template is totally loaded
				this._registerBindings();

				// binding registering may refresh the page
				if (this._tplWidget) {
					this.initWidgetDom(this._tplWidget.getDom());
					this.$raiseEvent("widgetContentReady");
				}
			}
			// TODO: if not args.success, need to log something ?
		},

		/**
		 * Write the widget markup into the Markup Writer
		 * @param {aria.templates.MarkupWriter} out Markup Writer
		 */
		writeMarkup : function (out) {

			if (!this._cfgOk) {
				return aria.widgets.TemplateBasedWidget.superclass.writeMarkup.call(this, out);
			}

			// Prepare delegation id before to have it linked with this widget
			this._tplWidget._delegateId = aria.utils.Delegate.add({
				fn : this.delegate,
				scope : this
			});
			this._tplWidget.writeMarkup(out);

			this._domReady = true;
		},

		/**
		 * Widget initialization.
		 */
		initWidget : function () {
			if (!this._cfgOk) {
				return;
			}
			this._tplWidget.initWidget();
			// initWidgetDom is done in the template callback
		}

	}
});