// showing data from Api
let citywether = document.querySelector("#citywether");
let key = "b1a8336ff1e05b64da5625e4158fbea3";
// global variables
let input = document.querySelector("#floatingInput");
let currentLocation = document.querySelector("#current-location");
let temp = document.querySelector("#temp");
let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");
let celsiusTemp = null;

//converting timestamp to readable time for forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saterday",
  ];
  return weekdays[day];
}

// displaying forcast html
function showForcast(response) {
  let Weatherforcast = document.querySelector("#Weather-forcast");
  let forecast = response.data.daily;
  console.log(forecast);
  let forcastHTML = `<div class="row">`;

  forecast.forEach(function (forecastdays, index) {
    if (index < 6) {
      forcastHTML =
        forcastHTML +
        `<div class="col Weather-forcast text-center">
          <div class="forcast-date">${formatDay(forecastdays.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${
            forecastdays.weather[0].icon
          }.png" alt="" />
          <div class="decs">${forecastdays.weather[0].description}</div>
          <span id="forcast-temp-min" class="forcast-temp">${Math.round(
            forecastdays.temp.min
          )}°</span> 
          <span id="forcast-temp-max" class="forcast-temp">${Math.round(
            forecastdays.temp.max
          )}°</span>
        </div>`;
    }
  });
  forcastHTML = forcastHTML + `</div>`;
  Weatherforcast.innerHTML = forcastHTML;
}

//displaying forcast api
function getForcast(coordinates) {
  let apiurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
  axios.get(apiurl).then(showForcast);
}

function showCityWeather(response) {
  // show city
  let showCity = document.querySelector("#city");
  showCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  // show description
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  //storing tempreture for conversion
  temp.innerHTML = Math.round(response.data.main.temp);
  // show temp
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
      minuits = `0` + `minuits`;
    }
    let hours = dateTime.getHours();
    if (hours < 10) {
      hours = `0` + `hours`;
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
  getForcast(response.data.coord);
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
