import dom from '../../src/element'
import renderClient from '../../src/renderClient'

const Headline = () => (
  <div>
    <h2 className="css">
      <span>Text</span>
    </h2>
    <p>Lorem</p>
  </div>
)

const app = document.createElement('div')
app.className = 'app'
app.appendChild(renderClient(<Headline />))

document.body.appendChild(app)
