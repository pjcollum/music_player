const audio = document.getElementById('player');

const playAudio = document.getElementById('playAudio');
const pauseAudio = document.getElementById('pauseAudio');
const prevSong = document.getElementById('prevSong');
const nextSong = document.getElementById('nextSong');
const progressBar = document.querySelector('#progress-bar'); // element where progress bar appears

//Songs Array
// const songs = [
//     "Hey",
//     "Summer",
//     "Ukulele",
//     "Running Waters",
//     "Night Owl"
// ]

////Test Code
class Song {
    constructor(songName, songArtist) {
    }
}
let songLibrary = [
    Hey = new Song('Hey', 'Hey'),
    Summer = new Song("Summer", "Summer"),
    Ukulele = new Song("Ukulele", "Ukulele"),
    RunningWaters = new Song("Running Waters", "Jason Shaw"),
    NightOwl = new Song("Night Owl", "Broke For Free"),
    Starling = new Song("Starling", "Podington Bear"),
    Hachiko = new Song("Hachiko", "The Kyoto Connection"),
    FaterLee = new Song("Fater Lee", "Black Ant")
]

//////////////////
let currentSongIndex = 0;
//loadSong(songLibrary[songIndex]);



function playSong(){
            
    audio.src = Song[songIndex];  //set the source of 0th song 
    
    //songTitle.textContent = songs[currentSong]; // set the title of song
    
    audio.play();    // play the song
}

// function loadSong(song) {
//         source.src = `music/${songLibrary.songName}.mp3`;;
// }


//Create list of songs
const createSongList = () => {
    const list = document.createElement('ol');

    for(let i = 0; i < songLibrary.length; i++) {
        const item = document.createElement('li');
        const button = document.createElement('button');
        button.onclick = () => {playSong(i)};
        button.innerHTML = songLibrary[i].songName;
        //item.appendChild(document.createTextNode(`${JSON.stringify(songLibrary[i].songName)} by ${JSON.stringify(songLibrary[i].songArtist)}`))
        item.appendChild(button)
        list.appendChild(item)
    }
    return list;
}
document.getElementById('songList').appendChild(createSongList());


//Play song when clicked
function playSong(index){
//songList.addEventListener('click', function(e){
    //console.log(e);
   // const clickedItem = e.target
    const source = document.getElementById('source')
    const songName = songLibrary[index].songName;
    //source.src = 'music/' + clickedItem.innerText + '.mp3';
    source.src = `music/${songName}.mp3`;
    //source.src = `music/${clickedItem}.mp3`;
    currentSongIndex = index;
    console.log(songName)

    document.getElementById('currentlyPlayingSong').innerText = "Currently Playing:"
    document.getElementById('currentSong').innerText = songName;
    
    audio.load()
    audio.play()
}

//Play and Pause using icons    //put in a toggle with the icon
playAudio.onclick = () => {
    console.log(audio.currentSrc);
    
   if( audio.currentSrc  == undefined || audio.currentSrc  == null || audio.currentSrc  == "") {
    const source = document.getElementById('source')
    source.src = `music/${songLibrary[0].songName}.mp3`;
    document.getElementById('currentlyPlayingSong').innerText = "Currently Playing:"
    document.getElementById('currentSong').innerText = songLibrary[0].songName;
    audio.load()
   } 
  //  source.src = `music/${clickedItem}.mp3`;
     audio.play()
}

pauseAudio.onclick = () => {
    audio.pause();
}

// //Next Song
nextSong.onclick = () => {
    currentSongIndex = currentSongIndex +1

    if (currentSongIndex > songLibrary.length -1){       //loops to first song in array
        currentSongIndex = 0
    }
    const source = document.getElementById('source')
    source.src = `music/${songLibrary[currentSongIndex].songName}.mp3`;

    document.getElementById('currentlyPlayingSong').innerText = "Currently Playing:"
    document.getElementById('currentSong').innerText = songLibrary[currentSongIndex].songName;
    audio.load()
    audio.play()
}

//prev song
prevSong.onclick = () => {
    currentSongIndex = currentSongIndex -1

    if (currentSongIndex < 0){                  //loops to last song in array
        currentSongIndex = songLibrary.length - 1;
    }
    const source = document.getElementById('source')
    source.src = `music/${songLibrary[currentSongIndex].songName}.mp3`;

    document.getElementById('currentlyPlayingSong').innerText = "Currently Playing:"
    document.getElementById('currentSong').innerText = songLibrary[currentSongIndex].songName;
    audio.load()
    audio.play()
}

//Shuffle songs
shuffleSong.onclick = () => {
    randomIndex = Math.floor(Math.random() * songLibrary.length)

    const source = document.getElementById('source')
    source.src = `music/${songLibrary[randomIndex].songName}.mp3`;

    document.getElementById('currentlyPlayingSong').innerText = "Currently Playing:"
    document.getElementById('currentSong').innerText = songLibrary[randomIndex].songName;
    audio.load()
    audio.play()
}

// Volume
const volumeSlider = document.getElementById('volumeSlider');
volumeSlider.oninput = (e) => {
    audio.volume = e.target.value;
}


// update progressBar.max to song object's duration, same for progressBar.value, update currentTime/duration on the DOM
function updateProgressValue() {
    progressBar.max = audio.duration;
    progressBar.value = audio.currentTime;
    document.querySelector('.currentTime').innerHTML =  
    formatTime(audio.currentTime);
    document.querySelector('.durationTime').innerHTML =  
    formatTime(audio.duration); 
  };


// Time Format
function formatTime(secs) {
    var hr  = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
  
    if (min < 10){ 
      min = "0" + min; 
    }
    if (sec < 10){ 
      sec  = "0" + sec;
    }
  
    return min + ':' + sec;
  }

// run updateProgressValue function every 1/2 second to show change in progressBar and song.currentTime on the DOM
setInterval(updateProgressValue, 500);

function changeProgressBar() {
  audio.currentTime = progressBar.value;
};



