export function isSVG(element) {
  const patt = new RegExp(`^${element}$`, 'i')
  const SVGTags = ['path', 'svg', 'use', 'g']

  return SVGTags.some(tag => patt.test(tag))
}

export function createFragmentFrom(children) {
  // fragments will help later to append multiple children to the initial node
  const fragment = document.createDocumentFragment()

  function processDOMNodes(child) {
    if (
      child instanceof HTMLElement ||
      child instanceof SVGElement ||
      child instanceof Comment ||
      child instanceof DocumentFragment
    ) {
      fragment.appendChild(child)
    } else if (typeof child === 'string' || typeof child === 'number') {
      const textnode = document.createTextNode(child)
      fragment.appendChild(textnode)
    } else if (child instanceof Array) {
      child.forEach(processDOMNodes)
    } else if (child === false || child === null) {
      // expression evaluated as false e.g. {false && <Elem />}
      // expression evaluated as false e.g. {null && <Elem />}
    } else if (process.env.NODE_ENV === 'development') {
      // later other things could not be HTMLElement nor strings
      console.log(child, 'is not appendable')
    }
  }

  children.forEach(processDOMNodes)

  return fragment
}

// Map from JSX property (e.g. onClick) to event name (e.g. 'click').
export const EVENT_LISTENERS = {
  // Clipboard Events
  onCopy: 'copy',
  onCut: 'cut',
  onPaste: 'paste',

  // Composition Events
  onCompositionEnd: 'compositionend',
  onCompositionStart: 'compositionstart',
  onCompositionUpdate: 'compositionupdate',

  // Focus Events
  onFocus: 'focus',
  onBlur: 'blur',

  // Form Events
  onChange: 'change',
  onBeforeInput: 'beforeinput',
  onInput: 'input',
  onReset: 'reset',
  onSubmit: 'submit',
  onInvalid: 'invalid',

  // Image Events
  onLoad: 'load',
  onError: 'error',

  // Keyboard Events
  onKeyDown: 'keydown',
  onKeyPress: 'keypress',
  onKeyUp: 'keyup',

  // Media Events
  onAbort: 'abort',
  onCanPlay: 'canplay',
  onCanPlayThrough: 'canplaythrough',
  onDurationChange: 'durationchange',
  onEmptied: 'emptied',
  onEncrypted: 'encrypted',
  onEnded: 'ended',
  onLoadedData: 'loadeddata',
  onLoadedMetadata: 'loadedmetadata',
  onLoadStart: 'loadstart',
  onPause: 'pause',
  onPlay: 'play',
  onPlaying: 'playing',
  onProgress: 'progress',
  onRateChange: 'ratechange',
  onSeeked: 'seeked',
  onSeeking: 'seeking',
  onStalled: 'stalled',
  onSuspend: 'suspend',
  onTimeUpdate: 'timeupdate',
  onVolumeChange: 'volumechange',
  onWaiting: 'waiting',

  // MouseEvents
  onClick: 'click',
  onContextMenu: 'contextmenu',
  onDoubleClick: 'doubleclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragEnter: 'dragenter',
  onDragExit: 'dragexit',
  onDragLeave: 'dragleave',
  onDragOver: 'dragover',
  onDragStart: 'dragstart',
  onDrop: 'drop',
  onMouseDown: 'mousedown',
  onMouseEnter: 'mouseenter',
  onMouseLeave: 'mouseleave',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',

  // Selection Events
  onSelect: 'select',

  // Touch Events
  onTouchCancel: 'touchcancel',
  onTouchEnd: 'touchend',
  onTouchMove: 'touchmove',
  onTouchStart: 'touchstart',

  // Pointer Events
  onPointerDown: 'pointerdown',
  onPointerMove: 'pointermove',
  onPointerUp: 'pointerup',
  onPointerCancel: 'pointercancel',
  onPointerEnter: 'pointerenter',
  onPointerLeave: 'pointerleave',
  onPointerOver: 'pointerover',
  onPointerOut: 'pointerout',

  // UI Events
  onScroll: 'scroll',

  // Wheel Events
  onWheel: 'wheel',

  // Animation Events
  onAnimationStart: 'animationstart',
  onAnimationEnd: 'animationend',
  onAnimationIteration: 'animationiteration',

  // Transition Events
  onTransitionEnd: 'transitionend',
}
