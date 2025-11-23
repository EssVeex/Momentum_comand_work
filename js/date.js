//GREETING, DATE & TIME

function showGreet(date) {
    const greet = document.querySelector('.greeting');
    const timeOfTheDay = getTime();
    const onlyGreet = `Good ${timeOfTheDay},`;
    greet.textContent = onlyGreet;
}

function getTime() {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 0 && hours < 6) {
        return 'night'
    } else if (hours >= 6 && hours < 12) {
        return 'morning'
    } else if (hours >= 12 && hours < 18) {
        return 'afternoon'
    } else if (hours >= 18 && hours < 23) {
        return 'evening'
    }
}

function showDate(date) {
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const onlyDate = date.toLocaleDateString('en-US', options);
    const dateItem = document.querySelector('.date');
    dateItem.textContent = onlyDate;
}

function showTime() {
    const date = new Date();
    showDate(date);
    showGreet(date);
    getTime(date);

    const time = document.querySelector('.time');
    const onlyTime = date.toLocaleTimeString();
    time.textContent = onlyTime;
    setTimeout(showTime, 1000);
}

const nameInput = document.querySelector('.name');
document.querySelector('.name').placeholder = '[Enter your name]';

function setLocalStorage() {
    localStorage.setItem('nameOut', nameInput.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if(localStorage.getItem('nameOut')) {
        nameInput.value = localStorage.getItem('nameOut');
    }
}
window.addEventListener('load', getLocalStorage)

showTime();

//SLIDER IMAGE & API

const imagesApi = document.querySelector('.imgs');
const imagesTag = document.querySelector('.tag');
const tags = document.querySelector('.third');

imagesTag.value = getTime();
tags.classList.add('hidden-block');

let randNum = Math.floor(Math.random() * 20) + 1;

function setBg(timeOfTheDay, bgNum, query = getTime()) {
    const imgSourses = {
        unsplash: {
            name: 'unsplash',
            clientId: 'client_id=4MRNFp_9_OerrJqL2qZ0LTinF4oJS9h0kNARigH5ZYI',
            src: `https://api.unsplash.com/photos/random?orientation=landscape&query=${query}&`,
            getLink: async function () {
            let url = this.src + this.clientId;
            const res = await fetch(url);
            const data = await res.json();
            url = data.urls.regular;
            const img = new Image();
            img.src = url;
            img.addEventListener('load', () => {
              document.body.style.backgroundImage = `url(${img.src})`;
            });
          }
        },
        flickr: {
            name: 'flickr',
            apiKey: 'api_key=0f15ff623f1198a1f7f52550f8c36057',
            src: `https://www.flickr.com/services/rest/?`,
            method: `method=flickr.photos.search&`,
            tags: `&tags=${query}&tag_mode=and&extras=url_h&format=json&nojsoncallback=1`,
            getLink: async function () {
            let url = this.src + this.method + this.apiKey + this.tags;
            const res = await fetch(url);
            const data = await res.json();
            url = data.photos.photo[randNum].url_h;
            const img = new Image();
            img.src = url;
            img.addEventListener('load', () => {
                document.body.style.backgroundImage = `url(${img.src})`;
            });
        }
      }
    };
    bgNum = randNum;
    bgNum < 10 ? bgNum = bgNum.toString().padStart(2, "0") : bgNum.toString();

    switch (imagesApi.value) {
        case '0':
            const img = new Image();
            img.src = `https://raw.githubusercontent.com/milana-bilych/stage1-tasks/assets/images/${timeOfTheDay}/${bgNum}.jpg`
            img.addEventListener('load', () => {
                document.body.style.backgroundImage = `url(${img.src})`;
            });
            break;
        case '1':
            imgSourses.unsplash.getLink();
            break;
        case '2':
            imgSourses.flickr.getLink();
      }
}
setBg(getTime(), randNum);

imagesApi.addEventListener('change', () => {
    if (imagesApi.value !== '0') {
        tags.classList.remove('hidden-block');
        setBg(getTime(), randNum, imagesTag.value);
    } else {
        tags.classList.add('hidden-block');
        setBg(getTime(), randNum);
    }
  });

const nextSlide = document.querySelector('.slide-next');
const prevSlide = document.querySelector('.slide-prev');

function getSlideNext() {
    randNum == 20 ? randNum = 1 : randNum++
    setBg(getTime(), randNum);
}

function getSlidePrev() {
    randNum == 1 ? randNum = 20 : randNum--
    setBg(getTime(), randNum);
}

nextSlide.addEventListener('click', getSlideNext);
prevSlide.addEventListener('click', getSlidePrev);