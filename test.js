const song = document.querySelector('#audio'); // audio object

let pPause = document.querySelector('#playAudio'); // element where play and pause image appears

songIndex = 0;
songs = [
    './music/hey.mp3',
    '.music/summer.mp3',
    '.music/ukulele.mp3',
    '.music/Running Waters.mp3',
    '.music/Night Owl.mp3'
    ]; // object storing paths for audio objects
songTitles = ["Hey", "Summer", "Ukulele", "Running Waters", "Night Owl"];

// function where pp (play-pause) element changes based on playing boolean value - if play button clicked, change pp.src to pause button and call song.play() and vice versa.
let playing = true;
function playPause() {
    if (playing) {
        const song = document.querySelector('#song'),
        thumbnail = document.querySelector('#thumbnail');

        pPause.src = "./assets/icons/pause.png"
        
        
        song.play();
        playing = false;
    } else {
        pPause.src = "./assets/icons/play.png"
        thumbnail.style.transform = "scale(1)"
        
        song.pause();
        playing = true;
    }
}

// function where songIndex is incremented, song/thumbnail image/background image/song artist/song title changes to next index value, and playPause() runs to play next track 
function nextSong() {
    songIndex++;
    if (songIndex > 1) {
        songIndex = 0;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}