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
    function speakMessage(message) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(message);
        synth.speak(utterance);
    }

    // Modify sendMessage to include voice response
    function sendMessage() {
        const userInput = document.getElementById('user-input');
        const message = userInput.value.trim();
        if (message === '') return;

        addMessage('user', message);
        userInput.value = '';
        // Add thinking animation
        addThinkingAnimation();

        generateBotResponse(message).then(botResponse => {
            speakMessage(botResponse);

            removeThinkingAnimation();
            addMessage('bot', botResponse);
             // Speak the bot response
        }).catch(error => {
            removeThinkingAnimation();
            addMessage('bot', 'Sorry, something went wrong.');
            console.error('Error generating bot response:', error);
        });
    }
function startRecording() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'fr-FR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('user-input').value = transcript;
     
        sendMessage();
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onend = function() {
        console.log('Speech recognition service disconnected');
    };
}
    

    async function generateBotResponse(message) {
        const apiKey = "AIzaSyBooCijoYiMf8ToobIOQFrBQZ7Kf2vJywA";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    role: 'user',
                    parts: [{ text: message }]
                }]
            })
        });

        const data = await response.json();
      console.log(data.candidates[0].content.parts[0].text);
      
        
        return data.candidates[0].content.parts[0].text;
    }
    