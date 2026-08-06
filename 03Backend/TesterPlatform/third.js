import { OpenRouter } from '@openrouter/sdk';
import "dotenv/config"
import readlineSync from 'readline-sync';

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

// const completion = await client.chat.send({
//   chatRequest:{  
//   model: '~openai/gpt-latest',
//   messages: [
//     {
//       role: 'user',
//       content: 'I am Rohit negi, how are you',
//     },
//     {
//         role: "assistant",
//         content: "Hi Rohit Negi! I’m doing well, thanks. How are you?"
//     },
//     {
//       role: 'user',
//       content: 'Who I am',
//     },
//     {
//         role: 'assistant',
//         content: "You’re Rohit Negi—you introduced yourself that way. I don’t know anything else about you unless you tell me."
//     },
//     {
//         role: "user",
//         content: "Do you know about my friend"
//     }

//   ],
//  }
// });





// console.log(completion.choices[0].message.content);

const History = [];

async function chatApp(question){
     
  const completion = await client.chat.send({
  chatRequest:{  
  model: '~openai/gpt-latest',
  messages: [
    ...History,
    {
        role: "user",
        content: question
    }
  ],
  }
 });


 History.push({role: "user", content: question});
 History.push({role: "assistant", content: completion.choices[0].message.content})

 console.log(completion.choices[0].message.content)   
}


while(true){
   
    const question = readlineSync.question("Ask me anything:-->");

    await chatApp(question);
}