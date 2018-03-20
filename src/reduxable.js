import dom, { Fragment } from './index'

function updateElement(parent, next, prev) {
  // later virtualDOM mods
  if (!next.isEqualNode(prev)) {
    parent.replaceChild( next, parent.firstChild );
  }
}

function Actionable(elements, store) {
  let parentNode
  let nextProps
  const unsubscribe = store.subscribe(function() {
    const nextNode = dom(() => elements(nextProps))
    updateElement(parentNode, nextNode, parentNode.firstChild)
  })

  return props => {
    nextProps = props
    return dom('span', { ref: (node) => { parentNode = node } },
      elements(props)
    )
  }
}

export default Actionable
