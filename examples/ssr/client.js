import dom from '../../src/element'
import renderClient from '../../src/renderClient'
import App from './entry'

const Headline = () => (
  <div>
    <h2 className="css">
      <span>Text</span>
    </h2>
    <p>Lorem</p>
    <Logo color="green" />
    <Logo color="green" />
  </div>
)

const content = document.createElement('div')
content.className = 'app'
content.appendChild(renderClient(<App />))

document.body.appendChild(content)
