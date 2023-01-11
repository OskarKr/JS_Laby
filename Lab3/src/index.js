var organizer = function(event) {
  var keycode = event.keyCode;

  animation(keycode);
  playSound(keycode);

  if (keycode === 82 && isRecording === false) { // Wants to start recording
    recordingInitialisation();
  }

  else if (keycode === 82 && isRecording === true) { // Wants to stop recording
    stopRecording();
  }

  else if (keycode !== 82 && isRecording === true) { // Wants to record keys
    recording(keycode);
  }

  else if (keycode === 80 && isRecording === false) { // Wants to play
    playRecords();
  }

}


function animation(keycode) {
  var key = document.querySelector(`.key[data-key="${keycode}"]`) || document.querySelector(`.record-block[data-key="${keycode}"]`) || document.querySelector(`.play-block[data-key="${keycode}"]`);
  if (!key) return;

  if (keycode !== 82 && keycode !== 80) { // basics sample
    key.classList.add("playing");
    setTimeout(function() { key.classList.remove("playing"); }, 100);
  }
  else if (keycode === 82) { // recording
    (!isRecording) ? key.classList.add("recording") : key.classList.remove("recording");
  }
  else if (keycode === 80 && isPlaying === false) { // playing song
    key.classList.add("playing-song");
  }
}


function playSound(keycode) {
  var audio = document.querySelector(`audio[data-key="${keycode}"]`);
  if (!audio) return;
  audio.load();
  audio.play();
}


function recordingInitialisation() {
  isRecording = true;
  instruments.splice(0, instruments.length);
  timing.splice(0, timing.length);
}


function stopRecording() {
  isRecording = false;
  document.querySelector(`.play-block[data-key="80"]`).style.opacity = 1;
}


function recording(keycode) {
  instruments.push(keycode);
  timing.push(Date.now());
}


function playRecords() {
  if (isPlaying === false) {
    isPlaying = true;

    var now = Date.now();
    var timingDiff = [];
    timing.forEach( time => timingDiff.push(time - (timing[0] - 1)));

    for (let index = 0; index < instruments.length; index++) {
      setTimeout(() => {
        playSound(instruments[index]);
      }, timingDiff[index]);
    }

    setTimeout(() => {
      isPlaying = false;
      document.querySelector(`.play-block[data-key="80"]`).classList.remove("playing-song")
      }, timingDiff[timingDiff.length - 1]);
    }
  
}


var isPlaying = false;
var isRecording = false;
var instruments = [];
var timing = [];
window.addEventListener('keydown', organizer);