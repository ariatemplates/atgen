// module to export the readline interface

var readline = require('readline');

var rl = readline.createInterface(process.stdin, process.stdout);
exports.rl = rl;