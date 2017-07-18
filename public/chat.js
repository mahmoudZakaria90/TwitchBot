//Make the connection
const socket = io.connect('http://localhost:8080');
const dataLength = [];	

function cb(data) {
	dataLength.push(data);
	let paragraphs = document.querySelectorAll('p');
	document.querySelector('#app').innerHTML += `<p><span>${data.channel}/ </span><span>${data.user}: </span><span>${data.message}</span></p>`;
	document.title = `Document has (${dataLength.length})`
}
socket.on('chat', cb)