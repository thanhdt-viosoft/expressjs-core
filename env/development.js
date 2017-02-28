const db = require('../src/db');
const cachedService = require('../src/service/cached.service');

console.log('This is development mode');
setInterval(() => {
    console.log('-', `Mongo: ${db.size()}`, `Cached: ${cachedService.size()}`);
}, 5000);
