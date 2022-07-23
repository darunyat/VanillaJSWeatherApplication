let apiKey = "a161492f71b97ed4d827ea73bfed8c93";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Dehli&appid=${apiKey}&units=metric`;

console.log(apiUrl);

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
function displayTemperature(response) {
  console.log(response.data);
  document.querySelector(`#current-temperature`).innerHTML = Math.round(
    response.data.main.temp
  );
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
}
axios.get(apiUrl).then(displayTemperature);
