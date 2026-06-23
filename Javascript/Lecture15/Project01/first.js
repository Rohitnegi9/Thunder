
async function github(number=20) {
    
    const response = await fetch(`https://api.github.com/users?per_page=${number}`);
    const data =  await response.json();

    const root = document.getElementById('root');
    root.textContent = "";

    for(const user of data){
        // div create karenge
        // Image
        // name
        const container = document.createElement('div');
        container.style.textAlign = "center"
        container.style.padding = "5px"

        const img = document.createElement('img');
        img.src = user.avatar_url;
        img.style.height = "200px";
        img.style.width = "200px";

        const name = document.createElement('p');
        name.textContent = user.login;

        container.append(img,name);

        root.append(container);
    }
}

github();

const search = document.querySelector('button');
const input = document.querySelector('input');

input.addEventListener('input',()=>{
    const number = Number(input.value);
    github(number);
})


search.addEventListener('click',()=>{
    const number = Number(input.value);
    github(number);
});
