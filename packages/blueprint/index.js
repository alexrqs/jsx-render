import dom from 'jsx-render'
import Headline from './headline'

function Main() {
  return (
    <div>
      <Headline />
      <p>Lorem ipsum</p>
    </div>
  )
}

const app = document.querySelector('.app')
app.appendChild(Main())
