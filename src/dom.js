import { isSVG, objectToStyleString } from './utils'

function dom(tag, attrs, ...children) {
  // Custom Components will be functions
  if (typeof tag === 'function') {
    const result = tag(Object.assign({}, attrs, { children }))
    return result === 'FRAGMENT' ? children : result
  }

  // regular html components will be strings to create the elements
  // this is handled by the babel plugins
  if (typeof tag === 'string') {
    // fragments will help later to append multiple children to the initial node
    const fragments = document.createDocumentFragment()
    const element = isSVG(tag)
      ? document.createElementNS('http://www.w3.org/2000/svg', tag)
      : document.createElement(tag)

    // one or multiple will be evaluated to append as string or HTMLElement
    children.forEach(function handleAppends(child) {
      if (child instanceof HTMLElement || child instanceof SVGElement) {
        fragments.appendChild(child)
      } else if (typeof child === 'string' || typeof child === 'number'){
        const textnode = document.createTextNode(child)
        fragments.appendChild(textnode)
      } else if (child instanceof Array){
        child.forEach(handleAppends)
      } else if (child === false) {
        // expression evaluated as false e.g. {false && <Elem />}
      } else {
        // later other things could not be HTMLElement nor strings
        console.log('Not Appendable', tag, attrs, children, child);
      }
    })

    element.appendChild(fragments)

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
