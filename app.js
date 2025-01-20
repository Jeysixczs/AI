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

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
});
