let apiKey = "a161492f71b97ed4d827ea73bfed8c93";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

console.log(apiUrl);

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
}
axios.get(apiUrl).then(displayTemperature);
