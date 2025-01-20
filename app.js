document.getElementById('sendButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    const responseDiv = document.getElementById('response');

    const url = 'https://copilot5.p.rapidapi.com/copilot';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '80f0f2074emshccbede206959d86p1ca394jsn75f008cf2c70',
            'x-rapidapi-host': 'copilot5.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: userInput,
            conversation_id: null,
            tone: 'BALANCED',
            markdown: false,
            photo_url: null
        })
    };

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            console.log('Sending request:', options);
            const response = await fetch(url, options);

            if (response.status === 429) {
                const retryAfter = response.headers.get('Retry-After');
                const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 2000;
                console.log(`Rate limited. Waiting ${waitTime}ms before retrying...`);
                await delay(waitTime);
            } else if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const result = await response.json();
                console.log('API Response:', result);

                if (result.reply) {
                    responseDiv.textContent = result.reply;
                } else {
                    responseDiv.textContent = 'Error: No reply from AI.';
                }
                return;
            }
        } catch (error) {
            if (attempt === 3) {
                responseDiv.textContent = 'Error: ' + error.message;
                console.error('Error:', error);
            }
        }
    }
});
