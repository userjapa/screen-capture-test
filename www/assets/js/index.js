const screen = document.getElementById('screen')

const success = stream => {
  screen.src = window.URL.createObjectURL(stream)
  screen.play()
}

const error = err => {
  console.log('Failed to capture Screen', err)
}

const captureScreen = constraint => {
  navigator.mediaDevices.getUserMedia(constraint)
    .then(success)
    .catch(error)
}

let constraint = { video: null}

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
  if (navigator.mediaDevices.getSupportedConstraints().mediaSource) {
    if ('getUserMedia' in navigator.mediaDevices) {
      constraint.video = { mediaSource: 'window' }
    }
  } else {
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
})()
