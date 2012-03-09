// module to generate the bootstrap

var fs = require('fs'), mkdirp = require('mkdirp');

var generateBootstrap = function generateBootstrap (ariaGenerator, proj, changes) {
	fs.writeFileSync(proj.bootstrap.name, "BOOTSTRAP");
	changes.bootstrap = proj.bootstrap.name;
};

exports.generateBootstrap = generateBootstrap;