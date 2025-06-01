const fs = require('fs');
const pkg = require('../package.json');
fs.writeFileSync('dist/version.txt', pkg.version);