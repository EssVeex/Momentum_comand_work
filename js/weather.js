// WEATHER

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const cityName = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const error = document.querySelector('.weather-error');

function setLocalStorage() {
    localStorage.setItem('cityOut', cityName.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if(localStorage.getItem('cityOut')) {
        cityName.value = localStorage.getItem('cityOut');
    }
    getWeather();
}
window.addEventListener('load', getLocalStorage)

cityName.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        getWeather();
    }
})

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&lang=en&appid=2810fea034dff5f1a2d796160ea1cdc8&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
    const APIError = parseInt(data.cod)

    try {
        if (APIError == 404) {
            throw `Error: ${APIError} Not Found`
        } else if (APIError == 400) {
            throw `Error: ${APIError} Bad Request`
        } else {
            throw ''
        }
    } catch (err) {
        error.textContent = err
        humidity.textContent = null
        wind.textContent = null
        weatherDescription.textContent = null
        temperature.textContent = null
        weatherIcon.removeAttribute('class')
    }
    
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind Speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
}
getWeather();