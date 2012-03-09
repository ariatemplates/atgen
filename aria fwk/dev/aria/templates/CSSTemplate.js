/*
 * Copyright Amadeus
 */
/**
 * Base class from which all CSS templates inherit.
 * @class aria.templates.CSSTemplate
 * @extends aria.core.BaseTemplate
 */
Aria.classDefinition({
	$classpath : "aria.templates.CSSTemplate",
	$extends : "aria.templates.BaseTemplate",
	$dependencies : ["aria.templates.ICSS"],
	$constructor : function () {
		this.$BaseTemplate.constructor.call(this);

		var filename = aria.core.Cache.getFilename(this.$classpath);
		var url = aria.core.DownloadMgr.resolveURL(filename, true);
		/**
		 * Path of the CSS Template. It corresponds to the classpath and starts with "/". Exposed to the {CSSTemplate}
		 * @type String
		 * @name aria.templates.CSSTemplate.cssPath
		 */
		this.cssPath = "/" + this.$classpath.replace(/\./g, "/");

		/**
		 * Path of the folder containing the CSS Template. It is relative to the Aria.rootFolderPath and takes into
		 * account the Root Map (not the Url map). Exposed to the {CSSTemplate}
		 * @type String
		 * @name aria.templates.CSSTemplate.cssFolderPath
		 */
		this.cssFolderPath = url.substring(0, url.lastIndexOf("/"));
	},
	$destructor : function () {
		this.$BaseTemplate.$destructor.call(this);
	},
	$prototype : {
		/**
		 * Prototype init method called at prototype creation time. Allows to store class-level objects that are shared
		 * by all instances
		 * @param {Object} p the prototype object being built
		 * @param {Object} def the class definition
		 */
		$init : function (p, def) {
			// The prototype should be an instance of Template, that inheriths from BaseTemplate
			p.$BaseTemplate.constructor.classDefinition.$prototype.$init(p, def);

			// copy the prototype of ICSS:
			var itf = aria.templates.ICSS.prototype;
			for (var k in itf) {
				if (itf.hasOwnProperty(k) && !p.hasOwnProperty(k)) {
					// copy methods which are not already on this object (this avoids copying $classpath and
					// $destructor)
					p[k] = itf[k];
				}
			}
		}
	}
});