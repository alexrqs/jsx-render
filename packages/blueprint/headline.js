import dom, { Fragment } from 'jsx-render'
import Actionable from 'jsx-render/lib/actionable'

const defaultState = { num: 0 }

const actions = setState => currentState => ({
  increment: () => setState({ num: currentState.num + 1 }),
  equality: () => setState({ num: currentState.num }),
  decrement: () => setState({ num: currentState.num - 1 }),
})

function Headline({ props, state, actions }) {
  return (
    <div>
      <span>
        <h1>{state.num}</h1>
        {state.num === 4 && <h2>hola</h2>}
      </span>
      <button ref={node => { node.addEventListener('click', actions.increment) }}>
        Increase ++!
      </button>
      <button style={{ background: props.bg }}ref={node => { node.addEventListener('click', actions.equality) }}>
        Click Me! {props.width}
      </button>
      <button ref={node => { node.addEventListener('click', actions.decrement) }}>
        Increase --!
      </button>
    </div>
  )
}

export default Actionable(Headline, defaultState, actions)
