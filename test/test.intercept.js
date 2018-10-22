import test from 'ava'
import dom from '../src/dom'
import JSXComponent from '../src/JSXComponent'
import Intercept from '../src/intercept'

test('Intercept#html', t => {
  const wrapper = new Intercept(<div />)

  t.is(wrapper.html(), '<div></div>')
})

test('Intercept#find', t => {
  const wrapper = new Intercept(
    (
      <div>
        <span>Foo</span>
      </div>
    ),
  )

  t.is(wrapper.find('span').html(), '<span>Foo</span>')
})

test('Intercept#hasClass', t => {
  const wrapper = new Intercept(
    (
      <div>
        <span className="foo">Foo</span>
      </div>
    ),
  )

  t.is(wrapper.hasClass('foo'), true)
  t.is(wrapper.hasClass('bar'), false)

  const wrapperSec = new Intercept(
    (
      <div>
        <span className="foo">Foo</span>
        <span className="bar baz" />
      </div>
    ),
  )

  t.is(wrapperSec.hasClass('bar', '.baz'), true)
})

test('Intercept#RAW', t => {
  const wrapper = new Intercept(
    (
      <div id="parent">
        <span className="foo">Foo</span>
      </div>
    ),
  )
  const $ = wrapper.RAW

  // definitelly cheerio test are done somewhereelse this is just to show an example with jsx-render
  t.true($('.foo').is('span'))
  t.false($('.foo').is('div'))
  t.is(
    $('.foo')
      .parent()
      .attr('id'),
    'parent',
  )
})

test('Intercept#childAt', t => {
  class Element extends JSXComponent {
    render() {
      return (
        <ul>
          <li>Foo</li>
          <li>Bar</li>
          <li>Baz</li>
        </ul>
      )
    }
  }

  const wrapper = new Intercept(<Element />)

  t.is(wrapper.childAt(1), '<li>Bar</li>')
})
