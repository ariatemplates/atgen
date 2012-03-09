/*
 * Copyright Amadeus
 */
Aria.classDefinition({
	$classpath : "aria.templates.TemplateManager",
	$singleton : true,
	$events : {
		"unloadTemplate" : {
			description : "raised when unloadTemplate is finished"
		}
	},
	$prototype : {
		/**
		 * Unload a template (cache/files/urls/scripts/CSS associated)
		 * @param {String} classpath the classpath of the class to be removed
		 * @param {Boolean} timestampNextTime if true, the next time the class is loaded, browser and server cache will
		 * be bypassed by adding a timestamp to the url.
		 */
		unloadTemplate : function (classpath, timestampNextTime) {
			var classMgr = aria.core.ClassMgr;
			var scriptClasspath = classpath + "Script";
			// do some cleaning in cache
			if (Aria.nspace(scriptClasspath, false) || aria.core.Cache.getItem("classes", scriptClasspath)) {
				classMgr.unloadClass(scriptClasspath, timestampNextTime);
			}
			var itm = Aria.$classDefinitions[classpath];
			if (!Aria.nspace(classpath, false) && itm) {// when there is an error in the script, the class reference for
				// the template is not created, so the css would not be
				// unregistered in the unloadClass method
				aria.templates.CSSMgr.unregisterDependencies(classpath, itm.$css, true, timestampNextTime);
			}
			classMgr.unloadClass(classpath, timestampNextTime);
			// every thing is done : CSS are unhandled at classMgr level directly
			this.$raiseEvent("unloadTemplate");
		}
	}
});