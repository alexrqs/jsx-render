const selfClosing = [
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
  'path',
]
const { objectToStyleString } = require('./utils')

function singleAttr(attr) {
  switch (attr) {
    case 'className':
      return 'class'

    default:
      return attr
  }
}

function parseAttrs(attrs) {
  const parsed = Object.keys(attrs)
    .map(attr => {
      let value = attrs[attr]

      if (attr === 'style' && typeof attrs[attr] === 'object') {
        value = objectToStyleString(attrs[attr])
      }

      if (attr === 'ref') {
        return false
      }

      return `${singleAttr(attr)}="${value}"`
    })
    .filter(Boolean)
    .join(' ')

  return parsed
}

function parseTag(tag, attrs, content) {
  const attributes = attrs && Object.keys(attrs).length > 0 ? parseAttrs(attrs) : ''
  // eslint-disable-next-line
  const innerHTML = content instanceof Array ? render(content) : content

  return selfClosing.indexOf(tag) > -1
    ? `<${tag} ${attributes} />`
    : `<${tag} ${attributes}>${innerHTML}</${tag}>`
}

function render(entry) {
  const { element, attrs, children } = entry

  if (typeof element === 'function') {
    return render(element(attrs))
  }

  if (typeof element === 'string') {
    return parseTag(element, attrs, children)
  }

  if (entry instanceof Array) {
    return entry
      .map(subelement => {
        if (typeof subelement === 'string') {
          return subelement
        }

        if (typeof subelement === 'object') {
          return render(subelement)
        }

        return false
      })
      .join('')
  }

  return false
}

export default render
