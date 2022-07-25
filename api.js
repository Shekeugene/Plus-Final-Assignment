// update the current time 
let time = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satursday"
];
days = days[time.getDay()];
let hour = time.getHours();
if (hour < 10){
  hour = `0${hour}`;
}
let minutes = time.getMinutes();
if (minutes < 10){
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector(".current-time");
currentTime.innerHTML = `${days} ${hour}:${minutes}`;

// Format the date for forecastDay
function formatDate(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  return days[day];
  }
  
 //Search 5 days city weather with celsius degree
 function displayForecast(respone){
  let forecast = respone.data.daily;
  let forecastElement = document.querySelector(".weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay,index){
    if (index < 6){
    forecastHTML = 
    forecastHTML + 
    ` 
    <div class="col-2">
        <div class="weather-forecast-date">${formatDate(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" class="weather-forecast-icon" alt="" width="50px"/>
        <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
        <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
    </div>
  `;
    }
  });
forecastHTML = forecastHTML+ `</div>`;
forecastElement.innerHTML = forecastHTML;
}

//Search for city lan and lon for weather forecast
function getForecast(coordinates){
let apiKey = "d6f30d80a523e717fc077ff19806dd79";
let units = "imperial";
let apiUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayForecast);
}

// Search City weather
function searchWeather(respone){
  let cityTemperature = document.querySelector(".today-weather");
  cityTemperature.innerHTML = `${Math.round(respone.data.main.temp)}`;
let cityHumidity = document.querySelector(".humidity");
cityHumidity.innerHTML = `${Math.round(respone.data.main.humidity)} %`;
let cityWindSpeed = document.querySelector(".wind-speed");
cityWindSpeed.innerHTML = `${Math.round(respone.data.wind.speed)} MPH`;
let cityWeatherDescription = document.querySelector(".weather-description");
cityWeatherDescription.innerHTML = `${respone.data.weather[0].description}`;
let weatherIcon = document.querySelector("#weather-icon");
weatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${respone.data.weather[0].icon}@2x.png`);
// celsiusTemperature = null
celsiusTemperature = respone.data.main.temp;
//Call function for getting the lan and lon 
getForecast(respone.data.coord);
}

//Search engine sync with the city name
function searchCity(event) {
event.preventDefault();
let cityInput = document.querySelector("#city-input");
let cityName = document.querySelector(".city-name");
cityName.innerHTML= `${cityInput.value}`;
let apiKey = "d6f30d80a523e717fc077ff19806dd79";
let units = "imperial";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(searchWeather);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", searchCity);


