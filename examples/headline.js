import dom, { Fragment } from 'jsx-render'
import { withState } from 'jsx-render/lib/reduxish'
import store from './store'

const actions = {
  increment: el => el.addEventListener('click', () => store.dispatch({ type: 'INC' })),
  equality: el => el.addEventListener('click', () => console.log('bla', store.getState())),
  decrement: el => el.addEventListener('click', () => store.dispatch({ type: 'DEC' })),
  fetch: el => el.addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        store.dispatch({ type: 'USER', payload: json })
      })
  }),
}

function Headline(props) {
  const state = store.getState()
  return (
    <div>
      <span>
        <h1>{state.counter}</h1>
      </span>
      <button ref={actions.increment}>
        Increase ++{state.counter === 4 ? ' Why so serious!' : '!'}
      </button>
      <button style={{ background: props.bg }} ref={actions.equality}>
        Click Me! {props.width}
      </button>
      <button ref={actions.decrement}>
        Dec --!
      </button>
      <button ref={actions.fetch}>
        getUser
      </button>
      <div>
        {state.user && (
          Object.keys(state.user).map(item => <li>{state.user[item]}</li>)
        )}
      </div>
    </div>
  )
}

export default withState(Headline, store)
