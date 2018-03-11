import dom, { Fragment } from './index'

function updateElement(parent, next, prev) {
  // later virtualDOM mods
  if (!next.isEqualNode(prev)) {
    parent.replaceChild( next, parent.firstChild );
  }
}

function Actionable(elements, state, actions) {
  const actionSetWith = actions(setState)
  let parentNode
  let nextProps

  function setState(stateModified) {
    const nextState = Object.assign({}, state, stateModified)
    const nextNode = dom(() => elements({
      props: nextProps, state: nextState, actions: actionSetWith(nextState)
    }))
    updateElement(parentNode, nextNode, parentNode.firstChild)
  }

  return props => {
    nextProps = props
    return dom('span', { ref: (node) => { parentNode = node } },
      elements({ props, state, actions: actionSetWith(state) })
    )
  }
}

export default Actionable
