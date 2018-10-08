const MOUSE_EVENTS = [
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
]

const TOUCH_EVENTS = ['onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart']

const KEYBOARD_EVENTS = ['onKeyDown', 'onKeyPress', 'onKeyUp']

const FOCUS_EVENTS = ['onFocus', 'onBlur']

const FORM_EVENTS = ['onChange', 'onInput', 'onInvalid', 'onSubmit']

const UI_EVENTS = ['onScroll']

const IMAGE_EVENTS = ['onLoad', 'onError']

const synteticEvents = [
  ...MOUSE_EVENTS,
  ...TOUCH_EVENTS,
  ...KEYBOARD_EVENTS,
  ...FOCUS_EVENTS,
  ...FORM_EVENTS,
  ...UI_EVENTS,
  ...IMAGE_EVENTS,
]

export default synteticEvents
