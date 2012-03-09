/*
 * Copyright Amadeus
 */
/**
 * ClassLoader for css files.
 * @class aria.core.CSSClassLoader
 * @extends aria.core.ClassLoader
 */
Aria.classDefinition({
	$classpath : 'aria.core.CSSClassLoader',
	$extends : 'aria.core.ClassLoader',
	$constructor : function () {
		this.$ClassLoader.constructor.apply(this, arguments);
		this._refLogicalPath += ".tpl.css";
	},
	$statics : {
		// ERROR MESSAGES:
		TEMPLATE_EVAL_ERROR : "Error while evaluating the class generated from CSS template '%1'",
		TEMPLATE_DEBUG_EVAL_ERROR : "Error while evaluating the class generated from CSS template '%1'"
	},
	$prototype : {
		/**
		 * Called when the .css file is received.
		 * @param {String} classDef Content of the .tpl.css file
		 * @param {String} logicalpath Logical path of the .tpl.css file
		 * @protected
		 */
		_loadClass : function (classDef, logicalPath) {
			Aria.load({
				classes : ['aria.templates.CSSClassGenerator', 'aria.templates.CSSMgr'],
				oncomplete : {
					fn : this.__generateCSS,
					scope : this,
					args : {
						classDef : classDef,
						logicalPath : logicalPath,
						classpath : this._refClasspath
						// Needed ?
					}
				}
			});
		},

		/**
		 * Parse the template and generate the Tree
		 * @param {Object} args Template configuration, given from _loadClass
		 * @private
		 */
		__generateCSS : function (args) {
			try {
				aria.templates.CSSClassGenerator.parseTemplate(args.classDef, false, {
					fn : this.__evalGeneratedCSS,
					scope : this,
					args : {
						logicalPath : args.logicalPath
					}
				}, {
					"css_classpath" : args.logicalPath
				});
			} catch (ex) {
				this.$logError(this.CLASS_LOAD_ERROR, [this._refClasspath], ex);
			}
		},

		/**
		 * Wrap the CSS generation in a try catch block. This generation is not done in debug mode
		 * @param {Object} args Template configuration, given from _loadClass
		 * @param {Object} tree Generated tree
		 * @private
		 */
		__fallbackGenerateCSS : function (args, tree) {
			this.$logWarn(this.TEMPLATE_DEBUG_EVAL_ERROR, [this._refClasspath]);
			aria.templates.CSSClassGenerator.parseTemplateFromTree(tree, false, {
				fn : this.__evalGeneratedCSS,
				scope : this,
				args : {
					logicalPath : args.logicalPath
				}
			}, {
				"css_classpath" : args.logicalPath
			}, true);
		},

		/**
		 * Evaluate the class definition built by __generateCSS If the eval fails regenerate the class with some extra
		 * debug capabilities
		 * @param {String} generatedClass Generated class
		 * @param {Object} args Template configuration, given from _loadClass
		 * @private
		 */
		__evalGeneratedCSS : function (generatedClass, args) {
			var classDef = generatedClass.classDef;
			try {
				Aria.eval(classDef, args.logicalPath);
				if (!this._classDefinitionCalled) {
					this.$logError(this.MISSING_CLASS_DEFINITION, [this.getRefLogicalPath(), this._refClasspath]);
					aria.core.ClassMgr.notifyClassLoadError(this._refClasspath);
				}
			} catch (ex) {
				if (!generatedClass.debug && aria.core.environment.Environment.isDebug()) {
					try {
						this.__fallbackGenerateCSS(args, generatedClass.tree);
					} catch (exc) {
						this.$logError(this.TEMPLATE_DEBUG_EVAL_ERROR, [this._refClasspath], exc);
					}
				} else {
					this.$logError(this.TEMPLATE_EVAL_ERROR, [this._refClasspath], ex);
				}
			}
		}
	}
});