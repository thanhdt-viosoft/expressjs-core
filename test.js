var net = require('net');

var client = new net.Socket();
client.connect(4370, '192.168.0.202', function() {
	console.log('Connected');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
});

client.on('close', function() {
	console.log('Connection closed');
});