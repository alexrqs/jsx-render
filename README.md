## JSX-render
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![travis](https://travis-ci.org/alecsgone/jsx-files.svg?branch=master)](https://travis-ci.org/alecsgone/jsx-files)
Small file to render jsx as a stateless component from react but without the heavy kb use of it.

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
