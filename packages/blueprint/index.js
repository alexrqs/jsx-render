import dom from 'jsx-render'
import Headline from './headline'

const items = [1,2,3,4]
function Main() {
  return (
    <div>
      <Headline />
      <p>Lorem ipsum</p>
      <ul>
        <li><a href="">anchor</a></li>
        <li>2</li>
        <li><a href="">anchor2</a> More</li>
      </ul>
      <ol>
        {items.map(item => <li>{item}</li>)}
      </ol>
    </div>
  )
}

const app = document.querySelector('.app')
app.appendChild(Main())
