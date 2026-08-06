import "dotenv/config";

const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: '~openai/gpt-latest',
    messages: [
      {
        role: 'user',
        content: 'Ye Rohit Negi kun hai',
      },
    ],
  }),
});

const result = await response.json();

console.log(result);
console.log(result.choices[0].message.content);