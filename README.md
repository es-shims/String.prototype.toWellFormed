# string.prototype.towellformed <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

An ESnext spec-compliant `String.prototype.toWellFormed` shim/polyfill/replacement that works as far down as ES3.

This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES3-supported environment and complies with the proposed [spec](https://tc39.es/proposal-is-usv-string/).

Because `String.prototype.toWellFormed` depends on a receiver (the `this` value), the main export takes the string to operate on as the first argument.

## Getting started

```sh
npm install --save string.prototype.towellformed
```

## Usage/Examples

```js
var toWellFormed = require('string.prototype.towellformed');
var assert = require('assert');

var leadingPoo = '\uD83D';
var trailingPoo = '\uDCA9';
var wholePoo = leadingPoo + trailingPoo;

var replacementChar = '\uFFFD';

assert.equal(toWellFormed(wholePoo), wholePoo);
assert.equal(toWellFormed(leadingPoo), replacementChar);
assert.equal(toWellFormed(trailingPoo), replacementChar);
```

```js
var toWellFormed = require('string.prototype.towellformed');
var assert = require('assert');
/* when String#toWellFormed is not present */
delete String.prototype.toWellFormed;
var shimmed = toWellFormed.shim();

assert.equal(shimmed, toWellFormed.getPolyfill());
assert.deepEqual(wholePoo.toWellFormed(), toWellFormed(wholePoo));
assert.deepEqual(leadingPoo.toWellFormed(), toWellFormed(leadingPoo));
assert.deepEqual(trailingPoo.toWellFormed(), toWellFormed(trailingPoo));
```

```js
var toWellFormed = require('string.prototype.towellformed');
var assert = require('assert');
/* when String#at is present */
var shimmed = toWellFormed.shim();

assert.equal(shimmed, String.prototype.toWellFormed);
assert.deepEqual(wholePoo.toWellFormed(), toWellFormed(wholePoo));
assert.deepEqual(leadingPoo.toWellFormed(), toWellFormed(leadingPoo));
assert.deepEqual(trailingPoo.toWellFormed(), toWellFormed(trailingPoo));
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/string.prototype.towellformed
[npm-version-svg]: https://versionbadg.es/es-shims/String.prototype.toWellFormed.svg
[deps-svg]: https://david-dm.org/es-shims/String.prototype.toWellFormed.svg
[deps-url]: https://david-dm.org/es-shims/String.prototype.toWellFormed
[dev-deps-svg]: https://david-dm.org/es-shims/String.prototype.toWellFormed/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/String.prototype.toWellFormed#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/string.prototype.towellformed.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/string.prototype.towellformed.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/string.prototype.towellformed.svg
[downloads-url]: https://npm-stat.com/charts.html?package=string.prototype.towellformed
[codecov-image]: https://codecov.io/gh/es-shims/String.prototype.toWellFormed/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/es-shims/String.prototype.toWellFormed/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/String.prototype.toWellFormed
[actions-url]: https://github.com/es-shims/String.prototype.toWellFormed/actions
