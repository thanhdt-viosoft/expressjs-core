const amqp = require('amqplib/callback_api');
const uuid = require('node-uuid');
const _ = require('lodash');

class QueueConnection extends Array {
    constructor(){
        super()
    }
    push(item){
        item.autoclose(true);
        super.push(item);
    }
    shift(collection) {
        if(super.length === 0) return null;
        const item = super.shift();
        item.autoclose(false);
        item.collection = collection;
        item.isnew = true;
        return item;
    }
    async remove(item){
        await item.close(false);
        super.splice(super.indexOf(item), 1);
    }
}
QueueConnection.timeout = 5000;

const queue = new QueueConnection();

exports = module.exports = {
    autoclose: (isAutoClose) => {
        if(!isAutoClose) {
            clearTimeout(func.tm);
        } else {
            func.tm = setTimeout(async () => {
                await queue.remove(func);
            }, QueueConnection.timeout)
        }
    },
    bind({host, durable=false, noAck=true}, queueName) {
        return new Promise((resolve, reject) => {
            amqp.connect(host, async (err, conn) => {
                if (err) return reject(err);
                conn.createChannel(async (err, ch) => {
                    if (err) return reject(err);          
                    console.log("Created channel for Api");
                    ch.assertQueue(queueName, {durable});
                    ch.consume(queueName, async (msg) => {                        
                        console.log("Received from rabbitMQ", );
                        try{
                            msg.content.toString()
                        }catch(error){
                            console.error(error);
                        }
                    }, {
                        noAck
                    });
                }); 
            });
        });  
    },
    send: ({host, timeout=60000, durable=false}, queueName, data) => {
        console.log('BroadcastToRabQ', queueName, data);
        return new Promise((resolve, reject) => {
            try{
                amqp.connect(host, { timeout }, function (err, conn) {
                    if(err) return reject(err);
                    conn.createChannel(function (err, ch) {
                        if(err) return reject(err);
                        ch.assertQueue(queueName, {durable: false});
                        ch.sendToQueue(queueName, new Buffer(JSON.stringify(data)));
                        setTimeout(() => {
                            try {
                                conn.close((err) => {
                                    if(err) return reject(err);
                                    resolve();
                                });
                            }catch(e){
                                console.error(e);
                            }
                        }, appconfig.rabbit.closeTimeout);
                    });                    
                });
            }catch(error){
                reject(error);
            }
        });
    },

    broadcastToWeb: (sessionId, data, event) => {
        console.log('broadcastToWeb', data);
        try {
            let socket = global.ioer[sessionId];
            if (socket) {
                if (socket.connected) {
                    socket.emit(event || 'completed', JSON.stringify(data));
                } else {
                    delete global.ioer[sessionId];
                }
            }
        } catch (e) {
            console.log('broadcastIO ' + sessionId);
        }
    }
}