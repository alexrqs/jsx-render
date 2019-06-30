import dom, { Fragment, portalCreator } from './dom'

const jsx = {
  dom,
  Fragment,
  portalCreator,
}

// disable eslint to export the window.jsx with webpack, default is not supported
// eslint-disable-next-line import/prefer-default-export
export { jsx }
