# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`jsx-render` is a tiny library that renders JSX directly to real DOM nodes (no virtual DOM, no React). Babel transpiles JSX with `pragma: 'dom'`, so `<div />` becomes `dom('div', ...)`, which returns an actual `HTMLElement`/`SVGElement`.

## Commands

Development requires Node >= 20 (AVA 6's transitive deps demand it; CI tests on 20 and 22).

- `npm test` — run all tests (AVA 6, DOM simulated by `browser-env`). Runs eslint afterward via `posttest`.
- `npx ava test/test.dom.js` — run a single test file; add `--match '<title>'` for a single test. Test files live in `test/test.*.js` (configured in the `ava` key of package.json).
- `npm run eslint` — lint `src/` (ESLint 8, airbnb-base, no semicolons).
- `npm run build` — transpile `src/` to `lib/` with Babel, then build the UMD standalone bundle to `docs/jsx.js` with webpack 5.
- `npm run dev` — Babel watch mode (`src/` → `lib/`).
- `npm start` — webpack-dev-server serving `examples/`.

## Architecture

The core pipeline lives in `src/dom.js`. The default export `dom(element, attrs, ...children)` is the JSX pragma:

- String tags (`'div'`, `'svg'`) go to `createElements()`, which creates the DOM node (SVG namespace decided by the tag whitelist in `utils.isSVG` — dual HTML/SVG names like `a`/`title`/`style` intentionally resolve to HTML), appends children as a `DocumentFragment` (`utils.createFragmentFrom` — handles strings, numbers, arrays, any DOM `Node`, and skips `false`/`null` for conditional rendering), then applies attrs. Special-cased attrs: `style` (object), `ref` (callback), `className`, `htmlFor`, `xlinkHref`, `dangerouslySetInnerHTML`, any name in `src/synteticEvents.js` (mapped to `addEventListener`; `onDoubleClick` maps to `dblclick`), and boolean semantics: `false`/`null`/`undefined` values are skipped, `true` renders as an empty attribute.
- Function tags (custom components) go to `composeToFunction()`, which merges `defaultProps` + props + children and calls the function — or, if the function has a `prototype.render`, instantiates it as a class (see `src/JSXComponent.js` base class; guard the `prototype` access — arrow functions have none). Components signal special behavior via sentinel return values: `'FRAGMENT'` (the `Fragment` export) returns a bare fragment of children; `'PORTAL'` (from `portalCreator(node)`) appends children to the portal target (default `document.body`) and leaves a comment node in place.

Supporting modules:

- `src/reduxish.js` — `withState(elements, store)` wires a component to a Redux-like store; on store change it re-renders and replaces the previous node via `isEqualNode` comparison (nodes are wrapped in a `<span ref>` to track the parent).
- `src/intercept.js` — cheerio-based test helper for inspecting rendered nodes (cheerio is an optionalDependency).
- `src/standalone.js` — entry point for the browser UMD bundle (`window.jsx` with `dom`, `Fragment`, `portalCreator`), built by webpack into `docs/jsx.js` (served via GitHub Pages).

Published entry point is `lib/dom.js` (Babel output of `src/dom.js`).

## Conventions

- Every version bump must come with a matching entry in `CHANGELOG.md` (Keep a Changelog format, newest first), a `vX.Y.Z` git tag, and a GitHub release. Rebuild `docs/jsx.js` (`npm run build`) before tagging so the standalone bundle ships the release code.
- Code style: Prettier 3 (no semicolons, single quotes, trailing commas, 100 print width) enforced by husky pre-commit (`pretty-quick --staged` in `.husky/`); tests run on pre-push. Hooks need `node` on PATH — lazy-loaded nvm setups may need it exported for non-interactive shells.
- Tests are JSX-heavy `.js` files in `test/`, transpiled through `@babel/register` using the root `.babelrc` (same `pragma: 'dom'`); the DOM comes from `browser-env` (`test/helpers/setup-browser-env.js`). Bug fixes get regression tests in `test/test.bugs.js`.
- CI is GitHub Actions (`.github/workflows/test.yml`): `yarn install --frozen-lockfile`, `npm test`, `npm run build` on Node 20/22.
- `recipes/` contains usage docs (redux, class components, events, testing); `examples/` is a runnable demo app with its own stale package.json — don't modernize it as part of root dependency work.
- npm publishing runs tests + build via `prepublishOnly`. `.npmrc` must not contain an `NPM_TOKEN` line (it breaks installs when the env var is unset).
