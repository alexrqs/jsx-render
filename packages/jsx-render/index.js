function dom(tag, attrs, ...children) {
  // Custom Components will be functions
  if (typeof tag === 'function') {
    return tag()
  }

  // regular html components will be strings to create the elements
  // this is handled by the babel plugins
  if (typeof tag === 'string') {
    // fragments will help later to append multiple children to the initial node
    const fragments = document.createDocumentFragment()
    const element = document.createElement(tag)

    // one or multiple will be evaluated to append as string or HTMLElement
    children.forEach(function handleAppends(child) {
      if (child instanceof HTMLElement) {
        fragments.appendChild(child)
      } else if (typeof child === 'string' || typeof child === 'number'){
        const textnode = document.createTextNode(child)
        fragments.appendChild(textnode)
      } else if (child instanceof Array){
        child.forEach(handleAppends)
      } else {
        // later other things could not be HTMLElement not strings
        console.log('not appendable', child);
      }

    })

    element.appendChild(fragments)

    Object.assign(element, attrs)

    if (attrs instanceof Object && attrs.ref && typeof attrs.ref === 'function') {
      attrs.ref(element)
    }

    return element
  }

  throw new Error('Unknown type')
}

export default dom
