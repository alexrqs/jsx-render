!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define([], t)
      : 'object' == typeof exports
        ? (exports.jsx = t())
        : (e.jsx = t())
})(self, () =>
  (() => {
    'use strict'
    const e = {
      d: (t, n) => {
        if (Array.isArray(n))
          for (var o = 0; o < n.length;) {
            var r = n[o++],
              c = n[o++]
            e.o(t, r)
              ? 0 === c && o++
              : 0 === c
                ? Object.defineProperty(t, r, { enumerable: !0, value: n[o++] })
                : Object.defineProperty(t, r, { enumerable: !0, get: c })
          }
        else
          for (var r in n)
            e.o(n, r) && !e.o(t, r) && Object.defineProperty(t, r, { enumerable: !0, get: n[r] })
      },
      o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
    }
    let t = {}
    e.d(t, { jsx: () => s })
    const n = [
      'onClick',
      'onContextMenu',
      'onDoubleClick',
      'onDrag',
      'onDragEnd',
      'onDragEnter',
      'onDragExit',
      'onDragLeave',
      'onDragOver',
      'onDragStart',
      'onDrop',
      'onMouseDown',
      'onMouseEnter',
      'onMouseLeave',
      'onMouseMove',
      'onMouseOut',
      'onMouseOver',
      'onMouseUp',
      'onTouchCancel',
      'onTouchEnd',
      'onTouchMove',
      'onTouchStart',
      'onKeyDown',
      'onKeyPress',
      'onKeyUp',
      'onFocus',
      'onBlur',
      'onChange',
      'onInput',
      'onInvalid',
      'onSubmit',
      'onScroll',
      'onLoad',
      'onError',
    ]
    function o(e) {
      const t = document.createDocumentFragment()
      return (
        e.forEach(function e(n) {
          if (
            n instanceof HTMLElement ||
            n instanceof SVGElement ||
            n instanceof Comment ||
            n instanceof DocumentFragment
          )
            t.appendChild(n)
          else if ('string' == typeof n || 'number' == typeof n) {
            const e = document.createTextNode(n)
            t.appendChild(e)
          } else n instanceof Array && n.forEach(e)
        }),
        t
      )
    }
    function r(e, t) {
      var n = Object.keys(e)
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e)
        ;(t &&
          (o = o.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
          })),
          n.push.apply(n, o))
      }
      return n
    }
    function c(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {}
        t % 2
          ? r(Object(n), !0).forEach(function (t) {
              i(e, t, n[t])
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : r(Object(n)).forEach(function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
              })
      }
      return e
    }
    function i(e, t, n) {
      return (
        (t = (function (e) {
          var t = (function (e) {
            if ('object' != typeof e || !e) return e
            var t = e[Symbol.toPrimitive]
            if (void 0 !== t) {
              var n = t.call(e, 'string')
              if ('object' != typeof n) return n
              throw new TypeError('@@toPrimitive must return a primitive value.')
            }
            return String(e)
          })(e)
          return 'symbol' == typeof t ? t : t + ''
        })(t)) in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      )
    }
    const s = {
      dom: function (e, t) {
        for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), s = 2; s < r; s++)
          i[s - 2] = arguments[s]
        return 'function' == typeof e
          ? (function (e, t, n) {
              const r = c(c(c({}, e.defaultProps), t), {}, { children: n }),
                i = e.prototype && e.prototype.render ? new e(r).render : e,
                s = i(r)
              switch (s) {
                case 'FRAGMENT':
                  return o(n)
                case 'PORTAL':
                  return (i.target.appendChild(o(n)), document.createComment('Portal Used'))
                default:
                  return s
              }
            })(e, t, i)
          : 'string' == typeof e
            ? (function (e, t, r) {
                const c = (function (e) {
                    const t = new RegExp('^'.concat(e, '$'), 'i')
                    return ['path', 'svg', 'use', 'g'].some(e => t.test(e))
                  })(e)
                    ? document.createElementNS('http://www.w3.org/2000/svg', e)
                    : document.createElement(e),
                  i = o(r)
                return (
                  c.appendChild(i),
                  Object.keys(t || {}).forEach(e => {
                    if ('style' === e) Object.assign(c.style, t[e])
                    else if ('ref' === e && 'function' == typeof t.ref) t.ref(c, t)
                    else if ('className' === e) c.setAttribute('class', t[e])
                    else if ('htmlFor' === e) c.setAttribute('for', t[e])
                    else if ('xlinkHref' === e)
                      c.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', t[e])
                    else if ('dangerouslySetInnerHTML' === e) c.innerHTML = t[e].__html
                    else if (n.includes(e)) {
                      const n = e.replace(/^on/, '').toLowerCase()
                      c.addEventListener(n, t[e])
                    } else c.setAttribute(e, t[e])
                  }),
                  c
                )
              })(e, t, i)
            : console.error('jsx-render does not handle '.concat(typeof tag))
      },
      Fragment: () => 'FRAGMENT',
      portalCreator: e => {
        function t() {
          return 'PORTAL'
        }
        return (
          (t.target = document.body),
          e && e.nodeType === Node.ELEMENT_NODE && (t.target = e),
          t
        )
      },
    }
    return ((t = t.jsx), t)
  })(),
)
//# sourceMappingURL=jsx.js.map
