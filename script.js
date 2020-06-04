const audio = document.getElementById('player');

const playAudio = document.getElementById('playAudio');
const pauseAudio = document.getElementById('pauseAudio');
const prevSong = document.getElementById('prevSong');
const nextSong = document.getElementById('nextSong');

const progressBar = document.querySelector('#progress-bar'); // element where progress bar appears



//Songs Array
class Song {
    constructor(songName, songArtist) {
        this._songName = songName;
        this._songArtist = songArtist;
    }
    get songName() {
        return this._songName;
    }
    get songArtist() {
        return this._songArtist;
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

let playlistArray = []
let isPlayingFromPlaylist = false;

let currentSongIndex = 0;
let currentPlaylistSongIndex = 0;

//Create list of songs
const createSongList = () => {
    const list = document.createElement('ul');

    for(let i = 0; i < songLibrary.length; i++) {
        const item = document.createElement('li');
        const button = document.createElement('button');

        //add checkbox to each song name to add to playlist
        var x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
        x.setAttribute("value", i)
        x.setAttribute("name", "songName")

        button.onclick = () => {playSong(i, [...songLibrary])};
        button.innerHTML = songLibrary[i].songName;
        //item.appendChild(document.createTextNode(`${JSON.stringify(songLibrary[i].songName)} by ${JSON.stringify(songLibrary[i].songArtist)}`))
       
        item.appendChild(x)
        item.appendChild(button)
        list.appendChild(item)
    }
    return list;
}

document.getElementById('songList').appendChild(createSongList());

//Search Audio File
document.getElementById('searchBar').addEventListener('input' ,function(){
    //console.log(this.value.toLowerCase());        //print text input to console
    //console.log(songLibrary[this.value - 1].songName);

    let result = songLibrary.filter(s => s.songName.toLowerCase().includes(this.value.toLowerCase()));
    const list = document.createElement('ul');

    for(let i = 0; i < result.length; i++) {
        const item = document.createElement('li');   

        const button = document.createElement('button');
        button.onclick = () => {playSong(i, [...result])};
        button.innerHTML = result[i].songName;
       // item.appendChild(x)
        item.appendChild(button)
        list.appendChild(item)
    }
    
    document.getElementById('songList').innerHTML = "";         //clears list of songs
    document.getElementById('songList').appendChild(list);      //shows the matching song in a list, in place of all songs
})


//Create To Playlist
document.getElementById('addToPlaylist').addEventListener('click', function(){
    //playlistArray = []

    //prompt add playlist name 
    let promptName = prompt("Name your playlist:")   
    document.getElementById('playlist').style.visibility = "visible";
    //document.getElementById('playlistName').innerHTML = promptName;
    //show new playlist next to all songs...
    
    console.log(document.querySelectorAll('input:checked'));
    [...document.querySelectorAll('input:checked')].map(song => playlistArray.push(songLibrary[song.value]))
    
    console.log(`playlist array: ${JSON.stringify(playlistArray)}`);
    
    const list = document.createElement('ul');

    for(let i = 0; i < playlistArray.length; i++) {
        const item = document.createElement('li');
        const button = document.createElement('button');
 
        button.onclick = () => {playSong(i, [...playlistArray], true)};
        button.innerHTML = playlistArray[i].songName;  
       
        item.appendChild(button)
        list.appendChild(item)
    }
    //document.getElementById('songList').appendChild(createSongList());
    document.getElementById('playlist').innerHTML = "";
   

    const h3 = document.createElement("h3")
    h3.innerHTML = promptName;
    document.getElementById('playlist').appendChild(h3);
    document.getElementById('playlist').appendChild(list);
})

//Play song when clicked
function playSong(index, sourceArray,  flag){
//songList.addEventListener('click', function(e){
    //console.log(e);
   // const clickedItem = e.target
    isPlayingFromPlaylist = flag;

    const source = document.getElementById('source')
    const songName = sourceArray[index].songName;
    const songArtist = sourceArray[index].songArtist;
   // isPlayingFromPlaylist ? playlistArray[index].songName : songLibrary[index].songName;   //ternary operator

    //source.src = 'music/' + clickedItem.innerText + '.mp3';
    source.src = `music/${songName}.mp3`;
    //source.src = `music/${clickedItem}.mp3`;
    currentPlaylistSongIndex = index;
    currentSongIndex = index;
    console.log(songName)

    document.getElementById('currentlyPlayingSong').innerText = "Currently Playing:"
    document.getElementById('currentSong').innerText = `${songName} by ${songArtist}`;
    
    

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
    const arrayLength = isPlayingFromPlaylist ? playlistArray.length : songLibrary.length;
   console.log(playlistArray)
   console.log(songLibrary)

    if (isPlayingFromPlaylist){
        currentPlaylistSongIndex = currentPlaylistSongIndex +1
         if (currentPlaylistSongIndex > arrayLength -1){       //loops to first song in array
        currentPlaylistSongIndex = 0
         } 
    }else{
        currentSongIndex = currentSongIndex +1
        if (currentSongIndex > arrayLength -1){       //loops to first song in array
            currentSongIndex = 0
        }
    }
  
    const source = document.getElementById('source')
    const songName = isPlayingFromPlaylist ? playlistArray[currentPlaylistSongIndex].songName : songLibrary[currentSongIndex].songName;  
    source.src = `music/${songName}.mp3`;

    //console.log(` playlist array: ${playlistArray[currentPlaylistSongIndex].songName}`);
    //console.log(`song array:${songLibrary[currentSongIndex].songName}`);
    
    document.getElementById('currentlyPlayingSong').innerText = "Currently Playing:"
    document.getElementById('currentSong').innerText = songName;
    audio.load()
    audio.play()
}

//prev song
prevSong.onclick = () => {
    const arrayLength = isPlayingFromPlaylist ? playlistArray.length : songLibrary.length;
 
     if (isPlayingFromPlaylist){
         currentPlaylistSongIndex = currentPlaylistSongIndex -1
          if (currentPlaylistSongIndex < 0 ){       //loops to first song in array
         currentPlaylistSongIndex = arrayLength -1
          } 
     }else{
         currentSongIndex = currentSongIndex -1
         if (currentSongIndex <  0 ){       //loops to first song in array
            currentSongIndex = arrayLength -1
         }
     }
   
     const source = document.getElementById('source')
     const songName = isPlayingFromPlaylist ? playlistArray[currentPlaylistSongIndex].songName : songLibrary[currentSongIndex].songName;  
     source.src = `music/${songName}.mp3`;
     
     document.getElementById('currentlyPlayingSong').innerText = "Currently Playing:"
     document.getElementById('currentSong').innerText = songName;
     audio.load()
     audio.play()
}

//Shuffle songs
shuffleSong.onclick = () => {
    const arrayLength = isPlayingFromPlaylist ? playlistArray.length : songLibrary.length; 
    randomIndex = Math.floor(Math.random() * arrayLength)

    const source = document.getElementById('source')
    
    const songName = isPlayingFromPlaylist ? playlistArray[randomIndex].songName : songLibrary[randomIndex].songName; 
    source.src = `music/${songName}.mp3`;
    

    document.getElementById('currentlyPlayingSong').innerText = "Currently Playing:"
    document.getElementById('currentSong').innerText = songName;
    audio.load()
    audio.play()
}

// Volume
const volumeSlider = document.getElementById('volumeSlider');
volumeSlider.oninput = (e) => {
    audio.volume = e.target.value;
}


// update progressBar
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
  
 
    return isNaN(min)?"00:00":min + ':' + sec
  }

// update progress bar every 1/2 second
setInterval(updateProgressValue, 500);

function changeProgressBar() {
  audio.currentTime = progressBar.value;
};


// Idle after 30 seconds
var timeout;
function resetTimer(){
  clearTimeout(timeout);
  console.log("Clearing timer because of activity");
  timeout = setTimeout(function(){
    //document.body.style.backgroundColor = "grey";

    const songName = isPlayingFromPlaylist ? playlistArray[currentPlaylistSongIndex].songName : songLibrary[currentSongIndex].songName; 
    alert(`Idle Mode: You are currently listening to ${songName}`);
    
    //Trigger your popup after 30 seconds
  }, 30000);      
}

document.onmousemove = resetTimer;
document.onkeypress = resetTimer;



