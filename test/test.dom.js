import test from 'ava'
import dom, { Fragment, portalCreator } from '../src/dom'

test('Basic Single Component <div />', t => {
  function render() { return <div /> }

  t.is(render().outerHTML, '<div></div>',
    'Single Element Renders Correctly')
})

test('Conditional Component', t => {
  function render() { return (<div>{true && 2}</div>) }
  function notRender() { return (<div>{false && 2}</div>) }

  t.is(render().outerHTML, '<div>2</div>',
    'Conditional Renders Correctly')

  t.is(notRender().outerHTML, '<div></div>',
    'Conditional "NotRenders" Correctly')
})

test('Component with Data Attributes', t => {
  function renderDataAttrs() { return <div data-merci="merci beaucoup"/> }

  t.is(renderDataAttrs().outerHTML, '<div data-merci="merci beaucoup"></div>',
    'Data Attributes Renders Correctly')
})

test('Component with Attributes', t => {
  function renderAttrs() { return <img src="img_.jpg" width="500" height="600" /> }

  t.is(renderAttrs().outerHTML, '<img src="img_.jpg" width="500" height="600">',
    'Attrs Renders Correctly')
})

test('Nested Component ul>li>a', t => {
  function render() {
    return (
      <ul> <li> <a href="http://URL.com">URL</a> </li> </ul>
    )
  }

  t.is(render().outerHTML, '<ul> <li> <a href="http://URL.com">URL</a> </li> </ul>',
    'Nested Components Correctly')
})

test('Siblings Components ul>li*3', t => {
  function render() {
    return (
      <ul>
        <li>one</li>
        <li>two</li>
        <li>nine</li>
      </ul>
    )
  }

  t.is(render().outerHTML, '<ul><li>one</li><li>two</li><li>nine</li></ul>',
    'Siblings Components Renders Correctly')
})

test('Components with classname p.chan', t => {
  function render() {
    return ( <p className="chan">Lorem</p> )
  }

  t.is(render().outerHTML, '<p class="chan">Lorem</p>',
    'Components with classname Renders Correctly')
})

test('Map components & numbers', t => {
  function render() {
    const arr = [1,2,3]
    return ( <div>{arr.map(item => <p>{item}</p>)}</div> )
  }

  t.is(render().outerHTML, '<div><p>1</p><p>2</p><p>3</p></div>',
    'Map components Renders Correctly')
})

test('Fragments', t => {
  function render() {
    return (
      <Fragment>
        <li>uno</li>
        <li>uno</li>
      </Fragment>
    )
  }

  const base = document.createElement('ul')
  base.appendChild(render())

  t.is(base.innerHTML, '<li>uno</li><li>uno</li>',
    'Fragments Renders Correctly')

  function renderInContext() {
    return (
      <ul>
        <Fragment>
          <li>uno</li>
          <li>uno</li>
        </Fragment>
      </ul>
    )
  }

  const base2 = document.createElement('div')
  base2.appendChild(renderInContext())

  t.is(base2.innerHTML, '<ul><li>uno</li><li>uno</li></ul>',
    'Fragments Renders Correctly in context')
})

test('Portals', t => {
  function render(node) {
    const Portal = portalCreator(node)

    return (
      <ul>
        <Portal>
          <li>uno</li>
          <li>uno</li>
        </Portal>
      </ul>
    )
  }

  const base = document.createElement('h2')
  render(base)

  t.is(base.innerHTML, '<li>uno</li><li>uno</li>',
    'Portals Renders Outside Correctly')

  t.is(render().outerHTML, '<ul><!--Portal Used--></ul>',
    'Portals renders inside another element')

  t.is(document.body.outerHTML, '<body><li>uno</li><li>uno</li></body>',
    'Portals renders inside the Body tag by default')
})

test('SVG', t => {
  function render() {
    return (
      <svg
        id="Layer_1"
        data-name="Layer 1"
        style={{ 'min-width': '110px', height: '40px', width: '140px' }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 141 41"
      >
        <title>Logo Title Tag</title>
        <g>
          <path
            d="M241.74,421.43v-41h28.61v41H241.74Zm24.47-4.13V384.56H245.86V417.3h20.35Z"
            transform="translate(-241.74 -380.43)"
            style={{ fill: '#ffcd05' }}
          />
        </g>
      </svg>
    )
  }

  t.is(render().outerHTML, '<svg id="Layer_1" data-name="Layer 1" style="min-width: 110px; height: 40px; width: 140px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 141 41"><title>Logo Title Tag</title><g><path d="M241.74,421.43v-41h28.61v41H241.74Zm24.47-4.13V384.56H245.86V417.3h20.35Z" transform="translate(-241.74 -380.43)" style="fill: #ffcd05;"></path></g></svg>',
    'SVG Renders Correctly')
})

test('Component Props', t => {
  function Comp(props) {
    return <span>{props.num}</span>
  }
  function render () {
    return <div><Comp num={2}/></div>
  }

  t.is(render().outerHTML, '<div><span>2</span></div>',
    'Props Renders Correctly')
})

test('Component has defaultProps', t => {
  function Comp(props) {
    return <span>{props.num}</span>
  }

  Comp.defaultProps = {
    num: 2,
  }

  function render () {
    return <div><Comp /></div>
  }

  t.is(render().outerHTML, '<div><span>2</span></div>',
    'Props Renders Correctly')
})

test('Component Children', t => {
  function Comp(props) {
    return <span>{props.children}</span>
  }
  function render () {
    return <div><Comp><a href="http://url.io">io</a></Comp></div>
  }

  t.is(render().outerHTML, '<div><span><a href="http://url.io">io</a></span></div>',
    'Props Renders Correctly')
})

test('Component render xlinkHref for SVG sprites', t => {
  function renderDataAttrs() {
    return (
      <svg>
        <use xlinkHref="#star-open" />
      </svg>
    )
  }

  t.is(renderDataAttrs().outerHTML, '<svg><use xlink:href="#star-open"></use></svg>',
    'SVG sprites Renders Correctly')
})

test('Component render dangerouslySetInnerHTML', t => {
  function render() {
    return (
      <div dangerouslySetInnerHTML={{__html: '<span>StrangerDanger</span>'}} />
    )
  }

  t.is(render().outerHTML, '<div><span>StrangerDanger</span></div>',
    'dangerouslySetInnerHTML Renders Correctly')
})


test('Class Component render', t => {
  class Icon {
    constructor(props) {
      this.props = props
      this.render = this.render.bind(this)
    }

    render(props) {
      return (
        <img src="http://lorempixum.com/" width={props.width} height={this.props.height} />
      )
    }
  }

  function render() {
    return (
      <Icon width="10px" height="20px" />
    )
  }

  t.is(render().outerHTML, '<img src="http://lorempixum.com/" width="10px" height="20px">',
    'dangerouslySetInnerHTML Renders Correctly')
})


test('Class Complex Component render', t => {
  class Bar {
    render(props) {
      return (
        <span>
          {props.children}
        </span>
      )
    }
  }

  class Foo {
    constructor(props) {
      this.props = props
      this.render = this.render.bind(this)
    }

    render(props) {
      return (
        <Bar>
          <img src="http://lorempixum.com/" width={props.width} height={this.props.height} />
        </Bar>
      )
    }
  }

  function render() {
    return (
      <Foo width="10px" height="20px" />
    )
  }

  t.is(render().outerHTML, '<span><img src="http://lorempixum.com/" width="10px" height="20px"></span>',
    'dangerouslySetInnerHTML Renders Correctly')
})
