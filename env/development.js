const db = require('../src/db');

console.log('This is development mode');
setInterval(() => {
    console.log('-', `Mongo: ${db.size()}`);
}, 1000);