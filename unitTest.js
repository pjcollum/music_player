//separated the two functions away from the main javascript file

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
  
    return isNaN(min) ? "00:00:00":hr + ':' + min + ':' + sec
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

module.exports = {      //multiple function export
    formatTime,
    songLibrary,
}