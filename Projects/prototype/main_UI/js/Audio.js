let Audio = {
  gainNode: undefined,
  bufferList: undefined,
  audioContext: new (window.AudioContext || window.webkitAudioContext)(), //object that knows how to decode binary audio data and make hr browser play a sound
  //init method initializes the audio objects
  //function takes the array 'bufferList' which is holding the sounds
  init: function (bufferList) {
    this.bufferList = bufferList; //array holding the sounds to play
    //audio routing create sound>generate sound
    this.gainNode = this.audioContext.createGain(); //volume
    this.gainNode.gain.value = 1;
    this.gainNode.connect(this.audioContext.destination);
  },
  //call play method to play the sound (done in the View object)
  //play method takes an index of one of the sounds in the bufferList and prepares that for playing by creating a buffer sounrce
  play: function (i) {
    let sound = this.audioContext.createBufferSource();
    sound.connect(this.gainNode);
    sound.buffer = this.bufferList[i];
    sound.start(0);
    sound.stop(this.audioContext.currentTime + 18);
  },
};
