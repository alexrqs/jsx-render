### Actions and "state" with redux

The redux-ish approach is an experiment and might change later do not get too attached.
```jsx
// store.js
import { createStore } from 'redux'

function counter(state = 0, action) {
  if (action.type === 'ADD') {
    return state + 1
  }
  return state
}

const store = createStore(counter)
export default store
```
```jsx
import dom from 'jsx-render'
import { withState } from 'jsx-render/lib/reduxish'
import store from './store'

const actions = {
  increment: el => el.addEventListener('click', () => store.dispatch({ type: 'ADD' })),
}

function Headline(props) {
  const state = store.getState()
  return (
    <div>
      <span>
        <h1>counter {state}</h1>
      </span>
      <button style={{ background: props.bg }} ref={actions.increment}>
        Increase ++!
      </button>
    </div>
  )
}

export default withState(Headline, store)
```
