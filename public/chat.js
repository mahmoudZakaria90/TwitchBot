//Make the connection
const socket = io.connect('http://localhost:8080');
function cb(data) {
	let paragraphs = document.querySelectorAll('p');
	document.body.innerHTML += `<p><span>${data.channel}/ </span><span>${data.user}: </span><span>${data.message}</span></p>`;
}
socket.on('chat', cb)