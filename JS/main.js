// obj variable
let weatherInfo = {};
let photoInfo = {};

// get weather API function and calling display functions
async function getData(city = "cairo"){
    let response = await fetch( `https://api.weatherapi.com/v1/forecast.json?key=ba3db84474ee460082d133405232002&q=${city}&days=3` );
    weatherInfo = await response.json();
    console.log( weatherInfo);
        currentWeather();
        secundWeather();
        thirdWeather();
        country();
}
// function for display current city weather
async function currentWeather() {
    let weatherData =`
    <div class="weather-info shadow-lg px-1 h-100">
    <div class="weather-date text-info p-2 shadow-sm d-flex justify-content-between">
    <h6 class="day">${new Date(weatherInfo.forecast.forecastday[0].date).toLocaleString('default', {weekday:'long'})}</h6>
    <h6 class="date">${new Date(weatherInfo.forecast.forecastday[0].date).toLocaleString('default', {day:'numeric', month:'long'})}</h6>
    </div>
    <div class="weather-location p-2 my-1">
    <h5 class="location text-capitalize"><span class="fa-solid fa-location-dot text-info"></span> ${weatherInfo.location.name}</h5>
    </div>
    <div class="weather-data p-2 d-flex justify-content-around">
    <h2 class="degree">${weatherInfo.current.temp_c}&#8451;</h2>
    <img src="https:${weatherInfo.current.condition.icon}" class="img-fluid" alt="">
    </div>
    <div class="condition p-2">
    <p class="text-info">${weatherInfo.current.condition.text}</p>
    <p>
    <span><i class="fa-solid fa-umbrella text-info"></i> ${weatherInfo.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
    <span><i class="fa-solid fa-wind text-info"></i> ${weatherInfo.current.wind_kph}Kph</span>
    <span><i class="fa-regular fa-compass text-info"></i> ${weatherInfo.current.wind_dir}</span>
    </p>
    </div>
    </div>
    `
    document.getElementById('current').innerHTML = weatherData
}
// function for display next day city weather
async function secundWeather() {
    let secundData = `
    <div class="weather-info shadow-lg px-1 h-100">
    <div class="weather-date text-info  d-flex justify-content-between p-2 shadow-sm">
    <h6 class="day">${new Date(weatherInfo.forecast.forecastday[1].date).toLocaleString('default', {weekday:'long'})}</h6>
    <h6 class="date">${new Date(weatherInfo.forecast.forecastday[1].date).toLocaleString('default', {day:'numeric', month:'long'})}</h6>
    </div>
    <div class="weather-data p-2 d-flex flex-column justify-content-center align-items-center text-center">
    <img src="https:${weatherInfo.forecast.forecastday[1].day.condition.icon}" class="img-fluid mb-4" alt="">
    <h3 class="h-degree">${weatherInfo.forecast.forecastday[1].day.maxtemp_c}&#8451;</h3>
    <p class="l-degree">${weatherInfo.forecast.forecastday[1].day.mintemp_c}&deg;</p>
    <p class="text-info">${weatherInfo.forecast.forecastday[1].day.condition.text}</p>
    <p><span><i class="fa-solid fa-umbrella text-info"></i> ${weatherInfo.forecast.forecastday[1].day.daily_chance_of_rain}%</span></p>
    </div>
    </div>
    `
    document.getElementById('secund').innerHTML = secundData
}
// function for display last day city weather
async function thirdWeather() {
    let thirdData = `
    <div class="weather-info shadow-lg px-1 h-100">
    <div class="weather-date text-info  d-flex justify-content-between p-2 shadow-sm">
    <h6 class="day">${new Date(weatherInfo.forecast.forecastday[2].date).toLocaleString('default', {weekday:'long'})}</h6>
    <h6 class="date">${new Date(weatherInfo.forecast.forecastday[2].date).toLocaleString('default', {day:'numeric', month:'long'})}</h6>
    </div>
    <div class="weather-data p-2 d-flex flex-column justify-content-center align-items-center text-center">
    <img src="https:${weatherInfo.forecast.forecastday[2].day.condition.icon}" class="img-fluid mb-4" alt="">
    <h3 class="h-degree">${weatherInfo.forecast.forecastday[2].day.maxtemp_c}&#8451;</h3>
    <p class="l-degree">${weatherInfo.forecast.forecastday[2].day.mintemp_c}&deg;</p>
    <p class="text-info">${weatherInfo.forecast.forecastday[2].day.condition.text}</p>
    <p><span><i class="fa-solid fa-umbrella text-info"></i> ${weatherInfo.forecast.forecastday[2].day.daily_chance_of_rain}%</span></p>
    </div>
    </div>
    `
    document.getElementById('theerd').innerHTML = thirdData
}
// function for display country name of city and time
async function country() {
    let info = `
    <h3 id="country"> ${weatherInfo.location.country} </h3>
    <h3 id="time"> ${new Date(weatherInfo.location.localtime).toLocaleString('default', {hour:'numeric', minute:'numeric'})} </h3>
    `
    document.getElementById('country').innerHTML = info
}
// get place photo API function and calling display placePhoto function
async function getPlacePhoto(cityPhoto = "cairo"){
    let response = await fetch( `https://api.unsplash.com/search/photos?query=${cityPhoto}&client_id=5xlYzeVV6x3wQrufoykmK8-yM1PP77y2eRP-Ul-3vr8` );
    photoInfo = await response.json();
    console.log( photoInfo);
    placePhoto();
}
// function for display city photo
async function placePhoto() {
    let photo = `
    <img src="${photoInfo.results[1].urls.regular}" class="w-100" style="height: 450px;" alt="">

    `
    document.getElementById('photo').innerHTML = photo
}

// calling API function
getPlacePhoto();
getData();

let input = document.querySelector('input');
input.addEventListener('keyup', function () {
    if (input.value.length >= 3) {
        getData(input.value);
        getPlacePhoto(input.value);
    }
})
