import { isSVG, objectToStyleString, createFragmentFrom } from './utils'
import HTML_TAGS from './HTML_TAGS.json'
import GLOBAL_ATTRIBUTES from './GLOBAL_ATTRIBUTES.json'
import EVENT_HANDLERS from './EVENT_HANDLERS.json'


function dom(tagName, attrs, ...children) {
  // Custom Components will be functions
  if (typeof tagName === 'function') {
    tagName.defaultProps = tagName.defaultProps || {}
    const result = tagName(Object.assign({}, tagName.defaultProps, attrs, { children }))

    switch (result) {
      case 'FRAGMENT':
        return createFragmentFrom(children)

      // Portals are useful to render modals
      // allow render on a different element than the parent of the chain
      // and leave a comment instead
      case 'PORTAL':
        tagName.target.appendChild(createFragmentFrom(children))
        return document.createComment("Portal Used")
      default:
        return result
    }
  }

  // regular html components will be strings to create the elements
  // this is handled by the babel plugins
  if (typeof tagName === 'string') {
    const tag = HTML_TAGS[tagName] || tagName
    const object = typeof tag === 'object'
    const localAttrs = object ? tag.attributes || {} : {}
    const props = Object.assign({}, GLOBAL_ATTRIBUTES, localAttrs)
    const tagType = object ? tag.name : tag
    const element = isSVG(tagName)
      ? document.createElementNS('http://www.w3.org/2000/svg', tagName)
      : document.createElement(tagType)

    // one or multiple will be evaluated to append as string or HTMLElement
    const fragment = createFragmentFrom(children)
    element.appendChild(fragment)


    for (const attr in attrs) {
      if (attr === 'style') {
        element.style.cssText = objectToStyleString(attrs[attr])
      } else if ( attr === 'ref' && typeof attrs.ref === 'function') {
        attrs.ref(element)
      } else if (attr in EVENT_HANDLERS) {
        element.addEventListener(EVENT_HANDLERS[attr], attrs[attr])
      } else if (attr === 'xlinkHref') {
        element.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', attrs[attr])
      } else if (attrs.hasOwnProperty(attr)) {
        const propName = props[attr] || attr;
        element.setAttribute(propName, attrs[attr])
      }
    }

    return element
  }

  throw new Error(`jsx-render does not handle ${typeof tagName}`)
}

export default dom
export const Fragment = () => 'FRAGMENT'
export const portalCreator = node => {
  function Portal () {
    return 'PORTAL'
  }

  Portal.target = document.body

  if (node && node.nodeType === Node.ELEMENT_NODE) {
    Portal.target = node
  }

  return Portal
}
