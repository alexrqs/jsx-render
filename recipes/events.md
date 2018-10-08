## Events

The `JSXComponent` includes basic events to handle you can read the [supported events](../src/synteticEvents.js)

### Usage

```jsx
import JSXComponent from 'jsx-render/lib/JSXComponent'

class Component extends JSXComponent {
  click() {
    clickLog = true
  }

  render(props) {
    return (
      <button id="clickable" ref={super.ref} onClick={this.click}>
        click me!
      </button>
    )
  }
}
```

Use the `ref` prop to pass `super.ref` that alone let you use `onClick` and pass any function you want.
