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
		username: "mzakaria90",
		password: "oauth:bw9krsbzn1s8j8fw1btve3ay4agcfq"
	},
	channels: ['lvpes']
}

const randomMsg = function(){
	const msg = ['Hola!', 'Cool!','Nice to meet u', 'Impressive!','This is amazing!'];
	const random = Math.floor(Math.random() * msg.length );
	return msg[random];
}

//Make the connection to chat up there
app.set('port', (process.env.PORT || 5000));
const server = app.listen(app.get('port'), function(){
	console.log('Listening!')
})

app.use(express.static(__dirname + '/public'));

const client = new tmi.client(options);
client.connect();
const io = socket(server);

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
	 io.sockets.emit('channelName', options.channels[0]);
})

client.on('action', function(channel, user, message, self){
	 ChatModelView.push(
	 	new ChatModel({
		channel,
		user: user['display-name'],
		message
	}))
	io.sockets.emit('chat', ChatModelView[ChatModelView.length - 1]);
	io.sockets.emit('channelName', options.channels[0]);
})

client.on("connected", function (address, port) {
  	console.log('Hola! Iam Connected to', options.channels[0]);
  	io.sockets.emit('channelName', options.channels[0]);
});

//Server, Socket
app.get('/chat/bot', function(req, res){
	res.send(ChatModelView)
})

 //Socket setup
 io.on('connection', function(socket){
 	console.log('Socket ID', socket.id);
 	socket.on('clientChat', function(msg){
 		client.action(options.channels[0], msg)
 	})
 })


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


