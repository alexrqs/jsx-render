import test from 'ava'
import dom from '../src/dom'
import Intercept from '../src/intercept'
import { withState } from '../src/reduxish'

test('boolean false attributes are not rendered', t => {
  const button = <button disabled={false}>go</button>

  t.false(button.hasAttribute('disabled'))
})

test('boolean true attributes render as empty attributes', t => {
  const button = <button disabled>go</button>

  t.true(button.hasAttribute('disabled'))
  t.is(button.getAttribute('disabled'), '')
})

test('null and undefined attributes are not rendered', t => {
  const div = <div title={null} lang={undefined} />

  t.false(div.hasAttribute('title'))
  t.false(div.hasAttribute('lang'))
})

test('onDoubleClick listens to the dblclick event', t => {
  let called = false
  const div = <div onDoubleClick={() => (called = true)} />

  div.dispatchEvent(new window.Event('dblclick'))
  t.true(called)
})

test('SVG shape tags are created in the SVG namespace', t => {
  const tags = [<circle r="5" />, <rect />, <line />, <text>hi</text>, <clipPath />]

  tags.forEach(node => {
    t.is(node.namespaceURI, 'http://www.w3.org/2000/svg')
  })
})

test('anchor stays an HTML element even though SVG has <a> too', t => {
  const anchor = <a href="#foo">foo</a>

  t.is(anchor.namespaceURI, 'http://www.w3.org/1999/xhtml')
})

test('Text nodes passed as children are appended', t => {
  const textNode = document.createTextNode('plain text')
  const div = <div>{textNode}</div>

  t.is(div.textContent, 'plain text')
})

test('Intercept#childAt returns the node text', t => {
  const node = <p>some text</p>
  const wrapper = new Intercept(node)

  t.is(wrapper.childAt(), 'some text')
})

test('withState re-renders when the store changes', t => {
  let state = 'first'
  const listeners = []
  const store = { subscribe: fn => listeners.push(fn) }

  const View = () => <div>{state}</div>
  const Connected = withState(View, store)
  const node = <Connected />
  document.body.appendChild(node)

  state = 'second'
  listeners.forEach(fn => fn())

  t.is(node.textContent, 'second')
})
