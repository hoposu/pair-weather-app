/*List of steps
1.  Link CSS & JS
2. Add boostrap in head: https://getbootstrap.com/docs/4.3/getting-started/introduction/, wrap body in a div container (div.container+tab)
3. Make sure you put styles AFTER the bootstrap link so that bootstrap has precedence
4. Break down your UI into divs
5. Add axios/ajax to header:     <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
*/

// Set the current date & time, set the forecast days of the week
let date = new Date();
function setTimeDate(date) {
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let day = date.getDate();
  let weekArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfWeek = weekArray[date.getDay()];
  let monthArray = [
    "January",
    "February",
    "March",
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
  let month = monthArray[date.getMonth()];
  let year = date.getFullYear();
  document.querySelector(
    "#dateTime"
  ).innerHTML = `${hour}:${minute} on ${dayOfWeek}, ${month} ${day}, ${year}`;

  // Update the forecat days of the week
  document.querySelector("#day1").innerHTML = weekArray[date.getDay() + 1];
  document.querySelector("#day2").innerHTML = weekArray[date.getDay() + 2];
  document.querySelector("#day3").innerHTML = weekArray[date.getDay() + 3];
  document.querySelector("#day4").innerHTML = weekArray[date.getDay() + 4];
  document.querySelector("#day5").innerHTML = weekArray[date.getDay() + 5];
}

//Set the current (1) weather, (2) temp, (3) humidity, (4) wind speed, for a given location
function setWeatherHumidityWind(response) {
  let currentWeather = response.data.weather[0].description;
  let currentTemp = Math.round(response.data.main.temp);
  let currentHumidity = response.data.main.humidity;
  let currentWind = Math.round(response.data.wind.speed);
  document.querySelector("#humidity").innerHTML = `${currentHumidity}%`;
  document.querySelector("#windSpeed").innerHTML = `${currentWind} mph`;
  document.querySelector("#weather").innerHTML = `${currentWeather}`;
  document.querySelector("#currentTemp").innerHTML = `${currentTemp}`;
  document.querySelector(
    "#currentEmoji"
  ).innerHTML = `<img src='https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png'>`;
}

// Set the forecasted temperatures, for a given location
function setForecast(response) {
  document.querySelector("#min1").innerHTML = `${Math.round(
    response.data.list[2].main.temp_min
  )}°`;
  document.querySelector("#max1").innerHTML = `${Math.round(
    response.data.list[2].main.temp_max
  )}°`;

  document.querySelector("#min2").innerHTML = `${Math.round(
    response.data.list[10].main.temp_min
  )}°`;
  document.querySelector("#min3").innerHTML = `${Math.round(
    response.data.list[18].main.temp_min
  )}°`;
  document.querySelector("#min4").innerHTML = `${Math.round(
    response.data.list[26].main.temp_min
  )}°`;
  document.querySelector("#min5").innerHTML = `${Math.round(
    response.data.list[34].main.temp_min
  )}°`;

  document.querySelector("#max2").innerHTML = `${Math.round(
    response.data.list[10].main.temp_max
  )}°`;
  document.querySelector("#max3").innerHTML = `${Math.round(
    response.data.list[18].main.temp_max
  )}°`;
  document.querySelector("#max4").innerHTML = `${Math.round(
    response.data.list[26].main.temp_max
  )}°`;
  document.querySelector("#max5").innerHTML = `${Math.round(
    response.data.list[34].main.temp_max
  )}°`;
}

// Upate the current weather and forecast emojis, based on current and forecasted temperatures
function updateEmojis(response) {
  document.querySelector(
    "#emoji1"
  ).innerHTML = `<img src='https://openweathermap.org/img/wn/${response.data.list[2].weather[0].icon}@2x.png'>`;

  document.querySelector(
    "#emoji2"
  ).innerHTML = `<img src='https://openweathermap.org/img/wn/${response.data.list[10].weather[0].icon}@2x.png'>`;

  document.querySelector(
    "#emoji3"
  ).innerHTML = `<img src='https://openweathermap.org/img/wn/${response.data.list[18].weather[0].icon}@2x.png'>`;

  document.querySelector(
    "#emoji4"
  ).innerHTML = `<img src='https://openweathermap.org/img/wn/${response.data.list[26].weather[0].icon}@2x.png'>`;

  document.querySelector(
    "#emoji5"
  ).innerHTML = `<img src='https://openweathermap.org/img/wn/${response.data.list[34].weather[0].icon}@2x.png'>`;
}

// Convert all temperatures, given linked C/F
// TODO

// Update all location and temperature UI based on what the user enters in the search bar
// TODO

//Get the current position to initialize the page with weather data from the current location
function setInitialPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let cityApiURL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&units=metric&limit=1&appid=${apiKey}`;
  axios.get(cityApiURL).then(showInitialPositionData);
  let forecastApiURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(forecastApiURL).then(setForecast);
  axios.get(forecastApiURL).then(updateEmojis);
}

// Update city name
function showInitialPositionData(response) {
  let city = response.data[0].name;
  document.querySelector("h1").innerHTML = city;
  let currentApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(currentApiURL).then(setWeatherHumidityWind);
}

let apiKey = `53f3bc1f5d348c44be3e3754c7185573`;
setTimeDate(date);
navigator.geolocation.getCurrentPosition(setInitialPosition);

//City -> weather API
//let cityToWeatherApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
