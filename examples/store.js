import { createStore, combineReducers } from 'redux'

function counter(state = 0, action) {
  switch (action.type) {
    case 'INC':
      return state + 1
    case 'DEC':
      return state - 1
    default:
      return state
  }
}

const rootReducer = combineReducers({
  counter,
  changos(state = false) { return state },
})

const store = createStore(rootReducer, {
  counter: 0,
  changos: true,
})

export default store
