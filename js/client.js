
const socket = io('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.containers');
const messageContainer2 = document.querySelector('.container-flex');
const messageContainer3 = document.querySelector('.container3');
var audio=new Audio('alert.mp3');
var audio2=new Audio('alert2.mp3');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You : ${message}` , 'right');
    socket.emit('send',message)
    messageInput.value=''
})
const name = prompt('Enter Your Name To Join us');
socket.emit('new-user-joined', name);


const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position=='left') {
        audio.play();       
    }
}

const append2 = (message, position) => {
    const messageElements = document.createElement('div');
    messageElements.innerText = message ;
    messageElements.classList.add('message2');
    messageElements.classList.add(position);
    messageContainer2.append(messageElements);
    if (position=='left') {
        audio2.play();       
    }
}


socket.on('user-Joined', name => {
    append2(`${name} : join`, 'left')
});

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left')
});

socket.on('leave', name => {
    append2(`${name} : left the Chat`, 'left')
});