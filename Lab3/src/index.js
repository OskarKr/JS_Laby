let recording = false
let trackNumber = 1

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return null;
    key.classList.add("playing");
    audio.currentTime = 0;
    audio.play();
    setTimeout(function() {
      key.classList.remove("playing");
    }, 100);
  }

  window.addEventListener("keydown", playSound);

  let track1 = []
  let track2 = []
  let track3 = []
  let track4 = []

  function record(event) {
    if (!recording) {
      return;
    }
    const sound = {
      key: event.key,
      time: Date.now()
    };
    const trackName = eval('track'+trackNumber)
    trackName.push(sound);
    console.log(track1);
  }

  function setRecording(number) {
    recording = true
    if (number) {
      trackNumber = number
    }

  }

  window.addEventListener('keypress', record)

  function playBack(number){
    let pauseTime;
    const trackName = eval('track'+number);
    trackName.forEach(element => {
      if (element === trackName[0]) {
        pauseTime = element.time;
      }
      if(element.key) {
        setTimeout(() => {
          playSound(element.key)
        }, element.time - pauseTime)
      }
      console.log(pauseTime);
    });
  }