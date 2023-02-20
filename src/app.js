// showing data from Api
let citywether = document.querySelector("#citywether");
let key = "82b61663c38282737706802a285b5b3a";
// global variables
let input = document.querySelector("#floatingInput");
let currentLocation = document.querySelector("#current-location");
let temp = document.querySelector("#temp");
let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");
let celsiusTemp = null;

function showCityWeather(response) {
  // show city
  let showCity = document.querySelector("#city");
  showCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  // show description
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  // show temp
  temp.innerHTML = Math.round(response.data.main.temp);
  function showCelsius(event) {
    event.preventDefault();
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
    temp.innerHTML = Math.round(response.data.main.temp);
  }
  celsius.addEventListener("click", showCelsius);
  // storing data
  celsiusTemp = Math.round(response.data.main.temp);
  //show Humidity
  let Humidity = document.querySelector("#Humidity");
  Humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  //show Wind
  let Wind = document.querySelector("#Wind");
  Wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;

  //storing tempreture for conversion

  //show time
  function showTime() {
    let dt = response.data.dt * 1000;
    let dateTime = new Date(dt);
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
    if (minuits < 10) {
      minuits = `{0}minuits`;
    }
    let hours = dateTime.getHours();
    if (hours < 10) {
      hours = `{0}hours`;
    }
    let currentdate = document.querySelector("#current-date");
    currentdate.innerHTML = `${weekdays[day]}, ${hours}:${minuits}`;
  }
  showTime();
  //show icon
  let icon = document.querySelector("#Weather-icon");
  let weatherIcon = response.data.weather[0].icon;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
}
// getting data from Open Weather Api
function retrieveWeatherData(event) {
  event.preventDefault();
  let city = input.value;
  let urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(urlCity).then(showCityWeather);
}
citywether.addEventListener("submit", retrieveWeatherData);

//fahrenheit and celsius conversion buttons

function showFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitConvert = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitConvert);
}
fahrenheit.addEventListener("click", showFahrenheit);

// show current location
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
