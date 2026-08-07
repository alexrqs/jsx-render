import test from 'ava'
import dom, { Fragment, portalCreator, renderClient, renderServer } from '../src/index'

test('renders a basic element', t => {
  t.is(renderServer(<div />), '<div></div>')
})

test('renders attributes and void elements like the DOM serializer', t => {
  t.is(
    renderServer(<img src="img_.jpg" width="500" height="600" />),
    '<img src="img_.jpg" width="500" height="600">',
  )
})

test('renders className and htmlFor as class and for', t => {
  t.is(renderServer(<p className="chan">Lorem</p>), '<p class="chan">Lorem</p>')
  t.is(renderServer(<label htmlFor="merci" />), '<label for="merci"></label>')
})

test('boolean attribute semantics match the client', t => {
  t.is(renderServer(<button disabled>go</button>), '<button disabled="">go</button>')
  t.is(renderServer(<button disabled={false}>go</button>), '<button>go</button>')
  t.is(renderServer(<div title={null} lang={undefined} />), '<div></div>')
})

test('style objects become style strings, camelCase converted', t => {
  t.is(
    renderServer(<div style={{ minWidth: '110px', color: 'red' }} />),
    '<div style="min-width: 110px; color: red;"></div>',
  )
})

test('escapes text children', t => {
  const evil = '<script>alert("pwned")</script> & more'

  t.is(
    renderServer(<div>{evil}</div>),
    '<div>&lt;script&gt;alert("pwned")&lt;/script&gt; &amp; more</div>',
  )
})

test('escapes attribute values', t => {
  const evil = '"><script>alert(1)</script>'

  t.is(renderServer(<div title={evil} />), '<div title="&quot;><script>alert(1)</script>"></div>')
})

test('dangerouslySetInnerHTML is the only raw HTML path', t => {
  t.is(
    renderServer(<div dangerouslySetInnerHTML={{ __html: '<span>StrangerDanger</span>' }} />),
    '<div><span>StrangerDanger</span></div>',
  )
})

test('skips refs and event listeners', t => {
  t.is(renderServer(<div onClick={() => {}} ref={() => {}} />), '<div></div>')
})

test('renders numbers, maps and nested arrays', t => {
  const arr = [1, 2, 3]

  t.is(
    renderServer(
      <div>
        {arr.map(item => (
          <p>{item}</p>
        ))}
      </div>,
    ),
    '<div><p>1</p><p>2</p><p>3</p></div>',
  )
})

test('skips conditional false and null children', t => {
  t.is(renderServer(<div>{false && 2}</div>), '<div></div>')
  t.is(renderServer(<div>{null}</div>), '<div></div>')
})

test('renders function components with props, children and defaultProps', t => {
  function Comp(props) {
    return <span>{props.children.length ? props.children : props.num}</span>
  }
  Comp.defaultProps = { num: 2 }

  t.is(renderServer(<Comp />), '<span>2</span>')
  t.is(
    renderServer(
      <Comp>
        <a href="http://url.io">io</a>
      </Comp>,
    ),
    '<span><a href="http://url.io">io</a></span>',
  )
})

test('renders class components', t => {
  class Icon {
    constructor(props) {
      this.props = props
      this.render = this.render.bind(this)
    }

    render(props) {
      return <img src="http://lorempixum.com/" width={props.width} height={this.props.height} />
    }
  }

  t.is(
    renderServer(<Icon width="10px" height="20px" />),
    '<img src="http://lorempixum.com/" width="10px" height="20px">',
  )
})

test('renders fragments as bare siblings', t => {
  t.is(
    renderServer(
      <ul>
        <Fragment>
          <li>uno</li>
          <li>dos</li>
        </Fragment>
      </ul>,
    ),
    '<ul><li>uno</li><li>dos</li></ul>',
  )
})

test('renders portals as the same placeholder comment the client leaves', t => {
  const Portal = portalCreator()

  t.is(
    renderServer(
      <ul>
        <Portal>
          <li>uno</li>
        </Portal>
      </ul>,
    ),
    '<ul><!--Portal Used--></ul>',
  )
})

test('server output matches client outerHTML for a complex tree', t => {
  function Item(props) {
    return <li className="item">{props.children}</li>
  }

  const tree = (
    <section id="app" style={{ color: 'red' }}>
      <h1>Title &amp; more</h1>
      <ul>
        {[1, 2].map(n => (
          <Item>entry {n}</Item>
        ))}
      </ul>
      <input type="checkbox" checked disabled={false} />
      <label htmlFor="x" className="lbl">
        ok
      </label>
    </section>
  )

  t.is(renderServer(tree), renderClient(tree).outerHTML)
})
