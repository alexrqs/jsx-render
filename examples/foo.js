import dom, { Fragment } from '../src/dom';

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
