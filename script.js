const userInput = document.getElementById('user-input');
function sendMessage() {
  
    const chatMessages = document.getElementById('chat-messages');

    if (userInput.value.trim()) {
    chatMessages.innerHTML += `<div class="chat-message user">${userInput.value}</div>`;
    userInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

userInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') sendMessage();
});