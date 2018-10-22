## How to test

Well well well... jsx-render includes a way to test now, it has similar methods to enzyme but not all, is starting and it will grow depending on the needs.

### Usage

- To test you need to install `cheerio` actually is an optional dependency, `npm i -D cheerio`.

```jsx
import Intercept from 'jsx-render/lib/intercept'
import test from 'ava'

test('test case', t => {
  const wrapper = new Intercept(<div />)

  t.is(wrapper.html(), '<div></div>')
})
```

### .html()

Returns the raw HTML of the wrapper

### .find(selector)

Keeps the selector passed like `.cssClass` or `tag` to be used later with HTML; e.g. `wrapper.find('.cssClass').html()`

### .hasClass(cssClass, context)

Useful to know if the wrapper or some context inside the wrapper contains a given class, for more info check the test cases.
