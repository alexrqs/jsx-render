module.exports = {
  extends: 'airbnb-base',

  globals: {
    document: true,
    HTMLElement: true,
    SVGElement: true,
    Comment: true,
    DocumentFragment: true,
    Node: true,
  },

  rules: {
    semi: [2, 'never'],
    'arrow-parens': [2, 'as-needed'],
    'operator-linebreak': 'off',
    // prettier owns line-breaking decisions
    'object-curly-newline': 'off',
  },
}
