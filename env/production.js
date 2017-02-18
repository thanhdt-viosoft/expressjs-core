const helmet = require("helmet");  

console.log('This is production mode');
require('http').globalAgent.maxSockets = Infinity;  
require('https').globalAgent.maxSockets = Infinity;

app.use(helmet());