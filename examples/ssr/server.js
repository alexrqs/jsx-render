import express from 'express'
import Component from './component'
import render from '../../src/render'
import dom from '../../src/dom2'

const app = express()

app.use(express.static('examples/ssr/public'))

app.get('/', function root(req, res) {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Document</title>
    </head>
    <body>
      <h1>SSR</h1>
      <div class="app">${render(<Component />)}</div>
      <script src="/front.js"></script>
    </body>
    </html>
  `)
})

app.listen(3030, function cb() {
  console.log(3030)
})
