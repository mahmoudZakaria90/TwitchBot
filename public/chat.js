//Make the connection
(function(){
	const socket = io.connect('http://localhost:8080');
	const dataLength = [];	
	const app = document.querySelector('.app');
	const appBarBefore = document.querySelector('.app .before');
	const appBarAfter = document.querySelector('.app .after');

	function cb(data) {
		dataLength.push(data);
		document.querySelector('#app-inner').innerHTML += `<p><span>${data.channel}/ </span><span>${data.user}: </span><span>${data.message}</span></p>`;
		document.title = `Document has (${dataLength.length})`;
		setTimeout(function(){
			const para = document.querySelectorAll('#app-inner p');
			para[para.length - 1].className = 'show';
		}, 1000)
	}

	function scrolling(){
		appBarBefore.style.top = app.scrollTop + 'px';
		appBarAfter.style.bottom = '-' + app.scrollTop + 'px';
	}

	socket.on('chat', cb);
	app.addEventListener('scroll', scrolling)

})()