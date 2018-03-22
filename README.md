## JSX-render
[![travis](https://travis-ci.org/alecsgone/jsx-render.svg?branch=master)](https://travis-ci.org/alecsgone/jsx-render)

Small file to render jsx as a stateless component from react but without the heavy kb use of it.

### Features
- Render Basic Single Components `<div />`
- Conditional Component `{condition ? <foo/> : <bar/>}`
- Component with Data Attributes `<div data-some="attr">`
- Component with Attributes `<img src="foo.jpg">`
- Nested Component ul>li>a
- Siblings Components ul>li*3
- Components with classname p.chan
- Map components & numbers `array.map(item => <div>{item}</div>)`
- Fragments
- SVG
- Component Props `<Custom foo="foo">`
- Component Children `<Custom>children</Custom>`
- Components withState `Redux` not included

### How To
The required packages are `@babel/plugin-syntax-jsx`, `@babel/plugin-transform-react-jsx` and of course `jsx-render`, additionally you will need babel-cli, webpack or any other way to transpile the code that you prefer.

### Getting started

Make sure you have the pragma fn defined and its name is "dom"
```json
// .babelrc
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    "@babel/plugin-syntax-jsx",
    ["@babel/plugin-transform-react-jsx", { "pragma": "dom" }]
  ]
}
```

Now you can create components e.g.
```jsx
import dom from 'js-render'

const DummyComponent = props => (<div>{props.children}</div>)
export default DummyComponent
```

```jsx
import dom, { Fragment } from 'jsx-render'
import DummyComponent from './DummyComponent'

const Modal = props => (
  <div>
    <header>Include {props.title}</header>
    <Fragment>
      <div>Body</div>
      <DummyComponent>Copyright</DummyComponent>
    </Fragment>
  </div>
)
```

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
