const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendBtn');
const chatBox = document.getElementById('chatBox');


function addMessage(text,type){
    const div = document.createElement('div');
    div.textContent = text;
    div.className = "message "+ type;
    chatBox.append(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
}

async function sendMessage() {
    console.log("Hello");
    const message = userInput.value.trim();
    if(message == "")
        return;

    // add message to UI
    userInput.value = "";
    addMessage(message,"user");
    sendButton.disabled = true;

    const loadingBubble = addMessage("AI is thinking...", "ai loading");
    // https://text.pollinations.ai/hi%20how%20are%20you
    const url = "https://text.pollinations.ai/" + encodeURIComponent(message);

    const response = await fetch(url);
    const aiReply = await response.text();

    loadingBubble.remove();
    addMessage(aiReply, "ai");

    sendButton.disabled = false;
    userInput.focus();
}




sendButton.addEventListener('click',sendMessage);
