// AUDIO

import playList from './playList.js';

const audio = new Audio();
const player = document.querySelector('.player');
const play = document.querySelector('.play');
const playNext = document.querySelector('.play-next');
const playPrev = document.querySelector('.play-prev');
const list = document.querySelector('.play-list');
const volume = document.querySelector('.volume');
const progress = document.querySelector('.progress-bar');
const progressLength = document.querySelector('.progress-length');
const progressTime = document.querySelector('.progress-time');
const songTitle = document.querySelector('.track-name');

let isPlay = false;
let playNum = 0;

window.addEventListener('load', () => {
    list.childNodes.forEach(li => li.classList.remove('item-active'));
    list.childNodes[playNum].classList.add('item-active');
    progressLength.innerHTML = playList[playNum].duration;
    songTitle.innerHTML = playList[playNum].title;
    audio.src = playList[playNum].src;
    audio.volume = .75;
})

function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    if (!isPlay) {
        audio.play();
        isPlay = true;      
    } else {
        audio.pause();
        isPlay = false;
    }
    play.classList.toggle('pause');
    list.childNodes.forEach(li => li.classList.remove('item-active'));
    list.childNodes[playNum].classList.add('item-active');
    progressLength.innerHTML = playList[playNum].duration;
    songTitle.innerHTML = playList[playNum].title;
}

playList.forEach(item => {
    const li = document.createElement('li');
    list.append(li);
    li.classList.add('play-item');
    li.textContent = item.title;
})

list.childNodes.forEach((li, indx) => {
    li.addEventListener('click', () => {
        playNum = indx;
        audio.src = playList[playNum].src;
        audio.play();
        songTitle.innerHTML = playList[playNum].title;
        progressLength.innerHTML = playList[playNum].duration;

        if (!isPlay) {
            isPlay = true;
            play.classList.add("pause");
        }
    })
})

function playPrevF() {
    if (playNum--) {
        playNum <= playList.length;
        playAudio()
    } else {
        playNum = 3;
        playAudio()
    }
}

function playNextF() {
    if (playNum + 1 >= playList.length) {
        playNum = 0;
        playAudio()
    } else {
        playNum++;
        playAudio()
    }
}

function progressSong() {
    progress.max = audio.duration;
    progress.value = audio.currentTime;
    progressTime.innerHTML = (formatTime(Math.floor(audio.currentTime)));
    if (progressLength.innerHTML === "NaN:NaN") {
        progressLength.innerHTML = "0:00";
    } else {
        progressLength.innerHTML = (formatTime(Math.floor(audio.duration)));
    }
}

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

setInterval(progressSong, 500);

function changeProgressBar() {
    audio.currentTime = progress.value;
};

progress.addEventListener('change', changeProgressBar);
audio.addEventListener('ended', playNextF);
play.addEventListener('click', playAudio);
playNext.addEventListener('click', playNextF);
playPrev.addEventListener('click', playPrevF);

// VOLUME

const volumeBar = document.querySelector('.volume-bar')

volume.addEventListener('click', () => {
    audio.muted = !audio.muted;
    if (audio.muted) {
        volume.classList.remove("volume-icon");
        volume.classList.add("muted");
      } else {
        volume.classList.add("volume-icon");
        volume.classList.remove("muted");
      }
})

volumeBar.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(volumeBar).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    document.querySelector('.volume-input').style.width = newVolume * 100 + '%';
}, false)

let isHovering = false

volume.addEventListener('mouseover', () =>  {
    if (!isHovering) {
        isHovering = true
        volumeBar.style.opacity = 1
    }
}, false)

volume.addEventListener('mouseout', () =>  {
    if (isHovering) {
        isHovering = false
        setTimeout(() => {
            volumeBar.style.opacity = 0
        }, 1000)
    }

}, false)

volumeBar.addEventListener('mouseover', () =>  {
    if (!isHovering) {
        isHovering = true
        volumeBar.style.opacity = 1
    }
}, false)

volumeBar.addEventListener('mouseout', () =>  {
    if (isHovering) {
        isHovering = false
        setTimeout(() => {
            volumeBar.style.opacity = 0
        }, 1000)
    }
}, false)
