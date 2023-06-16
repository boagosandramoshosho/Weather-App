function dateTime(timestamp){
 let date = new Date(timestamp);
 let hours = String(date.getHours()).padStart(2, "0");
 let minutes = String(date.getMinutes()).padStart(2, "0");
 let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 let day = days[date.getDay()];

 return `${day} ${hours}:${minutes}`
}


function displayWeather(response){
  let temperatureElement = document.querySelector("#temperature");
  let cityName = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = dateTime(response.data.dt*1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let apiKey ="6e4f1a7a1140d6ca523a88618d523748";
city = "Gaborone";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);