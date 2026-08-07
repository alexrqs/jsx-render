import synteticEvents from './synteticEvents'
import { escapeAttribute, escapeText, isVNode, objectToStyleString } from './utils'

// HTML void elements: serialized without a closing tag, matching how the DOM
// serializes outerHTML so server output is byte-for-byte hydratable
const VOID_TAGS = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]

const ATTR_ALIASES = {
  className: 'class',
  htmlFor: 'for',
  xlinkHref: 'xlink:href',
}

function parseAttrs(attrs) {
  return Object.keys(attrs || {})
    .map(prop => {
      const value = attrs[prop]

      // refs and event listeners have no meaning in an HTML string
      if (prop === 'ref' || prop === 'dangerouslySetInnerHTML' || synteticEvents.includes(prop)) {
        return false
      }

      // same boolean semantics as renderClient
      if (value === false || value === null || value === undefined) {
        return false
      }

      const name = ATTR_ALIASES[prop] || prop

      if (value === true) {
        return `${name}=""`
      }

      if (prop === 'style' && typeof value === 'object') {
        return `style="${escapeAttribute(objectToStyleString(value))}"`
      }

      return `${name}="${escapeAttribute(value)}"`
    })
    .filter(Boolean)
    .map(attr => ` ${attr}`)
    .join('')
}

function parseTag(tagName, attrs, children) {
  const attributes = parseAttrs(attrs)

  if (VOID_TAGS.includes(tagName)) {
    return `<${tagName}${attributes}>`
  }

  // dangerouslySetInnerHTML is the explicit unescaped escape hatch,
  // exactly like on the client; it replaces children
  if (attrs && attrs.dangerouslySetInnerHTML) {
    // eslint-disable-next-line no-underscore-dangle
    return `<${tagName}${attributes}>${attrs.dangerouslySetInnerHTML.__html}</${tagName}>`
  }

  // eslint-disable-next-line no-use-before-define
  return `<${tagName}${attributes}>${renderServer(children)}</${tagName}>`
}

function composeToFunction(JSXTag, elementProps, children) {
  const props = { ...JSXTag.defaultProps, ...elementProps, children }
  const bridge = JSXTag.prototype && JSXTag.prototype.render ? new JSXTag(props).render : JSXTag
  const result = bridge(props)

  switch (result && result.element) {
    case 'FRAGMENT':
      // eslint-disable-next-line no-use-before-define
      return renderServer(result.children)

    // a portal target does not exist in a string; leave the same
    // placeholder the client leaves so markup stays hydratable
    case 'PORTAL':
      return '<!--Portal Used-->'
    default:
      // eslint-disable-next-line no-use-before-define
      return renderServer(result)
  }
}

/**
 * Render a vnode tree (from the `dom` pragma in element.js) to an HTML string.
 * All text and attribute values are escaped; dangerouslySetInnerHTML is the
 * only way to emit raw HTML.
 *
 * @param {Object|Array|String|Number} vnode
 * @return {String}
 */
function renderServer(vnode) {
  if (vnode === false || vnode === null || vnode === undefined) {
    return ''
  }

  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return escapeText(vnode)
  }

  if (vnode instanceof Array) {
    return vnode.map(renderServer).join('')
  }

  if (isVNode(vnode)) {
    const { element, attrs, children } = vnode

    if (typeof element === 'function') {
      return composeToFunction(element, attrs, children)
    }

    if (typeof element === 'string') {
      return parseTag(element, attrs, children)
    }
  }

  return ''
}

export default renderServer
