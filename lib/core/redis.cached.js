const redisClient = require('redis').createClient;
const QueueHandler = require('./queue.handler');

const RELEASE_TIMEOUT = 5000;

const queue = new QueueHandler(() => {
    return Promise.resolve(redisClient(appconfig.cache.redis.port, appconfig.cache.redis.host, appconfig.cache.redis.opts));
}, (redis) => {
    return Promise.resolve(redis.quit());
}, RELEASE_TIMEOUT);

exports = module.exports = {
    size: () => {
        return queue.size();   
    },
    clear() {        
        return new Promise(async (resolve, reject) => {
            const redis = await queue.get();
            redis.flushdb((err, data) => {
                queue.release(redis);
                if(err) return reject(err);
                resolve();
            });
        });
    },
    get(key){
        return new Promise(async (resolve, reject) => {
            const redis = await queue.get();
            redis.get(key.toString(), (err, data) => {
                queue.release(redis);
                if(err) return reject(err);
                resolve(data ? JSON.parse(data) : null);
            }) 
        });
    },
    set(key, value, lifetime=0){
        return new Promise(async (resolve, reject) => {
            const redis = await queue.get();
            redis.set(key.toString(), JSON.stringify(value), async (err, data) => {
                queue.release(redis);
                if(err) return reject(err);
                exports.touch(key.toString(), lifetime).then(() => {
                    resolve(value);
                }).catch(reject);                  
            });            
        });
    },
    del(key){
        return new Promise(async (resolve, reject) => {
            const redis = await queue.get();
            redis.del(key.toString(), async (err) => {
                queue.release(redis);
                if(err) return reject(err);
                resolve()
            }) 
        });
    },
    touch(key, lifetime=300){        
        return new Promise(async (resolve, reject) => {
            lifetime = +lifetime;
            if(lifetime <= 0) return resolve();
            const redis = await queue.get();
            if(lifetime > 1800) {
                redis.expireat(key.toString(), Math.round(+new Date()/1000)+lifetime, async (err) => {
                    queue.release(redis);
                    if(err) return reject(err);
                    resolve(); 
                });
            }else {
                redis.expire(key.toString(), lifetime, async (err) => {
                    queue.release(redis);
                    if(err) return reject(err);
                    resolve(); 
                });
            }
        });
    }    
};