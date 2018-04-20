import { isSVG, objectToStyleString, createFragmentFrom } from './utils'

function dom(tag, attrs, ...children) {
  // Custom Components will be functions
  if (typeof tag === 'function') {
    tag.defaultProps = tag.defaultProps || {}

    const result = tag(Object.assign({}, tag.defaultProps, attrs, { children }))
    const completeTag = result === 'FRAGMENT'
      ? createFragmentFrom(children)
      : result

    return completeTag
  }

  // regular html components will be strings to create the elements
  // this is handled by the babel plugins
  if (typeof tag === 'string') {
    const element = isSVG(tag)
      ? document.createElementNS('http://www.w3.org/2000/svg', tag)
      : document.createElement(tag)

    // one or multiple will be evaluated to append as string or HTMLElement
    const fragment = createFragmentFrom(children)
    element.appendChild(fragment)

    for (const prop in attrs) {
      if (prop === 'style') {
        element.style = objectToStyleString(attrs[prop])
      } else if ( prop === 'ref' && typeof attrs.ref === 'function') {
        attrs.ref(element)
      } else if (prop === 'className') {
        element.setAttribute('class', attrs[prop])
      } else if (prop === 'xlinkHref') {
        element.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', attrs[prop])
      } else if (attrs.hasOwnProperty(prop)) {
        element.setAttribute(prop, attrs[prop])
      }
    }

    return element
  }

  throw new Error(`jsx-render does not handle ${typeof tag}`)
}

export default dom
export const Fragment = () => 'FRAGMENT'
