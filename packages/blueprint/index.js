import dom from 'jsx-render'
import Headline from './headline'
import Logo from './logo'
import Foo from './foo'

const items = [1,2,3,4]
function Main() {
  return (
    <div>
      <Headline width="100px" bg="green" />
      <p>Lorem ipsum</p>
      <Foo elem="Elementary" />
      <ul>
        <li><a href="">anchor</a></li>
        <li>2</li>
        <li><a href="">anchor2</a> More</li>
      </ul>
      <ol>
        {items.map(item => <li>{item}</li>)}
      </ol>
      <Logo />
    </div>
  )
}

const app = document.querySelector('.app')
app.appendChild(Main())
