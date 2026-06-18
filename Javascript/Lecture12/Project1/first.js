const quotes = [
  "Believe in yourself.",
  "Stay hungry, stay foolish.",
  "Dream big and work hard.",
  "Consistency beats motivation.",
  "Your attitude decides your direction.",
  "Success comes from discipline.",
  "Small steps create big results.",
  "Never stop learning.",
  "Do it with passion or not at all.",
  "Hard work beats talent.",
  "Focus on progress, not perfection.",
  "Failure is part of growth.",
  "Make today count.",
  "Learn from yesterday.",
  "Keep moving forward.",
  "Great things take time.",
  "Discipline creates freedom.",
  "Push yourself every day.",
  "Be stronger than your excuses.",
  "Start before you are ready.",
  "Action creates confidence.",
  "Winners never quit.",
  "Stay positive and work hard.",
  "Your future needs you.",
  "Think less, do more.",
  "Practice makes progress.",
  "Every expert was once a beginner.",
  "Turn your dreams into plans.",
  "Success starts with self-belief.",
  "Work until you are proud.",
  "Energy flows where focus goes.",
  "Mistakes are proof you are trying.",
  "Keep your goals clear.",
  "The best time to start is now.",
  "Do something your future self will thank you for.",
  "Growth begins outside your comfort zone.",
  "Success is built daily.",
  "Stay patient and trust the process.",
  "Your mindset shapes your reality.",
  "Big journeys begin with small steps.",
  "Learn, build, repeat.",
  "Do the simple things consistently.",
  "Never fear starting small.",
  "Effort never goes wasted.",
  "Be consistent, not perfect.",
  "Skills grow with practice.",
  "You become what you repeat.",
  "Work silently, improve daily.",
  "The journey matters too.",
  "Make it happen."
];


const button = document.querySelector('button');
const h2 = document.querySelector('h2');

button.addEventListener('click',()=>{
   
  //  0-49 index
  const index = Math.floor(Math.random()*50);

   h2.textContent = quotes[index];
})