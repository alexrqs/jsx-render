import synteticEvents from './synteticEvents'
import { isSVG, createFragmentFrom } from './utils'

/**
 * The tag name and create an html together with the attributes
 *
 * @param  {String} tagName name as string, e.g. 'div', 'span', 'svg'
 * @param  {Object} attrs html attributes e.g. data-, width, src
 * @param  {Array} children vnodes, strings, numbers or DOM nodes
 * @return {HTMLElement|SVGElement} html node with attrs
 */
function createElements(tagName, attrs, children) {
  const element = isSVG(tagName)
    ? document.createElementNS('http://www.w3.org/2000/svg', tagName)
    : document.createElement(tagName)

  // one or multiple will be evaluated to append as string or HTMLElement
  // eslint-disable-next-line no-use-before-define
  const fragment = createFragmentFrom(children, renderClient)
  element.appendChild(fragment)

  Object.keys(attrs || {}).forEach(prop => {
    if (prop === 'style') {
      // e.g. origin: <element style={{ prop: value }} />
      Object.assign(element.style, attrs[prop])
    } else if (prop === 'ref' && typeof attrs.ref === 'function') {
      attrs.ref(element, attrs)
    } else if (prop === 'className') {
      element.setAttribute('class', attrs[prop])
    } else if (prop === 'htmlFor') {
      element.setAttribute('for', attrs[prop])
    } else if (prop === 'xlinkHref') {
      element.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', attrs[prop])
    } else if (prop === 'dangerouslySetInnerHTML') {
      // eslint-disable-next-line no-underscore-dangle
      element.innerHTML = attrs[prop].__html
    } else if (synteticEvents.includes(prop)) {
      // the DOM event for onDoubleClick is 'dblclick', not 'doubleclick'
      const event = prop === 'onDoubleClick' ? 'dblclick' : prop.replace(/^on/, '').toLowerCase()
      element.addEventListener(event, attrs[prop])
    } else if (attrs[prop] === false || attrs[prop] === null || attrs[prop] === undefined) {
      // boolean-like falsy values must not become attributes:
      // <button disabled={false} /> with disabled="false" would still disable
    } else {
      // any other prop will be set as attribute; true renders as an empty
      // attribute, e.g. <button disabled={true} /> becomes <button disabled>
      element.setAttribute(prop, attrs[prop] === true ? '' : attrs[prop])
    }
  })

  return element
}

/**
 * The JSXTag will be unwrapped returning the html
 *
 * @param  {Function} JSXTag component function or class
 * @param  {Object} elementProps custom jsx attributes e.g. fn, strings
 * @param  {Array} children vnodes from inside the element
 *
 * @return {Node} the rendered DOM for the component result
 */
function composeToFunction(JSXTag, elementProps, children) {
  const props = { ...JSXTag.defaultProps, ...elementProps, children }
  const bridge = JSXTag.prototype && JSXTag.prototype.render ? new JSXTag(props).render : JSXTag
  const result = bridge(props)

  switch (result && result.element) {
    case 'FRAGMENT':
      // eslint-disable-next-line no-use-before-define
      return createFragmentFrom(result.children, renderClient)

    // Portals are useful to render modals
    // allow render on a different element than the parent of the chain
    // and leave a comment instead
    case 'PORTAL': {
      const target = JSXTag.target || document.body
      // eslint-disable-next-line no-use-before-define
      target.appendChild(createFragmentFrom(result.children, renderClient))
      return document.createComment('Portal Used')
    }
    default:
      // eslint-disable-next-line no-use-before-define
      return renderClient(result)
  }
}

/**
 * Render a vnode tree (from the `dom` pragma in element.js) into real DOM.
 *
 * @param {Object|String|Number|Node} vnode
 * @return {Node}
 */
function renderClient(vnode) {
  // pre-made DOM nodes pass through untouched
  if (vnode instanceof Node) {
    return vnode
  }

  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return document.createTextNode(vnode)
  }

  const { element, attrs, children } = vnode || {}

  // Custom Components will be functions
  if (typeof element === 'function') {
    // e.g. const CustomTag = ({ w }) => <span width={w} />
    // will be used
    // e.g. <CustomTag w={1} />
    // becomes: CustomTag({ w: 1})
    return composeToFunction(element, attrs, children)
  }

  // regular html components will be strings to create the elements
  // this is handled by the babel plugins
  if (typeof element === 'string') {
    return createElements(element, attrs, children)
  }

  return console.error(`jsx-render does not handle ${typeof element}`)
}

export default renderClient
