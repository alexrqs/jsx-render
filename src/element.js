const dom = (element, attrs, ...children) => ({ element, attrs, children })

export default dom
export const Fragment = element => ({ element: 'FRAGMENT', children: element.children })
export const portalCreator = node => {
  function Portal(element) {
    return { element: 'PORTAL', children: element.children }
  }

  Portal.target = document.body

  if (node && node.nodeType === Node.ELEMENT_NODE) {
    Portal.target = node
  }

  return Portal
}
