# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2026-08-07

### Fixed

- `onDoubleClick` now listens to the real DOM event `dblclick`; previously it
  subscribed to a non-existent `doubleclick` event and never fired.
- `false`, `null` and `undefined` attribute values are no longer stringified
  into attributes — `<button disabled={false} />` no longer renders a disabled
  button. `true` renders as an empty attribute (`<button disabled>`).
- `isSVG` recognized only `path`, `svg`, `use` and `g`; all SVG-only tags
  (`circle`, `rect`, `line`, `text`, gradients, filters, etc.) are now created
  in the SVG namespace. Names that exist in both HTML and SVG (`a`, `title`,
  `style`, `script`) still resolve to HTML elements.
- `Text` nodes passed as children were silently dropped; any DOM `Node` child
  is now appended.
- Arrow-function components crashed on modern build targets because
  `Function.prototype` is undefined for arrows (`Cannot read properties of
undefined (reading 'render')`).
- `Intercept#childAt()` always threw: cheerio's `.get(0)` returns a raw DOM
  node without `.text()`; it now uses `.eq(0)`.
- `withState`'s `updateElement` replaced `parent.firstChild` instead of the
  previous node it was given.
- The unknown-element error message interpolated an undefined variable.
- `npm run build` ran Babel and webpack in parallel (`&`), racing against each
  other; they now run sequentially.
- Local installs no longer fail when `NPM_TOKEN` is unset (removed the auth
  token line from `.npmrc`).

### Changed

- Modernized the toolchain: webpack 4 → 5 (fixes the OpenSSL
  `error:0308010C` on Node 17+), AVA 1 → 6, ESLint 5 → 8 with
  airbnb-base 15, Prettier 1 → 3, husky 2 → 9 (hooks moved to `.husky/`),
  cheerio to 1.0 final, latest Babel 7.
- Replaced the dead Travis CI setup with GitHub Actions (Node 18/20/22).
- Publish checks moved from `prepare`/`prepublish` to `prepublishOnly`.
- Repository URLs updated after the account rename (`alecsgone` → `alexrqs`).

### Security

- Merged Dependabot updates for transitive dependencies: minimist 1.2.8,
  express 4.18.2, qs 6.5.3, decode-uri-component 0.2.2, css-what 2.1.3,
  terser 4.8.1, eventsource 1.1.1, js-yaml 3.14.1.

## [2.0.0-alpha.1] - 2018-12-30

Pre-release of an experimental server-side-rendering rewrite (`renderClient`
/ `renderServer`) on the `v2` branch. Never merged into master or published
as stable.

## [1.3.1] - 2019-07-04

### Added

- Test coverage for the `htmlFor` attribute.

## [1.3.0] - 2019-07-03

### Added

- Support for event listeners via `on*` props, e.g. `onClick` (#13).
- Support for the `htmlFor` attribute rendered as `for` (#12).
- Quick-start template and `/docs` folder for GitHub Pages.

## [1.2.0] - 2019-06-30

### Added

- Standalone browser bundle (`docs/jsx.js`) so JSX can render directly in the
  browser without a build step.

### Changed

- Updated dependencies.

## [1.1.2] - 2019-02-13

### Fixed

- Inline CSS bugs (#9).

### Added

- Testing recipe and `Intercept` helper with cheerio as an optional
  dependency.

## [1.1.1] - 2018-12-30

### Added

- `JSXComponent` base class with synthetic event binding.
- Class component validation via the `render` method.
- Linters, prepush hook, editor config, events documentation and class
  component recipe.

## [1.0.0] - 2018-10-06

### Added

- Class support for complex components.

### Changed

- Updated to Babel 7 with `babel-preset-primavera`.

## [0.6.6] - 2018-05-30

### Added

- `dangerouslySetInnerHTML` support for HTML elements (#5).

## [0.6.5] - 2018-05-30

### Fixed

- `.babelrc` location and publish issues; unknown-tag logging only happens in
  extreme cases instead of on every render.

## [0.6.3] - 2018-05-21

### Fixed

- IE11 strict-mode error when assigning read-only `style` properties.

## [0.6.2] - 2018-04-19

### Fixed

- Fragment rendering.

## [0.6.1] - 2018-04-20

### Added

- Build step on `prepublish`.

## [0.6.0] - 2018-04-19

### Added

- Portals, to render outside the parent node (`portalCreator`).

### Fixed

- Parent dependency for fragments to allow simple appends.

## [0.5.0] - 2018-04-19

### Added

- `defaultProps` support for components.

## [0.4.0] - 2018-03-28

### Added

- Icon support for SVG sprites (`xlinkHref`).

## [0.3.0] - 2018-03-19

### Changed

- Removed the lerna experiment and relocated the package to the repo root;
  added Travis CI and the `reduxish` state helper.

## [0.2.0] - 2018-03-17

### Added

- First test suite; sources moved to `src/`; redux example approach.

## [0.1.3] - 2018-03-15

### Added

- `children` passed as a prop key, props on actionable elements, descriptive
  error for unrecognized tags, `ref` optimization.

## [0.1.2] - 2018-03-11

### Added

- Inline style support (`style={{ ... }}`) and SVG append support.

## [0.1.1] - 2018-03-06

### Changed

- README updates.

## [0.1.0] - 2018-03-06

### Added

- Initial release: the `dom` function to render JSX into real DOM nodes,
  fragments, refs, and rendering of mapped arrays and numbers.

[1.4.0]: https://github.com/alexrqs/jsx-render/compare/v1.3.1...v1.4.0
[2.0.0-alpha.1]: https://github.com/alexrqs/jsx-render/releases/tag/v2.0.0-alpha.1
[1.3.1]: https://github.com/alexrqs/jsx-render/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/alexrqs/jsx-render/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/alexrqs/jsx-render/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/alexrqs/jsx-render/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/alexrqs/jsx-render/compare/v1.0.0...v1.1.1
[1.0.0]: https://github.com/alexrqs/jsx-render/compare/v0.6.6...v1.0.0
[0.6.6]: https://github.com/alexrqs/jsx-render/compare/v0.6.5...v0.6.6
[0.6.5]: https://github.com/alexrqs/jsx-render/compare/v0.6.3...v0.6.5
[0.6.3]: https://github.com/alexrqs/jsx-render/compare/v0.6.2...v0.6.3
[0.6.2]: https://github.com/alexrqs/jsx-render/compare/v0.6.1...v0.6.2
[0.6.1]: https://github.com/alexrqs/jsx-render/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/alexrqs/jsx-render/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/alexrqs/jsx-render/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/alexrqs/jsx-render/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/alexrqs/jsx-render/compare/jsx-render@0.2.0...v0.3.0
[0.2.0]: https://github.com/alexrqs/jsx-render/compare/jsx-render@0.1.4...jsx-render@0.2.0
[0.1.3]: https://github.com/alexrqs/jsx-render/compare/jsx-render@0.1.2...jsx-render@0.1.3
[0.1.2]: https://github.com/alexrqs/jsx-render/compare/jsx-render@0.1.1...jsx-render@0.1.2
[0.1.1]: https://github.com/alexrqs/jsx-render/compare/jsx-render@0.1.0...jsx-render@0.1.1
[0.1.0]: https://github.com/alexrqs/jsx-render/releases/tag/jsx-render@0.1.0
