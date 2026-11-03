const socket = new WebSocket("ws://localhost:3000");

const statuss = document.getElementById("status");
const inputMsg = document.getElementById("inputMsg");
const button = document.getElementById("sendMsg");
const displayMsg = document.getElementById("displayMsg");
const userName = document.getElementById("userName");


socket.onopen = ()=>{
    statuss.textContent = "Connected";
}

socket.onclose = ()=>{
    statuss.textContent = "Disconnected";
}

button.onclick = ()=>{
   
    const msg = {
        userName: userName.value,
        text: inputMsg.value
    }

    socket.send(JSON.stringify(msg));
    inputMsg.value = "";
};

socket.onmessage = (event)=>{
    const msg = JSON.parse(event.data)
    const p = document.createElement('p');
    p.textContent = msg.userName + ": " + msg.text;
    displayMsg.append(p);
}


