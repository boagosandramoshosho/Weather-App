function dateTime(timestamp){
 let date = new Date(timestamp);
 let hours = String(date.getHours()).padStart(2, "0");
 let minutes = String(date.getMinutes()).padStart(2, "0");
 let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 let day = days[date.getDay()];

 return `${day} ${hours}:${minutes}`
}

function formatForecastDay(timestamp){
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML =`<div class="row">`;
  forecast.forEach(function(dailyForecast, index){
  if (index < 6){
  forecastHTML = forecastHTML +
  `
  <div class="col-2">
        <div class="forecast-day">${formatForecastDay(dailyForecast.dt)}</div>  
      <img 
      src="http://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png" 
      alt="weather-icon" 
      width="38" 
      />
      <div class="forecast-temperatures">
      <span class="forecast-temp-max">${Math.round(dailyForecast.temp.max)}°</span>
      <span class="forecast-temp-min">${Math.round(dailyForecast.temp.min)}°</span> 
      </div>
      </div>`;
}});
forecastHTML= forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getDailyForecast(coordinates){
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let apiUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function displayWeather(response){
  let temperatureElement = document.querySelector("#temperature");
  let cityName = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  
  celsiusTemp = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityName.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = dateTime(response.data.dt*1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getDailyForecast(response.data.coord);
}

function search(city){
  let apiKey ="6e4f1a7a1140d6ca523a88618d523748";
  let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function inputSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function dispalyFahreinheitTemp(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  let fahreinheitElement = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahreinheitElement);

}

function displayCelsiusTemp(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitTemp.classList.remove("active");
  celsiusTemperature.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let formInput = document.querySelector("#search-form");
formInput.addEventListener("submit", inputSubmit);

let fahrenheitTemp = document.querySelector("#fahrenheit-temp");
fahrenheitTemp.addEventListener("click", dispalyFahreinheitTemp);

let celsiusTemperature = document.querySelector("#celsius-temp");
celsiusTemperature.addEventListener("click", displayCelsiusTemp);

search("Gaborone");
