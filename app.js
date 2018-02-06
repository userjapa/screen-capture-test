const http = require('http')
const fs = require('fs')

const getHTML = res => {
  fs.readFile('./www/index.html', (err, html) => {
    if (err) {
      res.writeHead(404)
      res.write('Failed to GET index.html')
      console.log('Failed to read index.html', err)
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write(html)
    }
    res.end()
  })
}

const getCSS = res => {
  fs.readFile('./www/assets/css/style.css', (err, css) => {
    if (err) {
      res.writeHead(404)
      res.write('Failed to GET style.css')
      console.log('Failed to read style.css', err)
    } else {
      res.writeHead(200, {'Content-Type': 'text/css'})
      res.write(css)
    }
    res.end()
  })
}

const getJS = res => {
  fs.readFile('./www/assets/js/index.js', (err, js) => {
    if (err) {
      res.writeHead(404)
      res.write('Failed to GET index.js')
      console.log('Failed to read index.js', err)
    } else {
      res.writeHead(200, {'Content-Type': 'text/javascript'})
      res.write(js)
    }
    res.end()
  })
}

const server = http.createServer((req, res) => {
  const url = req.url
  if (url === '/static/css/style.css') {
    getCSS(res)
  } else if (url === '/static/js/index.js') {
    getJS(res)
  } else {
    getHTML(res)
  }
})

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request/r/n/r/n')
})

server.on('listening', () => {
  console.log('Listening at port 8080')
})



server.listen(8080)
