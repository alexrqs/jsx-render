!(function(e, n) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = n())
    : 'function' == typeof define && define.amd
    ? define([], n)
    : 'object' == typeof exports
    ? (exports.jsx = n())
    : (e.jsx = n())
})(window, function() {
  return (function(e) {
    var n = {}
    function t(o) {
      if (n[o]) return n[o].exports
      var r = (n[o] = { i: o, l: !1, exports: {} })
      return e[o].call(r.exports, r, r.exports, t), (r.l = !0), r.exports
    }
    return (
      (t.m = e),
      (t.c = n),
      (t.d = function(e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: o })
      }),
      (t.r = function(e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 })
      }),
      (t.t = function(e, n) {
        if ((1 & n && (e = t(e)), 8 & n)) return e
        if (4 & n && 'object' == typeof e && e && e.__esModule) return e
        var o = Object.create(null)
        if (
          (t.r(o),
          Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
          2 & n && 'string' != typeof e)
        )
          for (var r in e)
            t.d(
              o,
              r,
              function(n) {
                return e[n]
              }.bind(null, r),
            )
        return o
      }),
      (t.n = function(e) {
        var n =
          e && e.__esModule
            ? function() {
                return e.default
              }
            : function() {
                return e
              }
        return t.d(n, 'a', n), n
      }),
      (t.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
      }),
      (t.p = ''),
      t((t.s = 0))
    )
  })([
    function(e, n, t) {
      'use strict'
      t.r(n)
      var o = [].concat(
        [
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
        ],
        ['onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart'],
        ['onKeyDown', 'onKeyPress', 'onKeyUp'],
        ['onFocus', 'onBlur'],
        ['onChange', 'onInput', 'onInvalid', 'onSubmit'],
        ['onScroll'],
        ['onLoad', 'onError'],
      )
      function r(e) {
        var n = document.createDocumentFragment()
        return (
          e.forEach(function e(t) {
            if (
              t instanceof HTMLElement ||
              t instanceof SVGElement ||
              t instanceof Comment ||
              t instanceof DocumentFragment
            )
              n.appendChild(t)
            else if ('string' == typeof t || 'number' == typeof t) {
              var o = document.createTextNode(t)
              n.appendChild(o)
            } else t instanceof Array && t.forEach(e)
          }),
          n
        )
      }
      function u(e) {
        return (u =
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
      function c(e, n, t) {
        var u = (function(e) {
            var n = new RegExp('^'.concat(e, '$'), 'i')
            return ['path', 'svg', 'use', 'g'].some(function(e) {
              return n.test(e)
            })
          })(e)
            ? document.createElementNS('http://www.w3.org/2000/svg', e)
            : document.createElement(e),
          c = r(t)
        return (
          u.appendChild(c),
          Object.keys(n || {}).forEach(function(e) {
            if ('style' === e) Object.assign(u.style, n[e])
            else if ('ref' === e && 'function' == typeof n.ref) n.ref(u, n)
            else if ('className' === e) u.setAttribute('class', n[e])
            else if ('htmlFor' === e) u.setAttribute('for', n[e])
            else if ('xlinkHref' === e)
              u.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', n[e])
            else if ('dangerouslySetInnerHTML' === e) u.innerHTML = n[e].__html
            else if (o.includes(e)) {
              var t = e.replace(/^on/, '').toLowerCase()
              u.addEventListener(t, n[e])
            } else u.setAttribute(e, n[e])
          }),
          u
        )
      }
      var i = function(e, n) {
        for (var t = arguments.length, o = new Array(t > 2 ? t - 2 : 0), i = 2; i < t; i++)
          o[i - 2] = arguments[i]
        return 'function' == typeof e
          ? (function(e, n, t) {
              var o = Object.assign({}, e.defaultProps || {}, n, { children: t }),
                u = e.prototype.render ? new e(o).render : e,
                c = u(o)
              switch (c) {
                case 'FRAGMENT':
                  return r(t)
                case 'PORTAL':
                  return u.target.appendChild(r(t)), document.createComment('Portal Used')
                default:
                  return c
              }
            })(e, n, o)
          : 'string' == typeof e
          ? c(e, n, o)
          : console.error(
              'jsx-render does not handle '.concat(
                'undefined' == typeof tag ? 'undefined' : u(tag),
              ),
            )
      }
      t.d(n, 'jsx', function() {
        return a
      })
      var a = {
        dom: i,
        Fragment: function() {
          return 'FRAGMENT'
        },
        portalCreator: function(e) {
          function n() {
            return 'PORTAL'
          }
          return (
            (n.target = document.body), e && e.nodeType === Node.ELEMENT_NODE && (n.target = e), n
          )
        },
      }
    },
  ]).jsx
})
