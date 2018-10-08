## Classes for complex components

### Usage

#### Create the class

- First way is to create the `bind` and pass the props yourself

```jsx
class Foo {
  constructor(props) {
    this.props = props
    this.render = this.render.bind(this)
  }

  render(props) {
    return <span baz={props.baz} qux={this.props.qux} />
  }
}
```

#### Extend JSXComponent

- Second is to import the JSXComponent

```jsx
import JSXComponent from 'jsx-render/lib/JSXComponent'

class Foo extends JSXComponent {
  render(props) {
    return <span baz={props.baz} qux={this.props.qux} />
  }
}
```

...

```jsx
function Bar() {
  return <Foo baz="100vw" qux="100vh" />
}
```

##### So what is the difference?

`JSXComponent` also includes a copy of events, read the [Events recipe](events.md).
