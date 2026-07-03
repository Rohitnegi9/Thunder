const users = [
  {
    name: "Aarav Sharma",
    age: 24,
    photo: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    name: "Priya Verma",
    age: 22,
    photo: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    name: "Rahul Mehta",
    age: 26,
    photo: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    name: "Sneha Kapoor",
    age: 23,
    photo: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    name: "Karan Malhotra",
    age: 28,
    photo: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    name: "Ananya Singh",
    age: 21,
    photo: "https://randomuser.me/api/portraits/women/6.jpg"
  },
  {
    name: "Rohan Gupta",
    age: 25,
    photo: "https://randomuser.me/api/portraits/men/7.jpg"
  },
  {
    name: "Neha Joshi",
    age: 27,
    photo: "https://randomuser.me/api/portraits/women/8.jpg"
  },
  {
    name: "Aditya Raj",
    age: 24,
    photo: "https://randomuser.me/api/portraits/men/9.jpg"
  },
  {
    name: "Isha Agarwal",
    age: 22,
    photo: "https://randomuser.me/api/portraits/women/10.jpg"
  }
];


const root = document.getElementById("root");


// use any loops
// people: {
//     name: "Isha Agarwal",
//     age: 22,
//     photo: "https://randomuser.me/api/portraits/women/10.jpg"
//   }

// <div>
//    <img src="https://randomuser.me/api/portraits/women/10.jpg">
//    <h2>Name: Isha Agrwal</h2>
//    <p>Age: 22</p>
// </div>

const arr = [];

users.forEach((people)=>{
    const name = document.createElement('h2');
    name.textContent = `Name: ${people.name}`;

    // age ke liye
    const age = document.createElement('p');
    age.textContent = `Age: ${people.age}`;
    

    // create image
    const image = document.createElement('img');
    image.src = people.photo;

    // create a card:

    const card = document.createElement('div');
    card.append(image,name,age);


    // put this card into the root element
    arr.push(card);
})


root.append(...arr);
