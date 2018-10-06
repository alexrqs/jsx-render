import dom from './dom'

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
    const nextNode = dom(() => elements(nextProps))
    updateElement(parentNode, nextNode, parentNode.firstChild)
  })

  return props => {
    nextProps = props
    return dom(
      'span',
      {
        ref: node => {
          parentNode = node
        },
      },
      elements(props),
    )
  }
}
