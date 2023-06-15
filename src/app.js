function displayWeather(response){
  let temperatureElement = document.querySelector("#temperature");
  let cityName = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
 
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);


}

let apiKey ="6e4f1a7a1140d6ca523a88618d523748";
city = "Gaborone";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);