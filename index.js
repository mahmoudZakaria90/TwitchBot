const tmi = require('tmi.js');
const ChatModel = require('./models/chat');
const express = require('express');
const app = express();

let ChatModelView = [];

let options = {
	options: {
		debug: true
	},
	connection: {
		cluster: 'aws',
		reconnect: true
	},
	identity: {
		username: "@Name",
		password: "bla bla bla"
	},
	channels: ['adobe']
}

let client = new tmi.client(options);
client.connect();


app.use(express.static('public'));

app.get('/chat/bot', function(req, res){
	res.send(ChatModelView)
})

client.on('chat', function(channel, user, message, self){
	 ChatModelView.push(
	 	new ChatModel({
		channel,
		user: user['display-name'],
		message
	}))
})

app.listen(process.env.port || 8080, function(){
	console.log('Listening!')
})

client.on("connected", function (channel, user, port) {
  	console.log('Hola! Iam Connected')
});