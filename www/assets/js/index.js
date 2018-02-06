const screen = document.getElementById('screen')


// SUCCESS HANDLER
const success = stream => {
  screen.src = window.URL.createObjectURL(stream)
  screen.play()
}

// ERROR HANDLER
const error = err => {
  console.log('Failed to capture Screen', err)
}

// CAPTURE SCREEN
const captureScreen = constraint => {
  navigator.mediaDevices.getUserMedia(constraint)
    .then(success)
    .catch(error)
}

let constraint = { video: null }

// GET STREAM_ID FOR CHROME
const getStreamId = (extensionId, req) => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(extensionId, req, response => {
      if (response && response.type === 'success') {
        constraint.video = {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: response.streamId,
          }
        }
        resolve('Got streamId')
      } else {
        console.log('Could not get stream')
        reject('Could not get streamId')
      }
    })
  })
}

(async () => {
  if ('getUserMedia' in navigator.mediaDevices) {
    if (navigator.mediaDevices.getSupportedConstraints().mediaSource && typeof InstallTrigger !== 'undefined') { //CHECK IF SUPPORTS mediaSource AND IF IT IS from Firefox
      constraint.video = { mediaSource: 'screen' }
    } else if (window.chrome && window.chrome.webstore) { // CHECK IF IT IS FROM Chrome
      const EXTENSION_ID = 'meiohbiickddgmgomjpnpcjemkdgbkmg'
      const request = {
        sources: ['window' ,'screen', 'tab']
      }
      try {
        await getStreamId(EXTENSION_ID, request)
      } catch (err) {
        console.log(err)
      }
    }
    captureScreen(constraint)
  } else {
    alert('Media Devies is not supported')
  }
})()
