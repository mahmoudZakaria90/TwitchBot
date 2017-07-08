const tmi = require('tmi.js');

let options = {
	options: {
		debug: true
	},
	connection: {
		cluster: 'aws',
		reconnect: true
	},
	identity: {
		username: "Name",
		password: "bla bla bla"
	},
	channels: ['Adobe']
}

let client = new tmi.client(options);
client.connect();

client.on('chat', function(channel, user, message, self){
	client.action(channel, user['display-name'] + " Hola!")
})
client.on("connected", function (address, port) {
    client.action(options.channels[0], "Hello This is @Zekas90's bot for testing test test test show clappings :D")
});