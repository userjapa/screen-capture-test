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

if (navigator.mediaDevices.getSupportedConstraints().mediaSource) {
  console.log('For Firefox')
  if ('getUserMedia' in navigator.mediaDevices) {
    captureScreen({
      video: {
        mediaSource: 'screen'
      }
    })
  }
} else {
  console.log('For Chrome')
  const EXTENSION_ID = 'meiohbiickddgmgomjpnpcjemkdgbkmg'
  const request = {
    sources: ['window' ,'screen', 'tab']
  }

  chrome.runtime.sendMessage(EXTENSION_ID, request, response => {
    if (response && response.type === 'success') {
      captureScreen({
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: response.streamId,
          }
        }
      })
    } else {
      console.log('Could not get stream')
    }
  })
}
