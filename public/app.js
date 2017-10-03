document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('signin-button').addEventListener('click', function(event) {
    event.preventDefault()
    var appDomain = window.location.href
    var privateKey =  blockstack.generateAndStoreAppKey()
    var authRequest = blockstack.makeAuthRequest(privateKey, appDomain)
    blockstack.redirectToSignInWithAuthRequest(authRequest)
  })
 /* document.getElementById('signout-button').addEventListener('click', function(event) {
    event.preventDefault()
    blockstack.signUserOut(window.location.href)
  }) */

  function showProfile(profile) {
    var person = new blockstack.Person(profile)
    document.getElementById('heading-name').innerHTML = person.name()
    if(person.avatarUrl()) {
      document.getElementById('avatar-image').setAttribute('src', person.avatarUrl())
    }
    document.getElementById('section-1').style.display = 'none'
    document.getElementById('section-2').style.display = 'block'
  }

  if (blockstack.isUserSignedIn()) {
    blockstack.loadUserData(function(userData) {
      showProfile(userData.profile)
    })
  } else if (blockstack.isSignInPending()) {
    blockstack.handlePendingSignIn(function(userData) {
      window.location = window.location.origin
    })
  }
})

var blob = window.URL || window.webkitURL
//(blob) ? console.log(true) : console.log(false);
var fileArray = [];
var STORAGE_FILE = 'audio.json';

document.getElementById('file').addEventListener('change', function(event){

    let file = this.files[0],
     fileURL = window.URL.createObjectURL(file);
    let uidCount = 0;

    // Load audio into browser and output wavesurfer file.
    let wavesurfer = WaveSurfer.create({
      container: '#waveform',
      cursorColor: '#aaa',
      cursorWidth: 1,
      height: 80,
      waveColor: '#588efb',
      progressColor: '#f043a4'
    });

    wavesurfer.load(fileURL);
    fileArray.unshift({
      id: uidCount++,
      filename: file.name,
      filetype: file.type,
      fileblob: fileURL,
      soundfile: wavesurfer.load(fileURL)
    });

    //blockstack.putFile(STORAGE_FILE, JSON.stringify(fileArray));


    console.log('File name: '+file.name);
    console.log('File type: '+file.type);
    console.log('File BlobURL: '+fileURL);


    // Skip backward button event listener
    wavesurfer.on('ready', function (event) {
      document.getElementById('backward-button').addEventListener('click', function () {
        wavesurfer.skipBackward();
      });
    });

    // Pause button event listener
    wavesurfer.on('ready', function (event) {
      document.getElementById('pause-button').addEventListener('click', function () {
        wavesurfer.pause();
      });
    });

    // Play button event listener
    wavesurfer.on('ready', function (event) {
      document.getElementById('play-button').addEventListener('click', function () {
        wavesurfer.play();
      });
    });

    // Stop button event listener
    wavesurfer.on('ready', function (event) {
      document.getElementById('stop-button').addEventListener('click', function () {
        wavesurfer.stop();
      });
    });

    // Skip forward button event listener
    wavesurfer.on('ready', function (event) {
      document.getElementById('forward-button').addEventListener('click', function () {
        wavesurfer.skipForward();
      });
    });
});