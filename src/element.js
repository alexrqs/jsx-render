/**
 * v2 pragma: JSX no longer creates DOM eagerly. Every JSX expression becomes a
 * lightweight vnode `{ element, attrs, children }` that renderClient (DOM) or
 * renderServer (HTML string) consume.
 */
const dom = (element, attrs, ...children) => ({ element, attrs, children })

export default dom

export const Fragment = ({ children }) => ({ element: 'FRAGMENT', attrs: null, children })

export const portalCreator = node => {
  function Portal({ children }) {
    return { element: 'PORTAL', attrs: null, children }
  }

  // target resolution happens in renderClient so this module never touches
  // `document` and stays importable on the server
  Portal.target = node

  return Portal
}
