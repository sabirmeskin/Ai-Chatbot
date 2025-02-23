document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});


function addMessage(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

  
    function addThinkingAnimation() {
        const chatMessages = document.getElementById('chat-messages');
        const thinkingElement = document.createElement('div');
        thinkingElement.classList.add('chat-message', 'bot');
        thinkingElement.textContent = '...';
        thinkingElement.id = 'thinking';
        chatMessages.appendChild(thinkingElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeThinkingAnimation() {
        const thinkingElement = document.getElementById('thinking');
        if (thinkingElement) {
            thinkingElement.remove();
        }
    }

    function sendMessage() {
        const userInput = document.getElementById('user-input');
        const message = userInput.value.trim();
        if (message === '') return;

        addMessage('user', message);
        userInput.value = '';

        // Add thinking animation
        addThinkingAnimation();

        generateBotResponse(message).then(botResponse => {
            removeThinkingAnimation();
            addMessage('bot', botResponse);
        }).catch(error => {
            removeThinkingAnimation();
            addMessage('bot', 'Sorry, something went wrong.');
            console.error('Error generating bot response:', error);
        });
    
       
    }
    

    async function generateBotResponse(message) {
        const apiKey = process.env.API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: message }]
                }]
            })
        });

        const data = await response.json();
      console.log(data.candidates[0].content.parts[0].text);
      
        
        return data.candidates[0].content.parts[0].text;
    }
    