// showing data from Api
let citywether = document.querySelector("#citywether");

let key = "82b61663c38282737706802a285b5b3a";
let input = document.querySelector("#floatingInput");
let temp = document.querySelector("#temp");

function showCityWeather(response) {
  console.log(response);
  // show city
  let showCity = document.querySelector("#city");
  showCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  // show description
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  // show temp
  temp.innerHTML = Math.round(response.data.main.temp);
  // show temp with celsius button
  let celsius = document.querySelector("#celsius");
  function showcelsius() {
    temp.innerHTML = Math.round(response.data.main.temp);
  }
  celsius.addEventListener("click", showcelsius);
  //show Humidity
  let Humidity = document.querySelector("#Humidity");
  Humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  //show Wind
  let Wind = document.querySelector("#Wind");
  Wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;

  //show time
  function showTime() {
    let dt = response.data.dt;
    let dateTime = new Date(dt * 1000);
    let day = dateTime.getDay();
    let weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let minuits = dateTime.getMinutes();
    let hours = dateTime.getHours();
    let currentdate = document.querySelector("#current-date");
    currentdate.innerHTML = `${weekdays[day]}, ${hours}:${minuits}`;
  }
  showTime();
}

// getting data from Open Weather Api
function retrieveWeatherData(event) {
  event.preventDefault();
  let city = input.value;
  let urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(urlCity).then(showCityWeather);
}
citywether.addEventListener("submit", retrieveWeatherData);

//fahrenheit

let fahrenheit = document.querySelector("#fahrenheit");
function showFahrenheit(response) {
  temp.innerHTML = Math.round(response.data.main.temp);
}
function getFarenheit() {
  let city = input.value;
  let urlFah = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
  axios.get(urlFah).then(showFahrenheit);
}
fahrenheit.addEventListener("click", getFarenheit);

// show current location
let currentLocation = document.querySelector("#current-location");

function retrieveLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let urlcurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(urlcurrent).then(showCityWeather);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}
currentLocation.addEventListener("click", getCurrentLocation);
