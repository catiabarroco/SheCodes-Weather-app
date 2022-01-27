//--------------------------------------------------------------------//
//Date()
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "March ",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//Tuesday 16:00
let now = new Date();
let dayWeek = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dateNow = document.querySelector(".date-now");
dateNow.innerHTML = `${dayWeek} ${hours}:${minutes} `;

//12 January 2022
let daymonth = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();

let dateNowFull = document.querySelector(".date-now-full");
dateNowFull.innerHTML = `${daymonth} ${month} ${year} `;

//--------------------------------------------------------------------//
//search city and Temp city
let cityName = document.querySelector(".city-name");
let apiKey = "fb1d1b3815d5cd454b736465d3b476ce";

function typeCity(event) {
  event.preventDefault();
  let cityNameSearch = document.querySelector("#city-name-search");
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = cityNameSearch.value;

  let urlbyCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameSearch.value}&units=metric&appid=${apiKey}`;

  axios.get(urlbyCity).then(showTemperature);
}
let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", typeCity);

//--------------------------------------------------------------------//
//convert it to Fahrenheit

//celsius-link
//fahrenheit-link
function toConvertC(event) {
  event.preventDefault();
  let urlbyCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.textContent}&units=metric&appid=${apiKey}`;

  axios.get(urlbyCity).then(showTemperature);
}

function toConvertF(event) {
  event.preventDefault();

  let urlbyCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.textContent}&units=imperial&appid=${apiKey}`;

  axios.get(urlbyCity).then(showTemperatureF);
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", toConvertC);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", toConvertF);

//--------------------------------------------------------------------//
//City name, Now

function showTemperature(response) {
  let tempNowCityName = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  let wind = document.querySelector(".wind");
  let humidity = document.querySelector(".humidity");
  let tempMaxDay0 = document.querySelector(".tempMaxDay0");
  let tempMinDay0 = document.querySelector(".tempMinDay0");
  cityName.innerHTML = response.data.name;
  tempNowCityName.innerHTML = temperature;
  tempMaxDay0.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;
  tempMinDay0.innerHTML = `${Math.round(response.data.main.temp_min)}°C`;
  console.log(response);

  wind.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
}

function showTemperatureF(response) {
  let tempNowCityName = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  tempNowCityName.innerHTML = temperature;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let urlByCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(urlByCoords).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(showPosition);

//--------------------------------------------------------------------//
