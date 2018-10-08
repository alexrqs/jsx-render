import test from 'ava'
import dom from '../src/dom'
import JSXComponent from '../src/JSXComponent.js'

// Metasyntactic variables used commonly across all
// programming languages include
// foobar, foo, bar, baz, qux, quux, quuz,
// corge, grault, garply, waldo, fred,
// plugh, xyzzy, and thud.
// Wibble, wobble, wubble, and flob are also used in the UK.
test('Basic extends JSXComponent <div />', t => {
  class Component extends JSXComponent {
    render(props) {
      return <div className="foo" qux={props.bar} quux={this.props.bar} />
    }
  }

  const externalProps = {
    bar: 'baz',
  }

  t.is(
    dom(Component, externalProps).outerHTML,
    '<div class="foo" qux="baz" quux="baz"></div>',
    'Single Component Extends Correctly',
  )
})

test('JSXComponent events', t => {
  let clickLog = false

  class Component extends JSXComponent {
    click() {
      clickLog = true
    }

    render(props) {
      return (
        <button id="clickable" ref={super.ref} onClick={this.click}>
          click me!
        </button>
      )
    }
  }

  document.body.appendChild(dom(Component))

  const HTMLEvents = document.createEvent('HTMLEvents')
  HTMLEvents.initEvent('click', false, true)
  document.querySelector('#clickable').dispatchEvent(HTMLEvents)

  t.true(clickLog, 'click events work Correctly')
})
