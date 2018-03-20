import dom, { Fragment } from 'jsx-render'

function Foo(props) {
  return (
    <Fragment>
      <span>
        <h2>fragments {props.elem}</h2>
      </span>
    </Fragment>
  )
}

export default Foo
