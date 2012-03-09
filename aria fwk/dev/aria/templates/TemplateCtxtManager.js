/*
 * Copyright Amadeus
 */
/**
 * @class aria.templates.TemplateCtxtManager List of active templates loaded by Aria.loadTemplate
 * @singleton
 */
Aria.classDefinition({
	$classpath : 'aria.templates.TemplateCtxtManager',
	$extends : 'aria.utils.Store',
	$dependencies : ['aria.utils.Array', 'aria.utils.AriaWindow'],
	$singleton : true,
	$constructor : function () {
		this.$Store.constructor.call(this);

		/**
		 * @protected
		 * @type {Array} list of active root templates
		 */
		this._rootTemplateContexts = [];

		Aria.rootTemplates = this._rootTemplateContexts;

		aria.utils.AriaWindow.$on({
			"unloadWindow" : this._unloadWindow,
			scope : this
		});
	},
	$destructor : function () {
		Aria.rootTemplates = this._templateContexts = null;
		aria.utils.AriaWindow.$unregisterListeners(this);
		this.$Store.$destructor.call(this);
	},
	$prototype : {

		/**
		 * Called when it is needed to unload all (root) templates as the document is unloaded (or we are switching to
		 * another window).
		 * @param {Object} evt
		 */
		_unloadWindow : function (evt) {
			var rootTemplates = Aria.rootTemplates;
			for (var i = rootTemplates.length - 1; i >= 0; i--) {
				rootTemplates[i].$dispose();
			}
		},

		/**
		 * OVERRIDE add a template context in the manager, and keep track of root templates
		 * @param {aria.templates.TemplateCtxt} templateContext
		 */
		add : function (templateContext) {

			if (templateContext._cfg && templateContext._cfg.isRootTemplate) {
				this._rootTemplateContexts.push(templateContext);
				aria.utils.AriaWindow.attachWindow();
			}

			this.$Store.add.call(this, templateContext);
		},

		/**
		 * OVERRIDE remove a template context from manager
		 * @param {aria.templates.TemplateCtxt} templateContext
		 */
		remove : function (templateContext) {

			if (templateContext._cfg && templateContext._cfg.isRootTemplate) {
				// now remove it from the root template contexts array, if necessary
				if (aria.utils.Array.remove(this._rootTemplateContexts, templateContext)) {
					// it is important to check whether the item was actually present in the array
					// so that we don't decrement the counter in AriaWindow when it should not be decremented (this can
					// have very bad consequences)
					aria.utils.AriaWindow.detachWindow();
				}
			}

			return this.$Store.remove.call(this, templateContext);
		},

		/**
		 * Retrieve the templateContext of the template loaded in a dom node
		 * @param {HTMLElement} domElement
		 */
		getFromDom : function (domElement) {
			var matchFunction = function (elt) {
				return domElement == elt.getContainerDiv();
			};
			return this.getMatch(matchFunction);

		},

		/**
		 * Dispose the templateContext of the template loaded in a dom node. Returns true if success.
		 * @param {HTMLElement} domElement
		 * @return {Boolean}
		 */
		disposeFromDom : function (domElement) {
			var matchFunction = function (elt) {
				return domElement == elt.getContainerDiv();
			};
			var match = this.removeMatch(matchFunction);

			if (match) {
				match.$dispose();
				return true;
			}

			return false;
		},

		/**
		 * Returns the root template contexts
		 * @return {Array}
		 */
		getRootCtxts : function () {
			return this._rootTemplateContexts;
		}
	}
});