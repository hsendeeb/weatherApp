import {key} from "./api.js";
const form = document.querySelector(".form-control");
const btn =document.getElementById("btn");
const row1=document.getElementById("row1");
const cityInput = document.getElementById("city");
const card = document.querySelector(".card");
const cardBody=document.querySelector(".card-body");
const cardHeader=document.querySelector(".card-header");
const apiKey=key;
btn.addEventListener("click", async (event) => {
  event.preventDefault();
  
  const city =cityInput.value;

  if (city) {
    try {
      const data = await getWeather(city);
      displayWeather(data)
    } catch (error) {
      console.log(error);
      displayError(error);
    }
  } else {
    displayError("please enter a city name");
    cityInput.focus();
  }
});
async function getWeather(city) {
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response=await fetch(apiUrl);
    console.log(response);
    if(!response.ok){
        throw new Error("invalid city");

    }
    return await response.json();
}
function displayError(message) {
  const errorText = document.createElement("p");
  errorText.textContent = message;
  errorText.classList.add("alert","alert-danger");
  card.appendChild(errorText);
}
function displayWeather(data) {
    console.log(data);
    const {name:city,main:{temp,humidity,feels_like},weather:[{description,id}]}=data;
     card.textContent="";
    const cityElement=document.createElement("h1");
    const tempElement=document.createElement("h3");
    const humidityElement=document.createElement("p");
    const descElement=document.createElement("p");
    const feelslikeEl=document.createElement("p");
    
   ;
    
    cityElement.innerHTML=city;
    tempElement.innerHTML=`${Math.ceil(temp-273.15)}°C`;
    humidityElement.innerHTML=`humidity:${humidity}%`;
    descElement.innerHTML=description;
 
    feelslikeEl.innerHTML=`feels like:${Math.ceil(feels_like-273.15)}°C`


    cityElement.classList.add("text-center","border-bottom","text-white");
    tempElement.classList.add("text-center","mt-3","text-white");
    humidityElement.classList.add("text-center","text-white");
    descElement.classList.add("text-center","text-white");
    feelslikeEl.classList.add("text-center","text-white");
 

    
    
    card.appendChild(cityElement);
    card.appendChild(tempElement);
    card.appendChild(descElement);
    card.appendChild(humidityElement);
    card.appendChild(feelslikeEl);
    
    
}

