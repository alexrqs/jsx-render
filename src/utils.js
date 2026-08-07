// tags that exist in both HTML and SVG (a, title, style, script...)
// are intentionally left out and resolve to HTML elements
const SVG_TAGS = [
  'animate',
  'animatemotion',
  'animatetransform',
  'circle',
  'clippath',
  'defs',
  'desc',
  'ellipse',
  'feblend',
  'fecolormatrix',
  'fecomponenttransfer',
  'fecomposite',
  'feconvolvematrix',
  'fediffuselighting',
  'fedisplacementmap',
  'fedistantlight',
  'fedropshadow',
  'feflood',
  'fefunca',
  'fefuncb',
  'fefuncg',
  'fefuncr',
  'fegaussianblur',
  'feimage',
  'femerge',
  'femergenode',
  'femorphology',
  'feoffset',
  'fepointlight',
  'fespecularlighting',
  'fespotlight',
  'fetile',
  'feturbulence',
  'filter',
  'foreignobject',
  'g',
  'image',
  'line',
  'lineargradient',
  'marker',
  'mask',
  'metadata',
  'mpath',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialgradient',
  'rect',
  'set',
  'stop',
  'svg',
  'switch',
  'symbol',
  'text',
  'textpath',
  'tspan',
  'use',
  'view',
]

export function isSVG(element) {
  return SVG_TAGS.includes(String(element).toLowerCase())
}

export function createFragmentFrom(children) {
  // fragments will help later to append multiple children to the initial node
  const fragment = document.createDocumentFragment()

  function processDOMNodes(child) {
    if (child instanceof Node) {
      // covers HTMLElement, SVGElement, Text, Comment and DocumentFragment
      fragment.appendChild(child)
    } else if (typeof child === 'string' || typeof child === 'number') {
      const textnode = document.createTextNode(child)
      fragment.appendChild(textnode)
    } else if (child instanceof Array) {
      child.forEach(processDOMNodes)
    } else if (child === false || child === null) {
      // expression evaluated as false e.g. {false && <Elem />}
      // expression evaluated as false e.g. {null && <Elem />}
    } else {
      // later other things could not be HTMLElement nor strings
    }
  }

  children.forEach(processDOMNodes)

  return fragment
}
