import synteticEvents from './synteticEvents'

class JSXComponent {
  constructor(props = {}) {
    this.props = props
    this.render = this.render.bind(this)
    this.ref = this.ref.bind(this, props)
  }

  // eslint-disable-next-line
  ref(node, props) {
    const events = Object.keys(props).filter(prop => synteticEvents.includes(prop))

    events.forEach(synteticEvent => {
      const event = synteticEvent.replace(/^on/, '').toLowerCase()

      node.addEventListener(event, props[synteticEvent])
    })
  }

  // eslint-disable-next-line
  render() {}
}

export default JSXComponent
