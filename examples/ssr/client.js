import dom from '../../src/element'
import renderClient from '../../src/renderClient'
import App from './entry'

const content = document.querySelector('.app') || document.createElement('div')

if (content) {
  content.replaceChild(renderClient(<App />), content.firstElementChild)
} else {
  content.className = 'app'
  document.body.appendChild(content)
  content.appendChild(renderClient(<App />))
}

console.log('client render ok')
