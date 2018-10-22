// eslint-disable-next-line
import cheerio from 'cheerio'

class Intercept {
  constructor(nodes) {
    this.nodes = nodes
    this.$ = cheerio.load(nodes.outerHTML)

    this.childAt = this.childAt.bind(this)
  }

  childAt() {
    return this.$(this.nodes.outerHTML)
      .get(0)
      .text()
  }

  find(selector) {
    const findAPI = {
      html: () => this.$.html(selector),
    }

    return findAPI
  }

  hasClass(className, context) {
    return this.$(context || '*').hasClass(className)
  }

  html() {
    return this.nodes.outerHTML
  }

  get RAW() {
    return this.$
  }
}

export default Intercept
