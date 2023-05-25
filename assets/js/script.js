const APIkey = "31c543523e6db2c4b64400668e6d07f9";
const latitude = 0;
const longitude = 0;
const main = document.querySelector("main");
const cityInput1 = document.getElementById("city-input1");
const cityInput2 = document.getElementById("city-input2");
const buttonSubmit1 = document.getElementById("submit1");
const buttonSubmit2 = document.getElementById("submit2");
const divCityName1 = document.getElementById("city-name-1");
const divCityName2 = document.getElementById("city-name2");
const divCityName3 = document.getElementById("city-name-3");
const divCitySunrise1 = document.getElementById("city-sunrise-1");
const divCitySunrise2 = document.getElementById("city-sunrise-2");
const divCitySunrise3 = document.getElementById("city-sunrise-3");
const divCitySunset1 = document.getElementById("city-sunset-1");
const divCitySunset2 = document.getElementById("city-sunset-2");
const divCitySunset3 = document.getElementById("city-sunset-3");

function getCity(a) {
    // console.log(a.value);
    return a.value == false ? console.log("nothing here in city 1") : a.value;
}

function sunTrip(sunriseMs, sunsetMs, timezoneMs) {
    // const sunriseTimestamp = dataAll.city.sunrise;
    // const sunsetTimestamp = dataAll.city.sunset;
    // const timezone = dataAll.city.timezone - 7200;

    // Convert Unix timestamps to Date objects
    const sunriseDate = new Date(sunriseMs * 1000);
    const sunsetDate = new Date(sunsetMs * 1000);

    // Convert sunrise and sunset times to local time
    const sunriseLocal = new Date(
        sunriseDate.getTime() + (timezoneMs - 7200) * 1000
    ).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
    const sunsetLocal = new Date(
        sunsetDate.getTime() + (timezoneMs - 7200) * 1000
    ).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    console.log(`Sunrise: ${sunriseLocal}`);
    console.log(`Sunset: ${sunsetLocal}`);
    return sunriseLocal, sunsetLocal;
    // const city1Sunrise = document.getElementById("city1-sunrise");
    // const city1Sunset = document.getElementById("city1-sunset");
    // city1Sunrise.innerHTML = `Sunrise:  ${sunriseLocal}`;
    // city1Sunset.innerHTML = `Sunrise:  ${sunsetLocal}`;
}
// function isToday(date) {
//     return;
// }
function createWeatherObject(rawData) {
    // console.log(rawData     );
    let weatherObject = {
        city: rawData.city.name,
        forecast: [
            {
                date: "12-12-2012",
                minima: {
                    temp: 12,
                    icon: "19d",
                },
                maxima: {
                    temp: 12,
                    icon: "19d",
                },
            },
        ],
    };
    rawData.list.forEach((item) => {
        if (isToday(item.dt_txt)) {
            weatherObject.forecast;
        } else return;
    });
}

let previousCityOutput1;
function getForecast(latitude, longitude, city, state, country) {
    let url2 = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`;
    fetch(url2)
        .then((res) => res.json()) // parse response as JSON
        .then((data) => {
            if (previousCityOutput1) {
                previousCityOutput1.innerHTML = "";
            }
            // let sunriseMs = data.city.sunrise;
            // let sunsetMs = data.city.sunset;
            // let timezoneMs = data.city.timezone;
            // sunTrip(sunriseMs, sunsetMs, timezoneMs);
            let cityContent = `<div class="card"><header><span>${city} - ${state}, ${country}</span><span></span></header><article></article></div>`;

            const cityOutput1 = document.getElementById("city-output1");
            // let article = document.querySelector("article");
            console.log(data);
            data.list.forEach((dueTime) => {
                if (isToday(dueTime.dt_txt)) {
                    cityOutput1.innerHTML += cityContent;
                    // article.innerHTML += `<span>Humidity: ${dueTime.main.humidity}%</span><span>t°C min:${dueTime.main.temp_min} - t°C Max:${dueTime.main.temp_max}</span>`;
                    // } else if (isTomorrow(dueTime.dt_txt)) {
                    //     cityOutput1.innerHTML += cityContent;
                }
            });

            previousCityOutput1 = cityOutput1;
        });
}
function isToday(date) {
    if (new Date(date).getDay() == new Date().getDay()) {
        return true;
    } else return;
}
function isTomorrow(date) {
    if (new Date(date).getDay() == new Date().getDay() + 1) {
        return true;
    } else return;
}
let inputCity = document.getElementById("city-input1");
inputCity.addEventListener("input", getCities);

let previouscitiesList;
async function getCities(e) {
    let searchValue = e.target.value;

    let url = `https://geocoding-api.open-meteo.com/v1/search?name=${searchValue}&count=5`;

    fetch(url)
        .then((res) => res.json()) // parse response as JSON
        .then((data) => {
            let cities = data.results;
            if (previouscitiesList) {
                previouscitiesList.innerHTML = "";
            }
            cities.forEach((city) => {
                let citiesList = document.getElementById("citiesList");
                citiesList.innerHTML += `<div class="city-output" id="${city.id}" data-lat="${city.latitude}" data-lon="${city.longitude}" data-name="${city.name}" data-state="${city.admin1}" data-country="${city.country}">${city.name} - ${city.admin1} - ${city.country}</div>`;
            });
            previouscitiesList = citiesList;
        })
        .catch((err) => {
            console.log(err);
        });
}
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("city-output")) {
        let cityLat = e.target.getAttribute("data-lat");
        let cityLon = e.target.getAttribute("data-lon");
        let cityName = e.target.getAttribute("data-name");
        let citySate = e.target.getAttribute("data-state");
        let cityCountry = e.target.getAttribute("data-country");
        getForecast(cityLat, cityLon, cityName, citySate, cityCountry);
    }
});

