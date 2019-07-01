!(function(e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' == typeof exports
    ? (exports.jsx = t())
    : (e.jsx = t())
})(window, function() {
  return (function(e) {
    var t = {}
    function n(r) {
      if (t[r]) return t[r].exports
      var o = (t[r] = { i: r, l: !1, exports: {} })
      return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r })
      }),
      (n.r = function(e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 })
      }),
      (n.t = function(e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e
        var r = Object.create(null)
        if (
          (n.r(r),
          Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var o in e)
            n.d(
              r,
              o,
              function(t) {
                return e[t]
              }.bind(null, o),
            )
        return r
      }),
      (n.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default
              }
            : function() {
                return e
              }
        return n.d(t, 'a', t), t
      }),
      (n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }),
      (n.p = ''),
      n((n.s = 0))
    )
  })([
    function(e, t, n) {
      'use strict'
      function r(e) {
        var t = document.createDocumentFragment()
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
              var r = document.createTextNode(n)
              t.appendChild(r)
            } else n instanceof Array && n.forEach(e)
          }),
          t
        )
      }
      function o(e) {
        return (o =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function(e) {
                return typeof e
              }
            : function(e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e
              })(e)
      }
      function u(e, t, n) {
        var o = (function(e) {
            var t = new RegExp('^'.concat(e, '$'), 'i')
            return ['path', 'svg', 'use', 'g'].some(function(e) {
              return t.test(e)
            })
          })(e)
            ? document.createElementNS('http://www.w3.org/2000/svg', e)
            : document.createElement(e),
          u = r(n)
        return (
          o.appendChild(u),
          Object.keys(t || {}).forEach(function(e) {
            'style' === e
              ? Object.assign(o.style, t[e])
              : 'ref' === e && 'function' == typeof t.ref
              ? t.ref(o, t)
              : 'className' === e
              ? o.setAttribute('class', t[e])
              : 'xlinkHref' === e
              ? o.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', t[e])
              : 'dangerouslySetInnerHTML' === e
              ? (o.innerHTML = t[e].__html)
              : o.setAttribute(e, t[e])
          }),
          o
        )
      }
      n.r(t)
      var f = function(e, t) {
        for (var n = arguments.length, f = new Array(n > 2 ? n - 2 : 0), c = 2; c < n; c++)
          f[c - 2] = arguments[c]
        return 'function' == typeof e
          ? (function(e, t, n) {
              var o = Object.assign({}, e.defaultProps || {}, t, { children: n }),
                u = e.prototype.render ? new e(o).render : e,
                f = u(o)
              switch (f) {
                case 'FRAGMENT':
                  return r(n)
                case 'PORTAL':
                  return u.target.appendChild(r(n)), document.createComment('Portal Used')
                default:
                  return f
              }
            })(e, t, f)
          : 'string' == typeof e
          ? u(e, t, f)
          : console.error(
              'jsx-render does not handle '.concat(
                'undefined' == typeof tag ? 'undefined' : o(tag),
              ),
            )
      }
      n.d(t, 'jsx', function() {
        return c
      })
      var c = {
        dom: f,
        Fragment: function() {
          return 'FRAGMENT'
        },
        portalCreator: function(e) {
          function t() {
            return 'PORTAL'
          }
          return (
            (t.target = document.body), e && e.nodeType === Node.ELEMENT_NODE && (t.target = e), t
          )
        },
      }
    },
  ]).jsx
})
