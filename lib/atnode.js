// module used to load Aria Templates framework

var vm = require('vm'), fs = require('fs'), configHandler = require("./configHandler");

var frameworkPath = configHandler.getFrameworkPath();
var frameworkScript = configHandler.getFrameworkScript();

aria = {};

Aria = {
	rootFolderPath : frameworkPath,
	debug : true
};

var runAt = function (err, fileContent) {
	if (err) {
		console.log('\n[Error] Aria Templates framework not loaded.'.err + '\n[Info] Please check the framework path inside the config.json.'.info);
		process.exit(0);
	}		

	vm.runInThisContext(fileContent);
	
    Aria.classDefinition({
        $classpath : "aria.node.Transport",
        $implements : ["aria.core.transport.ITransports"],
        $singleton : true,
        $prototype : {
            isReady : true,
            init : Aria.empty,
            request : function (request, callback) {
                fs.readFile(request.url, "utf-8", function (err, data) {
                    if (err) {
                        callback.fn.call(callback.scope, err, callback.args);
                    } else {
                        var responseObject = {
                            status : 200,
                            responseText : data
                        };
                        callback.fn.call(callback.scope, false, callback.args, responseObject);
                    }
                });
            }
        }
    });

	aria.core.IO.updateTransports({
		"sameDomain" : "aria.node.Transport"
	});

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

fs.readFile(frameworkScript, "utf-8", runAt);

exports.onLoad = onLoad;