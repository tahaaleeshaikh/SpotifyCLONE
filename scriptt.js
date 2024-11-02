console.log("Welcome to Spotify");
let songindex = 0;
let audioelement = new Audio('1.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let mastersongName = document.getElementById('mastersongName');
let songitems = Array.from(document.getElementsByClassName('songItem'));
let currentTimeDisplay = document.getElementById('currentTime');
let durationTimeDisplay = document.getElementById('durationTime');

let songs = [
    { songName:"Phele-bh-main[Animal]", filePath: "1.mp3", coverPath: "20.jpg" },
    { songName:"Love me Like You do[justin-bieber(Mashup)]", filePath: "2.mp3", coverPath: "7.jpeg" },
    { songName:"yaar-to-Yaar-Hota hai[sehar-GuL]", filePath: "3.mp3", coverPath: "1.jpeg" },
    { songName:"O-Sajni-re[Arijit-Singh(Mashup)]", filePath: "4.mp3", coverPath: "3.jpg" },
    { songName:"O-Maahi[Arijit-Singh]", filePath: "5.mp3", coverPath: "2.jpg" },
    { songName:"Jany-is-dil[Hadika-kiani]", filePath: "6.mp3", coverPath: "5.jpg" },
    { songName:"Saaware[Arijit-Singh]", filePath: "7.mp3", coverPath: "4.jpeg" },
];

songitems.forEach((element, i) => {
    document.getElementsByClassName("songItem")[i].getElementsByTagName('img')[0].src = songs[i].coverPath;
    document.getElementsByClassName("songItem")[i].getElementsByClassName('songName')[0].innerText = songs[i].songName;
});
masterplay.addEventListener('click', () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioelement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioelement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
    myprogressbar.value = progress;
    currentTimeDisplay.innerText = formatTime(audioelement.currentTime);
    durationTimeDisplay.innerText = formatTime(audioelement.duration);
});

myprogressbar.addEventListener('change', () => {
    audioelement.currentTime = myprogressbar.value * audioelement.duration / 100;
});

const makeallplays = () => {
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let songIndex = parseInt(e.target.id);
        if (songindex === songIndex && !audioelement.paused) {
            audioelement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterplay.classList.remove('fa-pause-circle');
            masterplay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            makeallplays();
            songindex = songIndex;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            mastersongName.innerText = songs[songindex].songName;
            audioelement.src = songs[songindex].filePath;
            audioelement.currentTime = 0;
            audioelement.play();
            masterplay.classList.remove('fa-play-circle');
            masterplay.classList.add('fa-pause-circle');
        }
    });
});
document.getElementById('next').addEventListener('click', () => {
    if (songindex >= songs.length - 1) {
        songindex = 0;
    } else {
        songindex += 1;
    }
    mastersongName.innerText = songs[songindex].songName;
    audioelement.src = songs[songindex].filePath;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 0) {
        songindex=songs.length - 1;
    } else {
        songindex -= 1;
    }
    mastersongName.innerText = songs[songindex].songName;
    audioelement.src = songs[songindex].filePath;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
});
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) {
        sec = '0' + sec;
    }
    return `${min}:${sec}`;
}
