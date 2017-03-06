const amqp = require('amqplib/callback_api');
const QueueHandler = require('./queue.handler');

const RELEASE_TIMEOUT = 5000;

const queue = new QueueHandler((url=global.appconfig.pubsub.url) => {
    return new Promise((resolve, reject) => {
        amqp.connect(url, async (err, conn) => {
            if (err) return reject(err);
            resolve(conn);
        }); 
    });    
}, (conn) => {
    return new Promise((resolve, reject) => {
        conn.close((err) => {
            if(err) return reject(err);
            resolve();
        }); 
    });    
}, RELEASE_TIMEOUT);

exports = module.exports = {
    bind(queueName, onConsume, durable=false, noAck=true) {
        return new Promise(async (resolve, reject) => {
            const conn = await queue.get();
            conn.createChannel(async (err, ch) => {
                if (err) return reject(err);          
                ch.assertQueue(queueName, {durable});
                ch.consume(queueName, async (msg) => {                    
                    try{
                        onConsume(JSON.parse(msg.content.toString()));
                    }catch(error){
                        console.error(error);
                    }
                }, {
                    noAck
                });
                resolve();
            });  
        });    
    },
    send(queueName, data, durable=false){
        return new Promise(async (resolve, reject) => {
            const conn = await queue.get();
            conn.createChannel(async (err, ch) => {
                if(err) return reject(err);
                ch.assertQueue(queueName, {durable});
                ch.sendToQueue(queueName, new Buffer(JSON.stringify(data)));
                await queue.release(conn);
                resolve();
            });            
        });
    }
}