// let cityOutput = document.querySelectorAll(".city-output");

// cityOutput[0].addEventListener("mouseover", resultOutput);

// async function getCityCoord() {
//     // const firstCity = getCity(cityInput1);
//     // const secondCity = getCity(cityInput2);
//     // console.log(firstCity);
//     try {
//         // const response = await fetch(
//         //     `http://api.openweathermap.org/geo/1.0/direct?q=${firstCity}&limit=5&appid=${APIkey}`
//         // );
//         // const data = await response.json();

//         // divCityName1.textContent = `${data[0].name}, in ${data[0].country} `;
//         const response1 = await fetch(
//             `http://api.openweathermap.org/data/2.5/forecast?lat=${dataLat}&lon=${dataLon}&appid=${APIkey}&units=metric`
//         );
//         const dataAll = await response1.json();
//         console.log(dataAll);

//         let cityWeather = createWeatherObject(dataAll);

//         createCityCard(cityWeather);

//         sunTrip(dataAll);
//         function tempHour(iHour, indexList) {
//             const temp = document.getElementById(`temperatures-${iHour}`);
//             temp.innerHTML = `Temperature : ${dataAll.list[indexList].main.temp} °C`;
//         }
//         tempHour(1, 0);
//         tempHour(2, 1);
//         tempHour(3, 2);
//         tempHour(4, 3);

//         function humidityHour(iHour, indexList) {
//             const temp = document.getElementById(`humidity-${iHour}`);
//             temp.innerHTML = `Humidity : ${dataAll.list[indexList].main.humidity} %`;
//         }
//         humidityHour(1, 0);
//         humidityHour(2, 1);
//         humidityHour(3, 2);
//         humidityHour(4, 3);

//         function dueTime(i) {
//             const dueTime = document.getElementById(`due-time-${i + 1}`);
//             const dueTimeJ1 = new Date(
//                 dataAll.list[i].dt_txt
//             ).toLocaleTimeString({ hour: "2-digit", minute: "2-digit" });
//             dueTime.textContent = `Weather's First Time ${dueTimeJ1}`;
//         }
//         dueTime(0);
//         dueTime(1);
//         dueTime(2);
//         dueTime(3);
//         function weather(iHour, indexList) {
//             const weather = document.getElementById(`weather-${iHour}`);
//             const weatherState = dataAll.list[indexList].weather[0].description;
//             const weatherIcon = dataAll.list[indexList].weather[0].icon;
//             weather.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherIcon}.png"><span>${weatherState}</span>`;
//         }
//         weather(1, 0);
//         weather(2, 1);
//         weather(3, 2);
//         weather(4, 3);
//         function date() {
//             const date1 = document.getElementById("date-1");
//             const pointedDate = new Date(dataAll.list[0].dt_txt);
//             const pointedDay = new Intl.DateTimeFormat("en-US", {
//                 weekday: "long",
//                 month: "long",
//                 day: "numeric",
//             }).format(pointedDate);
//             date1.textContent = pointedDay;
//         }
//         date();
//     } catch (error) {
//         console.error("An error occurred while fetching the weather " + error);
//     }
// }
// buttonSubmit1.addEventListener("click", getCityCoord);
