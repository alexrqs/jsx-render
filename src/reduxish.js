import renderClient from './renderClient'

function updateElement(parent, next, prev) {
  // later virtualDOM mods
  if (!next.isEqualNode(prev)) {
    parent.replaceChild(next, parent.firstChild)
  }
}

// eslint-disable-next-line
export function withState(elements, store) {
  let parentNode
  let nextProps

  store.subscribe(() => {
    const nextNode = renderClient(() => elements(nextProps))
    updateElement(parentNode, nextNode, parentNode.firstChild)
  })

  return props => {
    nextProps = props
    return renderClient({
      tag: 'span',
      attrs: {
        ref: node => {
          parentNode = node
        },
      },
      children: elements(props),
    })
  }
}
