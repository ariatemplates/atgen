/*
 * Copyright Amadeus
 */
(function (){
/**
 * @class aria.tester.runner.utils.Hash 
 */
var classDefinition = {
	$classpath : 'aria.tester.runner.utils.Hash',
	$singleton : true,
	$constructor : function () {
		this._hashParameters = {};
	},
	$destructor : function () {
	},
	$prototype : {
		/**
		 * @private
		 */
		_getHash : function () {
			return document.location.hash;
		},
		
		/**
		 * @private
		 */
		_setHash : function (hash) {
			document.location.hash = hash;
		},
		
		/**
		 * 
		 */
		getParameter : function (key) {		
			var hash = this._getHash();
			
			// remove initial #
			hash = hash.substring(1);
			
			var keyvalues = hash.split("&");
			for (var i = 0, l = keyvalues.length ; i < l ; i++) {
				var keyvalue = keyvalues[i];
				if (keyvalue.indexOf("=") != -1) {
					var split = keyvalue.split("=")
					if (key == split[0]) {
						return split[1];
					}
				}
			}
			return "";
		},
		
		setParameter : function (key, value) {
			var hash = this._getHash();
			var hashParam = [key, value].join("=");
			// remove initial #
			hash = hash.substring(1) || "";
			
			var found = false;
			var keyvalues = hash.split("&");
			for (var i = 0, l = keyvalues.length ; i < l ; i++) {
				var keyvalue = keyvalues[i];
				if (keyvalue.indexOf("=") != -1) {
					var split = keyvalue.split("=")
					if (key == split[0]) {
						found = true;
						keyvalues[i] = hashParam;
					}
				}
			}
			
			if (!found) {
				if (keyvalues[keyvalues.length-1] == "") {
					keyvalues[keyvalues.length-1] = hashParam;
				} else {
					keyvalues.push(hashParam);
				}
			}
			
			hash = "#" + keyvalues.join("&")
			this._setHash(hash);
		}
	}
};
Aria.classDefinition(classDefinition);
})();
