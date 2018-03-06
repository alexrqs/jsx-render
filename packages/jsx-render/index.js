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
    children.forEach(child => {
      if (child instanceof HTMLElement) {
        fragments.appendChild(child)
      } else if (typeof child === 'string'){
        const textnode = document.createTextNode(child)
        fragments.appendChild(textnode)
      } else {
        // later other things could not be HTMLElement not strings
        console.log('not appendable', child);
      }
    })

    element.appendChild(fragments)

    Object.assign(element, attrs)

    return element
  }

  throw new Error('Unknown type')
}

export default dom
