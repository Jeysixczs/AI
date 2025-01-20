document.getElementById('sendButton').addEventListener('click', async () => {
  const userInput = document.getElementById('userInput').value;
  const responseDiv = document.getElementById('response');

  const apiKey = '80f0f2074emshccbede206959d86p1ca394jsn75f008cf2c70';
  const apiUrl = 'https://copilot5.p.rapidapi.com/copilot';

  try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'x-rapidapi-host': 'copilot5.p.rapidapi.com',
              'x-rapidapi-key': apiKey
          },
          body: JSON.stringify({ query: userInput })
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      responseDiv.textContent = data.reply;
  } catch (error) {
      responseDiv.textContent = 'Error: ' + error.message;
      console.error('Error:', error);
  }
});
