import test from 'ava'
import dom from '../src/element'
import renderClient from '../src/renderClient'
import JSXComponent from '../src/JSXComponent'
import Intercept from '../src/intercept'

test('Intercept#html', t => {
  const wrapper = new Intercept(renderClient(<div />))

  t.is(wrapper.html(), '<div></div>')
})

test('Intercept#find', t => {
  const wrapper = new Intercept(
    renderClient(
      <div>
        <span>Foo</span>
      </div>,
    ),
  )

  t.is(wrapper.find('span').html(), '<span>Foo</span>')
})

test('Intercept#hasClass', t => {
  const wrapper = new Intercept(
    renderClient(
      <div>
        <span className="foo">Foo</span>
      </div>,
    ),
  )

  t.is(wrapper.hasClass('foo'), true)
  t.is(wrapper.hasClass('bar'), false)

  const wrapperSec = new Intercept(
    renderClient(
      <div>
        <span className="foo">Foo</span>
        <span className="bar baz" />
      </div>,
    ),
  )

  t.is(wrapperSec.hasClass('bar', '.baz'), true)
})

test('Intercept#RAW', t => {
  const wrapper = new Intercept(
    renderClient(
      <div id="parent">
        <span className="foo">Foo</span>
      </div>,
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
