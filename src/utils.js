export function isSVG(element) {
  const patt = new RegExp('^' + element + '$', 'i')
  const SVGTags = ['path', 'svg', 'use', 'g']

  return SVGTags.some(tag => patt.test(tag))
}

export function objectToStyleString(styles) {
  return Object.keys(styles)
    .map(prop => `${prop}: ${styles[prop]}`)
    .join(';')
}

export function createFragmentFrom(children) {
  // fragments will help later to append multiple children to the initial node
  const fragment = document.createDocumentFragment()

  function processDOMNodes(child) {
    if (child instanceof HTMLElement || child instanceof SVGElement) {
      fragment.appendChild(child)
    } else if (typeof child === 'string' || typeof child === 'number'){
      const textnode = document.createTextNode(child)
      fragment.appendChild(textnode)
    } else if (child instanceof Array){
      child.forEach(processDOMNodes)
    } else if (child === false) {
      // expression evaluated as false e.g. {false && <Elem />}
    } else {
      // later other things could not be HTMLElement nor strings
      console.log('Not Appendable', child);
    }
  }

  children.forEach(processDOMNodes)

  return fragment
}
