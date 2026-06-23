// http://api.weatherapi.com/v1/current.json?key=66c084ba7f2e41e2957172945262306&q=London&aqi=no

const search = document.getElementById("weatherButton");
const input = document.getElementById("cityInput");


search.addEventListener('click',async ()=>{
    const city = input.value;

    if(city=="")
        return;

    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=66c084ba7f2e41e2957172945262306&q=${city}&aqi=no`)
    const data = await response.json();

    const p = document.querySelector('p');
    p.textContent = `Temperatur of ${city} is ${data.current.temp_c} and weather forecast is ${data.current.condition.text}`;

})