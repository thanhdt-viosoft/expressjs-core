const db = require('../src/db');
const cachedService = require('../src/service/cached.service');

console.log('This is development mode');
app.all('/*', (req, res, next) => {
    console.log('-', `Mongo: ${db.size()}`, `Cached: ${cachedService.size()}`);
    next();
});