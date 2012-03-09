/*
 * Copyright Amadeus
 */
/**
 * This class implements a basic Resource provider as defined by the specs at
 * http://topspot/index.php/AriaTemplates_spec_-_CR_4131733_-_Handling_global/shared_configuration_data_in_modules#Interfaces
 * @class aria.resources.providers.SEPGlobalListProvider
 * @extends aria.resources.providers.BaseProvider
 */
Aria.classDefinition({
	$classpath : 'aria.resources.providers.SEPGlobalListProvider',
	$extends : 'aria.resources.providers.BaseProvider',
	$dependencies : ['aria.modules.RequestMgr'],
	$constructor : function () {
		this.$BaseProvider.constructor.apply(this, arguments);
	},
	$prototype : {
		/**
		 * Creates a URL pointing to Resource (Shared Global Conf) Data
		 * @param {} resources
		 * @return The resource URL
		 * @private
		 */
		__createResourceURL : function (resources) {
			var rm = aria.modules.RequestMgr;
			var session = rm.session;

			var params = [];
			for (var i = 0; i < resources.length; i++) {
				params.push("RES=" + encodeURIComponent(resources[i]));
			}

			var site = rm.getParam("SITE");
			if (site != null) {
				params.push("SITE=" + encodeURIComponent(site));
			}
			var language = rm.getParam("LANGUAGE");
			if (language != null) {
				params.push("LANGUAGE=" + encodeURIComponent(language));
			}

			var URL = this._handler;
			if (!!session.paramName && !!session.id) {
				URL += ";" + rm.session.paramName + "=" + rm.session.id;
			}
			URL += "?" + params.join("&");

			return URL;
		},

		/**
		 * Internal callback, called when the data has been loaded
		 * @private
		 * @param {} resArgs
		 * @param {} cbArgs
		 */
		__fetchDataCB : function (resArgs, cbArgs) {
			var respJson = aria.utils.Json.load(resArgs.responseText);
			this.setJsonData(respJson);
			this.$callback(cbArgs.callback, cbArgs.caller);
		},

		/**
		 * Fetches data using previously defined handler and resources list. WARNING: not for use by template
		 * developers. Use refreshData instead().
		 * @protected
		 * @param {aria.core.JsObject.Callback} cb Called when the data has been fetched
		 * @param {String} caller [Internal] The class which declared the resource provider (used by Aria.js)
		 * @param {Array} the list of available resources
		 */
		_downloadResources : function (cb, caller, resources) {
			if (this._handler != null & resources.length > 0) {
				var URL = this.__createResourceURL(resources);
				
				var wrapCB = {
					fn : this.__fetchDataCB,
					scope : this,
					args : {
						callback : cb,
						caller : caller
					}
				};

				var reqArgs = {
					url : URL,
					callback : wrapCB,
					sender : {
						classpath : this.$classpath
					}
				};
				aria.core.IO.asyncRequest(reqArgs);
			} else {
				this.$callback(cb, caller);
			}
		}
	}
});
