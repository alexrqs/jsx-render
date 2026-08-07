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
              i = n[o++]
            e.o(t, r)
              ? 0 === i && o++
              : 0 === i
                ? Object.defineProperty(t, r, { enumerable: !0, value: n[o++] })
                : Object.defineProperty(t, r, { enumerable: !0, get: i })
          }
        else
          for (var r in n)
            e.o(n, r) && !e.o(t, r) && Object.defineProperty(t, r, { enumerable: !0, get: n[r] })
      },
      o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
    }
    let t = {}
    e.d(t, { jsx: () => f })
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
      ],
      o = [
        'animate',
        'animatemotion',
        'animatetransform',
        'circle',
        'clippath',
        'defs',
        'desc',
        'ellipse',
        'feblend',
        'fecolormatrix',
        'fecomponenttransfer',
        'fecomposite',
        'feconvolvematrix',
        'fediffuselighting',
        'fedisplacementmap',
        'fedistantlight',
        'fedropshadow',
        'feflood',
        'fefunca',
        'fefuncb',
        'fefuncg',
        'fefuncr',
        'fegaussianblur',
        'feimage',
        'femerge',
        'femergenode',
        'femorphology',
        'feoffset',
        'fepointlight',
        'fespecularlighting',
        'fespotlight',
        'fetile',
        'feturbulence',
        'filter',
        'foreignobject',
        'g',
        'image',
        'line',
        'lineargradient',
        'marker',
        'mask',
        'metadata',
        'mpath',
        'path',
        'pattern',
        'polygon',
        'polyline',
        'radialgradient',
        'rect',
        'set',
        'stop',
        'svg',
        'switch',
        'symbol',
        'text',
        'textpath',
        'tspan',
        'use',
        'view',
      ]
    function r(e) {
      const t = document.createDocumentFragment()
      return (
        e.forEach(function e(n) {
          if (n instanceof Node) t.appendChild(n)
          else if ('string' == typeof n || 'number' == typeof n) {
            const e = document.createTextNode(n)
            t.appendChild(e)
          } else n instanceof Array && n.forEach(e)
        }),
        t
      )
    }
    function i(e, t) {
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
    function a(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {}
        t % 2
          ? i(Object(n), !0).forEach(function (t) {
              c(e, t, n[t])
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : i(Object(n)).forEach(function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
              })
      }
      return e
    }
    function c(e, t, n) {
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
    const f = {
      dom: function (e, t) {
        for (var i = arguments.length, c = new Array(i > 2 ? i - 2 : 0), f = 2; f < i; f++)
          c[f - 2] = arguments[f]
        return 'function' == typeof e
          ? (function (e, t, n) {
              const o = a(a(a({}, e.defaultProps), t), {}, { children: n }),
                i = e.prototype && e.prototype.render ? new e(o).render : e,
                c = i(o)
              switch (c) {
                case 'FRAGMENT':
                  return r(n)
                case 'PORTAL':
                  return (i.target.appendChild(r(n)), document.createComment('Portal Used'))
                default:
                  return c
              }
            })(e, t, c)
          : 'string' == typeof e
            ? (function (e, t, i) {
                const a = (function (e) {
                    return o.includes(String(e).toLowerCase())
                  })(e)
                    ? document.createElementNS('http://www.w3.org/2000/svg', e)
                    : document.createElement(e),
                  c = r(i)
                return (
                  a.appendChild(c),
                  Object.keys(t || {}).forEach(e => {
                    if ('style' === e) Object.assign(a.style, t[e])
                    else if ('ref' === e && 'function' == typeof t.ref) t.ref(a, t)
                    else if ('className' === e) a.setAttribute('class', t[e])
                    else if ('htmlFor' === e) a.setAttribute('for', t[e])
                    else if ('xlinkHref' === e)
                      a.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', t[e])
                    else if ('dangerouslySetInnerHTML' === e) a.innerHTML = t[e].__html
                    else if (n.includes(e)) {
                      const n =
                        'onDoubleClick' === e ? 'dblclick' : e.replace(/^on/, '').toLowerCase()
                      a.addEventListener(n, t[e])
                    } else
                      !1 === t[e] ||
                        null === t[e] ||
                        void 0 === t[e] ||
                        a.setAttribute(e, !0 === t[e] ? '' : t[e])
                  }),
                  a
                )
              })(e, t, c)
            : console.error('jsx-render does not handle '.concat(typeof e))
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
