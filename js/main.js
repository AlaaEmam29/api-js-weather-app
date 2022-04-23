"use strict";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
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
let searchInput = document.querySelector(".search-input input"),
  weatherCards = document.querySelector(".weather-cards"),
  noMatching = document.querySelector(".no-matching"),
  emailInput = document.getElementById("emailInput"),
  emailInputAlert = document.getElementById("emailInputAlert"),
  subscribeBtn = document.getElementById("subscribeBtn"),
  closeBtn = document.getElementById("closeBtn"),
  submitLightBox = document.querySelector(".submit-lightBox"),
  mq = window.matchMedia("(max-width: 991px)"),
  wavesImg = document.querySelector(".waves img"),
  iconBars = document.querySelector(".icon-bars i"),
  navItems = document.getElementById("navItem"),
  navLink = document.querySelectorAll("#navItem li"),
  weatherRequest = new XMLHttpRequest(),
  weatherData;
weatherData = undefined;
searchInput.addEventListener("keyup", function (e) {
  if (e.target.value.length >= 3) {
    getWeatherResponse(e.target.value);
  }
});

async function getWeatherResponse(currentCity) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=e44ba627fb55491c980204539221804&q=${currentCity}&days=3&aqi=no&alerts=no`
    );
    if (response.ok) {
      weatherRequest = await response.json();
      noMatching.classList.replace("d-block", "d-none");
      weatherCards.style.display = "flex";

      displayTodayWeather(
        weatherRequest.location,
        weatherRequest.current,
        weatherRequest.forecast
      );
      displayNextDayWeather(weatherRequest.forecast.forecastday);
    } else {
      noMatching.classList.replace("d-none", "d-block");
      weatherCards.style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
}
function displayTodayWeather(location, current, forecast) {
  let name = document.getElementById("location"),
    todayDegree = document.getElementById("todayDegree"),
    todayIcon = document.getElementById("todayIcon"),
    condition = current.condition,
    todayDescription = document.getElementById("todayDescription"),
    humidity = document.getElementById("humidity"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    today = document.getElementById("today"),
    todayData = document.getElementById("todayData"),
    currentDay = new Date(forecast.forecastday[0].date);
  name.innerHTML = location.name;
  todayDegree.innerHTML = current.temp_c;
  todayIcon.setAttribute("src", `https:${condition.icon}`);
  todayIcon.setAttribute("alt", condition.text);
  todayDescription.innerHTML = condition.text;
  humidity.innerHTML = current.humidity;
  wind.innerHTML = current.wind_kph;
  compass.innerHTML = current.wind_dir;
  today.innerHTML = days[currentDay.getDay()];
  todayData.innerHTML = `${currentDay.getDate()} ${
    months[currentDay.getMonth()]
  }`;
}
function displayNextDayWeather(forecastday) {
  for (let i = 0; i < forecastday.length; i++) {
    let nextDayIcon = document.querySelectorAll(".nextDay-icon"),
      nextDayDescription = document.querySelectorAll(".nextDay-description"),
      maxDegree = document.querySelectorAll(".max-degree"),
      minDegree = document.querySelectorAll(".min-degree"),
      nextDay = document.querySelectorAll(".nextDay"),
      nextDayDate = document.querySelectorAll(".nextDayData"),
      date = new Date(forecastday[i + 1].date);
    nextDayIcon[i].setAttribute(
      "src",
      `https:${forecastday[i + 1].day.condition.icon}`
    );
    nextDayDescription[i].innerHTML = forecastday[i + 1].day.condition.text;
    maxDegree[i].innerHTML = forecastday[i + 1].day.maxtemp_c;
    minDegree[i].innerHTML = forecastday[i + 1].day.mintemp_c;
    nextDay[i].innerHTML = days[date.getDay()];
    nextDayDate[i].innerHTML = `${date.getDate()} ${months[date.getMonth()]}`;
  }
}
getWeatherResponse("United States");
emailInput.addEventListener("keyup", validateEmail);
function checkEmpty() {
  if (emailInput.value == "") {
    emailInputAlert.classList.replace("d-none", "d-block");
    subscribeBtn.disabled = true;
    return true;
  }
}
function validateEmail() {
  let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,}$/;

  if (regex.test(emailInput.value) == true) {
    emailInputAlert.classList.replace("d-block", "d-none");

    subscribeBtn.disabled = false;

    return true;
  } else {
    emailInputAlert.classList.replace("d-none", "d-block");

    subscribeBtn.disabled = true;

    return false;
  }
}
function submitUser() {
  if (!checkEmpty()) {
    if (validateEmail() == true) {
      emailInputAlert.classList.replace("d-block", "d-none");
      subscribeBtn.disabled = false;
      submitLightBox.style.display = "flex";
    }
  }
}
subscribeBtn.addEventListener("click", function () {
  submitUser();
});
closeBtn.addEventListener("click", function () {
  submitLightBox.style.display = "none";
  emailInput.value = "";
});

if (mq.matches) {
  wavesImg.setAttribute("src", "images/wave-sm.svg");
} else {
  wavesImg.setAttribute("src", "images/wave-lg.svg");
}

iconBars.addEventListener('click',function ()
{
    navItems.classList.toggle('nav-active')
    console.log("true")
})
navLink.forEach((link,index)=>
{

link.addEventListener("click",function ()
{
    navItems.classList.remove('nav-active')
})
})
