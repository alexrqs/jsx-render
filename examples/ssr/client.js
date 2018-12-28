import dom from '../../src/element'
import renderClient from '../../src/renderClient'
import App from './entry'

const content = document.querySelector('.app') || document.createElement('div')
content.className = 'app'

document.body.appendChild(content)
try {
  content.replaceChild(renderClient(<App />), content.childNodes[0])
} catch (e) {
  content.appendChild(renderClient(<App />))
}

console.log('client render ok')
