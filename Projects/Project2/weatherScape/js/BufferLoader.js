//BufferLoader reads the Audio data and loads the data into the buffer list array used in Audio.js to play the sounds
//constructor function that takes the audioContext as it's first arguement, an array of file names as the second and a callback as the third
//load sounds when the app starts
//used to create a new bufferloader object in weatherScape.js
class BufferLoader {
  constructor(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
  }

  loadBuffer(url, index) {
    // Load buffer asynchronously
    //using XMLHttpRequest to get the data from the file.- make object>set a callback (in the onload property)> and then call send() to kick off the request
    //
    let request = new XMLHttpRequest(); ///IS THIS NOT NEEED? ASK WHAT THIS IS EXACTLY?***
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    let loader = this;

    request.onload = function () {
      // Asynchronously decode the audio file data in request.response
      loader.context.decodeAudioData(
        //decodes the binary data in the file into a sound the audioContext can use.
        request.response,
        function (buffer) {
          if (!buffer) {
            alert("error decoding file data: " + url);
            return;
          }
          // console.log(buffer);
          //passing the index along with the sound file so that we can use this to organize the sound files in the correct order
          loader.bufferList[index] = buffer;
          //keeping track of how many sounds are loaded with loadCount.
          /// once this count is the same length of the original array of the sounds that we passed in, we know we've loaded all the sounds, and we can then call the callback function we stored in the onload property of the bufferloader object and passin the sully loaded array of sounds, Buffer List
          if (++loader.loadCount == loader.urlList.length)
            loader.onload(loader.bufferList); //called when finished laoding
        },
        function (error) {
          console.error("decodeAudioData error", error);
        }
      );
    };

    request.onerror = function () {
      alert("BufferLoader: XHR error");
    };

    request.send();
  }

  load() {
    for (let i = 0; i < this.urlList.length; ++i) {
      this.loadBuffer(this.urlList[i], i);
    }
    // console.log(this.bufferList);///for reference and debugging
  }
}
