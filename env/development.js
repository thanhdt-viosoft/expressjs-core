const db = require('../src/db');
const cachedService = require('../src/service/cached.service');

console.log('This is development mode');
app.all('/*', (req, res, next) => {
    console.log(db.info(), cachedService.info());    
    next();
});