var city = document.querySelector("#city");

var months = [
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

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var date = new Date();
var day = days[date.getDay()];

var today = document.querySelector(".today-card .head");
var day1 = document.querySelector(".day1-card .head");
var day2 = document.querySelector(".day2-card .head");

today.innerHTML = `${day}, ${date.getDate()} ${months[date.getMonth()]}`;
day1.innerHTML = `${days[(date.getDay() + 1) % 7]}, ${date.getDate() + 1} ${
  months[date.getMonth()]
}`;
day2.innerHTML = `${days[(date.getDay() + 2) % 7]}, ${date.getDate() + 2} ${
  months[date.getMonth()]
}`;

city.addEventListener("change", function (event) {
  var place = event.target.value;
  getWeather(place);
  getWeather(place)
    .then(function (data) {
      displayWeather(data);
    })
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
    });
});

async function getWeather(place) {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ca8723f7f0424b15a0d23837250207&q=${place}&days=3`
  );
  var data = await response.json();
  return data;
}

async function displayWeather(data) {
  var todaylocation = document.querySelector(".today-card .location");
  var todaytemp = document.querySelector(".today-card .temp");
  var todayicon = document.querySelector(".today-card .temp-icon");
  var todaydescription = document.querySelector(".today-card .description");
  var humidity = document.querySelector(".today-card .humidity");
  var wind = document.querySelector(".today-card .wind");
  var direction = document.querySelector(".today-card .direction");

  var day1icon = document.querySelector(".day1-card .temp-icon");
  var day1maxtemp = document.querySelector(".day1-card .max-temp");
  var day1mintemp = document.querySelector(".day1-card .min-temp");
  var day1description = document.querySelector(".day1-card .description");

  var day2icon = document.querySelector(".day2-card .temp-icon");
  var day2maxtemp = document.querySelector(".day2-card .max-temp");
  var day2mintemp = document.querySelector(".day2-card .min-temp");
  var day2description = document.querySelector(".day2-card .description");

  todaylocation.textContent = data.location.name;
  todaytemp.textContent = data.current.temp_c + "°C";
  todayicon.innerHTML = `<img src="${data.current.condition.icon}" alt="" />`;
  todaydescription.textContent = data.current.condition.text;
  humidity.innerHTML =
    `<img src="images/icon-umberella.png" alt="">` +
    data.current.humidity +
    "%";
  wind.innerHTML =
    `<img src="images/icon-wind.png" alt="">` + data.current.wind_kph + " km/h";
  direction.innerHTML =
    `<img src="images/icon-compass.png" alt="">` + data.current.wind_dir;

  day1icon.innerHTML = `<img src="${data.forecast.forecastday[1].day.condition.icon}" alt="" />`;
  day1maxtemp.textContent = data.forecast.forecastday[1].day.maxtemp_c + "°C";
  day1mintemp.textContent = data.forecast.forecastday[1].day.mintemp_c + "°C";
  day1description.textContent = data.forecast.forecastday[1].day.condition.text;

  day2icon.innerHTML = `<img src="${data.forecast.forecastday[2].day.condition.icon}" alt="" />`;
  day2maxtemp.textContent = data.forecast.forecastday[2].day.maxtemp_c + "°C";
  day2mintemp.textContent = data.forecast.forecastday[2].day.mintemp_c + "°C";
  day2description.textContent = data.forecast.forecastday[2].day.condition.text;
}

getWeather("cairo")
  .then(function (data) {
    displayWeather(data);
  })
  .catch(function (error) {
    console.error("Error fetching initial weather data:", error);
  });

document.querySelector(".hamburgerbtn .list-bar").addEventListener("click", function () {
  var navList = document.getElementById("nav-list");
  if (navList.style.display === "flex" || navList.style.display === "block") {
    navList.style.display = "none";
  } else {
    navList.style.display = "block";
  }
});

document.addEventListener("click", function (event) {
  var navList = document.getElementById("nav-list");
  var hamburgerBtn = document.querySelector(".hamburgerbtn .list-bar");
  
  if (!navList.contains(event.target) && !hamburgerBtn.contains(event.target)) {
    navList.style.display = "none";
  }
});

// add event listener to close the nav list when clicking on a link
document.querySelectorAll("#nav-list a").forEach(function (link) {
  link.addEventListener("click", function () {
    var navList = document.getElementById("nav-list");
    navList.style.display = "none";
  });
});


