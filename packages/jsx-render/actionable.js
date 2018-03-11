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

  function setState(stateModified) {
    const nextState = Object.assign({}, state, stateModified)
    const nextNode = dom(() => elements(nextState, actionSetWith(nextState)))
    updateElement(parentNode, nextNode, parentNode.firstChild)
  }

  return () => dom('span', {
    ref: (node) => { parentNode = node }
  }, elements(state, actionSetWith(state)))
}

export default Actionable
