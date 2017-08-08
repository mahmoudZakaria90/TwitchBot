//Make the connection
(function(){
	const socket = io.connect('https://twitchzekasbot.herokuapp.com/', {secure: true});
	const dataLength = [];	
	const app = document.querySelector('.app');
	const appBarBefore = document.querySelector('.app .before');
	const appBarAfter = document.querySelector('.app .after');
	const chatForm = document.querySelector('#chatForm');
	const chatTitle = document.querySelector('#chatTitle');
	const chatHost = document.querySelector('#chatHost');
	const chatURL = document.querySelector('#chatURL');



	function randomize() {
		let colors = []
	}

	//Callback
	function cb(data) {
		dataLength.push(data);
		document.querySelector('#app-inner').innerHTML += `<p><strong>${data.user}: </strong><span>${data.message}</span></p>`;
		let para = document.querySelectorAll('#app-inner p');
		document.title = `Document has (${dataLength.length})`;
		app.scrollTop = (para[para.length - 1].offsetTop + para[para.length - 1].offsetHeight) + 60;
		para[para.length - 1].className = 'show';
	}

	function channelCb(data) {
		chatTitle.innerHTML = data;
		chatHost.innerHTML = data.slice(1);
		chatURL.href += chatHost.innerHTML;
	}

	//Chat
	function chat(e){
		e.preventDefault();
		const chatInput = document.querySelector('#chatInput');
		socket.emit('clientChat', chatInput.value);
		chatInput.value = '';
	}

	//Listeners
	socket.on('chat', cb);
	socket.on('channelName', channelCb)
	chatForm.addEventListener('submit', chat)

})()