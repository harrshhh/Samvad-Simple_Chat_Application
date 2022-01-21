var socket = io('http://localhost:8000');
var messageContainer = document.querySelector(".container");
var audio = new Audio('/sound/notification2.mp3');
var append = function (message, position) {
    var messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left')
        audio.play();
}
var Name = prompt('Enter your name to join');
socket.emit('new-user-joined', Name);
socket.on('user-joined', Name => {
    if (Name)
        append(`${Name} joined the chat`, 'left');
})
var form = document.getElementById('form_fill');
var messageInput = document.getElementById('send_box');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (messageInput.value) {
        var message = messageInput.value;
        append(`You:${message}`, 'right');
        socket.emit('send', message);
        messageInput.value = '';
    }
});


socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left');
})

socket.on('left', name => {
    append(`${name} left the chat.`, 'left');
})

