//Setting up and storing audio samples in buffer.

let Audio = {
  gainNode: undefined,
  bufferList: undefined,
  audioContext: new (window.AudioContext || window.webkitAudioContext)(), //object that knows how to decode binary audio data and make browser play a sound
  //init method initializes the audio objects
  //function takes the array 'bufferList' which is holding the sounds
  init: function (bufferList) {
    this.bufferList = bufferList; //array holding the sounds to play
    //audio routing to create sound/generate sound
    this.gainNode = this.audioContext.createGain(); //volume/aplitude
    this.gainNode.gain.value = 1; //full digital amplitude
    this.gainNode.connect(this.audioContext.destination);
  },
  //call play method to play the sound
  //play method takes an index of one of the sounds in the bufferList and prepares that for playing by creating a buffer source
  play: function (i) {
    let sound = this.audioContext.createBufferSource(); //connect the source
    sound.connect(this.gainNode); ///source connected to gain
    sound.buffer = this.bufferList[i]; //fetching the sounds in the bufferList
    sound.start(0); ///start at first item
    sound.stop(this.audioContext.currentTime + 18); ///stop audio
  },
};
