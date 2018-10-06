### Classes for complex components

#### Usage
```jsx
class Foo {
  constructor(props) {
    this.props = props
    this.render = this.render.bind(this)
  }

  render(props) {
    return (
      <img src="http://lorempixum.com/" width={props.width} height={this.props.height} />
    )
  }
}

...

function bar () {
  return (
    <Foo width="100vw" height="100vh" />
  )
}
```