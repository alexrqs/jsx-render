import dom, { Fragment, portalCreator } from './element'
import renderClient from './renderClient'
import renderServer from './renderServer'

const jsx = {
  dom,
  Fragment,
  portalCreator,
  renderClient,
  renderServer,
}

// disable eslint to export the window.jsx with webpack, default is not supported
// eslint-disable-next-line import/prefer-default-export
export { jsx }
