## JSX-render

[![travis](https://travis-ci.org/alecsgone/jsx-render.svg?branch=master)](https://travis-ci.org/alecsgone/jsx-render)

Small file to render jsx as a stateless component from react but without the heavy kb use of it.

## Contents

- [Quick Start](#quick-start)
- [How To Install](#how-to-install)
- [Features](#features)
- [How To test](recipes/testing.md)
- [Recipes](#recipes)

### Quick Start

(no build system, just plain html)

```html
<!-- index.html -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.21.1/babel.min.js"></script>
<script type="text/javascript" src="https://alecsgone.github.io/jsx-render/jsx.js"></script>
<script>
  Babel.registerPreset('jsx-render', {
    presets: [[Babel.availablePresets['es2015']]],
    plugins: [
      Babel.availablePlugins['syntax-jsx'],
      [
        Babel.availablePlugins['transform-react-jsx'],
        {
          pragma: 'jsx.dom',
          pragmaFrag: 'jsx.Fragment',
        },
      ],
    ],
  })
</script>

<script type="text/babel" data-presets="jsx-render">
  const foo = () => <p>Hello world</p>

  document.body.appendChild(foo())
</script>
```

### How To Install

The required packages are `@babel/plugin-syntax-jsx`, `@babel/plugin-transform-react-jsx` and of course `jsx-render`, additionally you will need @babel/core, webpack or any other way to transpile the code that you prefer.

```sh
$ npm install jsx-render @babel/plugin-syntax-jsx @babel/plugin-transform-react-jsx
```

### Getting started

Make sure you have the pragma fn defined and its name is "dom"

```json
// .babelrc
{
  "presets": ["babel-preset-primavera", ["@babel/preset-react", { "pragma": "dom" }]]
}
```

Now you can create components e.g.

```jsx
import dom from 'jsx-render'

const DummyComponent = props => <div>{props.children}</div>
export default DummyComponent
```

or Fragments

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

### Features

- **new** Class suport with default target: the `render()` method
- Render Basic Single Components `<div />`
- Conditional Component `{condition ? <foo/> : <bar/>}`
- Component with Data Attributes `<div data-some="attr">`
- Component with Attributes `<img src="foo.jpg">`
- Nested Component ul>li>a
- Siblings Components ul>li\*3
- Components with classname p.chan
- Map components & numbers `array.map(item => <div>{item}</div>)`
- [Fragments](#fragments)
- [Portals](#portals)
- SVG
- Component Props `<Custom foo="foo">`
- Component Children `<Custom>children</Custom>`
- Component render xlinkHref for SVG sprites
- [dangerouslySetInnerHTML](#dangerouslysetinnerhtml)
- Components withState `Redux` not included

### Fragments

```jsx
import dom, { Fragments } from 'jsx-render'

// Return siblings without direct parent component
const Foo = () => (
  <Fragments>
    <li />
    <li />
  </Fragments>
)
const ul = document.createElement('ul')
ul.appendChild(<Foo />)
```

### Portals

```jsx
import dom, { portalCreator } from 'jsx-render'

// can render the component on a diferent node than the parentNode
// useful for modals, and if the argument is not a node
// it will render as body direct son by default
function Component(node) {
  const Portal = portalCreator(node)

  return (
    <div>
      <Portal>
        <span>uno</span>
      </Portal>
    </div>
  )
}
```

### dangerouslySetInnerHTML

```jsx
function render() {
  return <div dangerouslySetInnerHTML={{ __html: '<span>StrangerDanger</span>' }} />
}
```

### Recipes

- [Redux](recipes/redux.md)
- [ClassComponents](recipes/classComponents.md)
- [Events](recipes/events.md)

### Testing

[Testing](recipes/testing.md)
