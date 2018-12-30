const dom = (element, attrs, ...children) => ({ element, attrs, children })

export default dom
export const Fragment = element => ({ element: 'FRAGMENT', children: element.children })
