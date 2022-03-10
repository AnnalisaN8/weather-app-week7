let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let todayDate = document.querySelector(".today-date");
todayDate.innerHTML = `${day} ${hour}:${minute}`;

function searchLocation(position) {
  let apiKey = "caacaca526de1415f6c61fb8c2edfa11";
  let apiCurrentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiCurrentUrl).then(showTemp);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showTemp(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#now-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#max-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°C`;
  document.querySelector("#min-temp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°C`;
}

function searchCity(city) {
  let apiKey = "caacaca526de1415f6c61fb8c2edfa11";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;

  searchCity(city);
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", changeCity);

let positionBtn = document.querySelector("#current-position");
positionBtn.addEventListener("click", getCurrentPosition);

searchCity("Rome");
