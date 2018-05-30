import { isSVG, objectToStyleString, createFragmentFrom } from './utils'

function dom(tag, attrs, ...children) {
  // Custom Components will be functions
  if (typeof tag === 'function') {
    tag.defaultProps = tag.defaultProps || {}
    const result = tag(Object.assign({}, tag.defaultProps, attrs, { children }))

    switch (result) {
      case 'FRAGMENT':
        return createFragmentFrom(children)

      // Portals are useful to render modals
      // allow render on a different element than the parent of the chain
      // and leave a comment instead
      case 'PORTAL':
        tag.target.appendChild(createFragmentFrom(children))
        return document.createComment("Portal Used")
      default:
        return result
    }
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
        element.style.cssText = objectToStyleString(attrs[prop])
      } else if ( prop === 'ref' && typeof attrs.ref === 'function') {
        attrs.ref(element, attrs)
      } else if (prop === 'className') {
        element.setAttribute('class', attrs[prop])
      } else if (prop === 'xlinkHref') {
        element.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', attrs[prop])
      } else if (prop === 'dangerouslySetInnerHTML') {
        element.innerHTML = attrs[prop].__html;
      } else if (attrs.hasOwnProperty(prop)) {
        element.setAttribute(prop, attrs[prop])
      }
    }

    return element
  }

  console.error(`jsx-render does not handle ${typeof tag}`)
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
