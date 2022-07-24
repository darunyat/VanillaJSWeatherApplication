function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `Last updated: ${day} ${hours}:${minutes}`;
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm-2 day-of-the-week">
  <span class="weather-forecast-date">${formatForecastDate(
    forecastDay.dt
  )}</span>
  <img
  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
  alt="icon"
  width="36"
  class="weather-icon"  />
 <div class="weather-forecast-temperature"> <span class="weather-forecast-temperature-max"> ${Math.round(
   forecastDay.temp.max
 )} </span>
  <span class="weather-forecast-temperature-min"> ${Math.round(
    forecastDay.temp.min
  )} </span>
  </div>
  </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  document.querySelector(`#forecast`).innerHTML = forecastHTML;
}

function getDailyForecast(coord) {
  console.log(coord);
  let apiKey = "a161492f71b97ed4d827ea73bfed8c93";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  celciusTemperature = response.data.main.temp;
  console.log(response.data);
  document.querySelector(`#current-temperature`).innerHTML =
    Math.round(celciusTemperature);
  let city = response.data.name;
  let county = response.data.sys.country;
  document.querySelector(`#city`).innerHTML = `${city} ${county}`;
  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].description;
  document.querySelector(`#humidity`).innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector(`#wind-speed`).innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(`#date`).innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response.data.weather[0].main);
  let alt = response.data.weather[0].main;
  iconElement.setAttribute("alt", alt);

  getDailyForecast(response.data.coord);
}

function search(city) {
  let apiKey = "a161492f71b97ed4d827ea73bfed8c93";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector(`#city-input`);
  search(cityInputElement.value);
}

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(`#current-temperature`);
  celciusLink.classList.remove(`active`);
  farenheitLink.classList.add(`active`);
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add(`active`);
  farenheitLink.classList.remove(`active`);
  let temperatureElement = document.querySelector(`#current-temperature`);
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}
let celciusTemperature = null;
let form = document.querySelector(`#search-form`);
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector(`#farenheit-link`);
farenheitLink.addEventListener(`click`, displayFarenheitTemperature);
search(`Kyiv`);

let celciusLink = document.querySelector(`#celcius-link`);
celciusLink.addEventListener(`click`, displayCelciusTemperature);
