// SETTINGS

const menu = document.querySelector('.nav');
const open = document.querySelector('.settings')
const shadowBlock = document.querySelector('div.out-shadow');
const time = document.querySelector('.time');
const player = document.querySelector('.player');
const date = document.querySelector('.date');
const greet = document.querySelector('.greeting-container');
const contQuote = document.querySelector('.quote');
const weather = document.querySelector('.weather');

function openMenu() {
    menu.classList.toggle('active');
    shadowBlock.classList.toggle('shadow-block');
}

function closeMenu() {
    menu.classList.remove('active');
    shadowBlock.classList.remove('shadow-block');
}

open.addEventListener('click', openMenu);
shadowBlock.addEventListener('click', closeMenu);

document.querySelector('.checkbox-time').addEventListener("click", function() {
    time.classList.toggle("hidden");
})

document.querySelector('.checkbox-weather').addEventListener("click", function() {
   weather.classList.toggle("hidden");
})

document.querySelector('.checkbox-music').addEventListener("click", function() {
    player.classList.toggle("hidden");
})

document.querySelector('.checkbox-quotes').addEventListener("click", function() {
    contQuote.classList.toggle("hidden");
})

document.querySelector('.checkbox-date').addEventListener("click", function() {
    date.classList.toggle("hidden");
})

document.querySelector('.checkbox-greet').addEventListener("click", function() {
    greet.classList.toggle("hidden");
})

// LANG

/*const langBtn = document.querySelector('.toggle-lang');

const lang = {
    en: {
        placeholder: "[Enter your name]",
        night: "Good night,",
        morning: "Good morning,",
        afternoon: "Good afternoon,",
        evening: "Good evening,",
        windSpeed: "Wind speed",
        windSpeedUnit: "m/s",
        humidity: "Humidity",
        defaultCity: "Minsk",
        language: "Language",
        dataLanguage: "en-EN",
        time: "Time",
        date: "Date",
        greeting: "Greeting",
        quotes: "Quotes",
        weather: "Weather",
        audioPlayer: "Music",
        sourceImg: 'Images',
      },
      ru: {
        placeholder: "[Введите имя]",
        night: "Доброй ночи,",
        morning: "Доброе утро,",
        afternoon: "Добрый день,",
        evening: "Добрый вечер,",
        windSpeed: "Скорость ветра",
        windSpeedUnit: "м/с",
        humidity: "Влажность",
        defaultCity: "Минск",
        language: "Язык",
        dataLanguage: "ru-RU",
        time: "Время",
        date: "Дата",
        greeting: "Приветствие",
        quotes: "Цитаты",
        weather: "Погода",
        audioPlayer: "Аудио плеер",
        sourceImg: 'Источник изображений',
      }
}

window.addEventListener('load', () => {
    let settings = {
      lang: 'en'
    }
});

localStorage.setItem('settings', JSON.stringify(settings));

if (localStorage.getItem('settings')) {
    settings = JSON.parse(localStorage.getItem('settings'));
}

langBtn.addEventListener('change', () => {
    settings.lang = langBtn.value;
    translateSite();
});

function translateSite() {
    userName.placeholder = lang[settings.lang].placeholder;
    if (cityName.value === "Минск" || cityName.value === "Minsk") {
      openweathermap.city = `${translation[settings.lang].defaultCity}`;
      cityName.value = ;
    }
    openweathermap.lang = `${settings.lang}`;
    openweathermap.getWeather(cityInput.value);
    getQuotes();
    translateMenu();
}*/