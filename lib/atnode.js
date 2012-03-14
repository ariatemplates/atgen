// module used to load Aria Templates

var vm = require('vm'), fs = require('fs');

aria = {};

Aria = {
	rootFolderPath : __dirname + "/../aria fwk/",
	debug : true
};

var runAt = function (err, fileContent) {
	if (err)
		throw err;

	vm.runInThisContext(fileContent);
	
	Aria.classDefinition({
		$classpath : "aria.node.Transport",
		$implements : ["aria.core.transport.ITransports"],
		$singleton : true,
		$prototype : {
			isReady : true,
			init : function () {},
			request : function (reqId, method, uri, callback, postData) {
				fs.readFile(uri, "utf-8", function (err, data) {
					if (err) {
						console.log("ERROR", err);
					} else {
						var responseObject = {
							reqId : reqId,
							status : 200,
							responseText : data
						};
						if (callback && callback.success) {
							if (!callback.scope) {
								callback.success(responseObject);
							} else {
								callback.success.call(callback.scope, responseObject);
							}
						}
					}
				});
			}
		}
	});

	aria.core.IO.updateTransports({
		"sameDomain" : "aria.node.Transport"
	});

	Aria.nspace("aria.widgets.AriaSkinInterface", true);
	aria.widgets.AriaSkinInterface.getSkinName = function () {
		return "atdefskin";
	};

	console.log("Aria Templates loaded".info);

	exports.aria = aria;
	exports.Aria = Aria;

	runCallbacks();
};

var isLoaded = false;
var waitingCallbacks = [];

var onLoad = function (cb) {
	if (isLoaded) {
		cb.fn.call(cb.scope, cb.args);
	} else {
		waitingCallbacks.push(cb);
	}
};

var runCallbacks = function () {
	isLoaded = true;
	waitingCallbacks.forEach(function (cb) {
		cb.fn.call(cb.scope, cb.args);
	});
	waitingCallbacks = [];
};

fs.readFile(__dirname + "/../aria fwk/aria/aria-templates-1.1-26.js", "utf-8", runAt);

exports.onLoad = onLoad;