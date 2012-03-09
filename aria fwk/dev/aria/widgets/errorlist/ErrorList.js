/*
 * Copyright Amadeus
 */
/**
 * Error list widget, which is a template-based widget. Most of the logic of the error list widget is implemented in the
 * ErrorListController class. This class only does the link between the properties of the error list widget and the
 * error list controller.
 * @class aria.widgets.errorlist.ErrorList
 */
Aria.classDefinition({
	$classpath : 'aria.widgets.errorlist.ErrorList',
	$extends : 'aria.widgets.TemplateBasedWidget',
	$dependencies : ['aria.widgets.Template', 'aria.widgets.errorlist.ErrorListController', 'aria.DomEvent'],
	$onload : function () {
		/*
		 * Preload the default template here, to improve performances TODO: find a better way, to also improve
		 * performances for custom templates
		 */
		Aria.load({
			templates : ['aria.widgets.errorlist.ErrorListTemplate']
		});
	},
	$constructor : function (cfg, ctxt) {
		this.$TemplateBasedWidget.constructor.apply(this, arguments);
		var skinObj = aria.widgets.AriaSkinInterface.getSkinObject("ErrorList", this._cfg.sclass);
		var divCfg = aria.utils.Json.copy(cfg, true, ['width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'block',
				'maxHeight']);
		divCfg.sclass = skinObj.divsclass;
		divCfg.margins = "0 0 0 0";
		this._initTemplate({
			defaultTemplate : this._cfg.defaultTemplate,
			moduleCtrl : {
				classpath : "aria.widgets.errorlist.ErrorListController",
				initArgs : {
					divCfg : divCfg,
					filterTypes : cfg.filterTypes,
					displayCodes : cfg.displayCodes,
					title : cfg.title,
					messages : cfg.messages
				}
			}
		});
	},

	$destructor : function () {
		this.$TemplateBasedWidget.$destructor.call(this);
	},
	$prototype : {
		/**
		 * Prototype init method called at prototype creation time Allows to store class-level objects that are shared
		 * by all instances
		 * @param {Object} p the prototype object being built
		 * @param {Object} def the class definition
		 * @param {Object} sdef the superclass class definition
		 */
		$init : function (p, def, sdef) {
			// prototype initialization function
			// we add the bindable properties to the Widget prototype
			p.bindableProperties = p.bindableProperties.concat(["messages"]);
		},

		_onBoundPropertyChange : function (propertyName, newValue, oldValue) {
			this._inOnBoundPropertyChange = true;
			try {
				if (propertyName == "messages") {
					this._subTplModuleCtrl.setMessages(newValue);
				}
				this._cfg[propertyName] = newValue
			} finally {
				this._inOnBoundPropertyChange = false;
			}
		}
	}
});