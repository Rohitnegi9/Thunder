// // class keyword: var, let, const

// const newElement = document.createElement('h2');
// newElement.textContent = "I am Sachin Kumar";

// // console.log(newElement);

// // select the first element
// const element = document.getElementById('first');

// element.before(newElement);


// const newElement2 = document.createElement('h3');
// newElement2.textContent = "Chamak gaya bhaiya";
// newElement2.id = "third";
// // newElement2.className = "Mohit";
// // newElement2.className += " Rohit";
// newElement2.classList.add("Rohit");
// newElement2.classList.add("Mohit");

// // console.log(newElement2.getAttribute('class'));
// newElement2.setAttribute('piyush',"mohan");

// console.log(newElement2)


// newElement.before(newElement2);

// element.after(newElement2);


// first I have to select unorderlist

// const ul = document.querySelector('ul');

// const ul =  document.getElementById('ul');

// const li = document.createElement('li');
// li.textContent = "Web Development"

// const li2 = document.createElement('li');
// li2.textContent = "System Design"

// const li3 = document.createElement('li');
// li3.textContent = "Devops"

// const li4 = document.createElement("li");
// li4.textContent = "DSA";

// const li5 = document.createElement("li");
// li5.textContent = "GenAI";


// ul.append(li,li2,li3,li4);

// ul.append(li);
// ul.append(li2);
// ul.append(li3);
// ul.prepend(li4);

// ul.children[1].after(li5);

// li.after(li5);

// li.textContent = "System Design"


// ul.append(li2);
// ul.append(li3);



// const foods = ["Milk","Soya","Chicken","Egg","Samosa","Jalebi"]
// const ul = document.getElementById("ul");

// // const fra = document.createDocumentFragment();
// const arr = []



// for(const food of foods){
//     const li = document.createElement('li');
//     li.textContent = food;
//     arr.push(li);
// }

// // arr = [li1,li2,li3]

// ul.append(...arr);




