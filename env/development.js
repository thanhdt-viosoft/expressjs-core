const db = require('../src/db');
const cachedService = require('../src/service/cached.service');

console.log('This is development mode');
setInterval(() => {
<<<<<<< HEAD
    console.log('-', `Mongo: ${db.size()}`, `Cached: ${cachedService.size()}`);
}, 5000);
=======
    console.log('-', `Mongo: ${db.size()}`);
}, 1000);
>>>>>>> e501e368d9e04e3e034fd8bd20dc008fdf95ac0f
