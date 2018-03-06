import dom, { Fragment } from 'jsx-render'

function Headline() {
  return (
    <Fragment>
      <h1 className="headline">Hello this in an h1
        <br />
        new line
      </h1>
      <h2>Second Headline</h2>
    </Fragment>
  )
}

export default Headline
