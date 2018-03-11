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
