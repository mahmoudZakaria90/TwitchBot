const tmi = require('tmi.js');
const ChatModel = require('./models/chat');
const express = require('express');
const app = express();
const socket = require('socket.io');
const ChatModelView = [];
const options = {
	options: {
		debug: true
	},
	connection: {
		cluster: 'aws',
		reconnect: true
	},
	identity: {
		username: "",
		password: ""
	},
	channels: ['Adobe']
}

const randomMsg = function(){
	const msg = ['Hola!', 'Cool!','Nice to meet u', 'Impressive!','This is amazing!'];
	const random = Math.floor(Math.random() * msg.length );
	return msg[random];
}

//Make the connection to chat up there
const client = new tmi.client(options);
client.connect();

//Events
client.on('chat', function(channel, user, message, self){
	 ChatModelView.push(
	 	new ChatModel({
		channel,
		user: user['display-name'],
		message
	}))
	 // console.log(randomMsg())
	 // setTimeout(function(){
	 // 	client.action(channel, randomMsg())
	 // }, 3000);

	 io.sockets.emit('chat', ChatModelView[ChatModelView.length - 1]);
})

client.on('action', function(channel, user, message, self){
	 ChatModelView.push(
	 	new ChatModel({
		channel,
		user: user['display-name'],
		message
	}))
	io.sockets.emit('chat', ChatModelView[ChatModelView.length - 1]);
})

client.on("connected", function (address,channel, user, port) {
  	console.log('Hola! Iam Connected to', options.channels[0])
});


//Server, Socket
app.use(express.static('public'));

app.get('/chat/bot', function(req, res){
	res.send(ChatModelView)
})

const server = app.listen(process.env.port || 8080, function(){
	console.log('Listening!')
})

 //Socket setup
 const io = socket(server);
 io.on('connection', function(socket){
 	console.log('Socket ID', socket.id);
 	socket.on('clientChat', function(msg){
 		client.action(options.channels[0], msg, {color: 'green'})
 	})
 })



