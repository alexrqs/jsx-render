# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`jsx-render` is a tiny library that renders JSX directly to real DOM nodes (no virtual DOM, no React). Babel transpiles JSX with `pragma: 'dom'`, so `<div />` becomes `dom('div', ...)`, which returns an actual `HTMLElement`/`SVGElement`.

## Commands

- `npm test` — run all tests (AVA, with `browser-env` simulating the DOM). Runs eslint afterward via `posttest`.
- `npx ava test/test.dom.js --verbose` — run a single test file; add `--match '<title>'` for a single test.
- `npm run eslint` — lint `src/` (airbnb-base, no semicolons).
- `npm run build` — transpile `src/` to `lib/` with Babel AND build the UMD standalone bundle to `docs/jsx.js` via webpack.
- `npm run dev` — Babel watch mode (`src/` → `lib/`).
- `npm start` — webpack-dev-server serving `examples/`.

## Architecture

The core pipeline lives in `src/dom.js`. The default export `dom(element, attrs, ...children)` is the JSX pragma:

- String tags (`'div'`, `'svg'`) go to `createElements()`, which creates the DOM node (SVG namespace detected via `utils.isSVG`), appends children as a `DocumentFragment` (`utils.createFragmentFrom` — handles strings, numbers, arrays, nested nodes, and skips `false`/`null` for conditional rendering), then applies attrs. Special-cased attrs: `style` (object), `ref` (callback), `className`, `htmlFor`, `xlinkHref`, `dangerouslySetInnerHTML`, and any name in `src/synteticEvents.js` (mapped to `addEventListener`).
- Function tags (custom components) go to `composeToFunction()`, which merges `defaultProps` + props + children and calls the function — or, if the function has a `prototype.render`, instantiates it as a class (see `src/JSXComponent.js` base class). Components signal special behavior via sentinel return values: `'FRAGMENT'` (the `Fragment` export) returns a bare fragment of children; `'PORTAL'` (from `portalCreator(node)`) appends children to the portal target (default `document.body`) and leaves a comment node in place.

Supporting modules:

- `src/reduxish.js` — `withState(elements, store)` wires a component to a Redux-like store; on store change it re-renders and replaces the previous node via `isEqualNode` comparison (nodes are wrapped in a `<span ref>` to track the parent).
- `src/intercept.js` — cheerio-based test helper for inspecting rendered nodes (cheerio is an optionalDependency).
- `src/standalone.js` — entry point for the browser UMD bundle (`window.jsx` with `dom`, `Fragment`, `portalCreator`), built by webpack into `docs/jsx.js` (served via GitHub Pages).

Published entry point is `lib/dom.js` (Babel output of `src/dom.js`).

## Conventions

- Every version bump must come with a matching entry in `CHANGELOG.md` (Keep a Changelog format, newest first) and a `vX.Y.Z` git tag + GitHub release.

- Code style: Prettier (no semicolons, single quotes, trailing commas, 100 print width) enforced by husky pre-commit (`pretty-quick`); tests run on pre-push.
- Tests are JSX-heavy `.js` files in `test/`, transpiled through `@babel/register` using the root `.babelrc` (same `pragma: 'dom'`); the DOM comes from `browser-env` (`test/helpers/setup-browser-env.js`).
- `recipes/` contains usage docs (redux, class components, events, testing); `examples/` is a runnable demo app.
