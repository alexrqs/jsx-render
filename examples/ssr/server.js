import express from 'express'
import App from './entry'
import renderServer from '../../src/renderServer'
import dom from '../../src/element'

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
      <div class="app">${renderServer(<App />)}</div>
    </body>
    </html>
  `)
})

app.listen(3030, function cb() {
  console.log(3030)
})
