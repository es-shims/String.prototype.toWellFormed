'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringPrototypeToWellFormed() {
	var polyfill = getPolyfill();
	define(
		String.prototype,
		{ toWellFormed: polyfill },
		{ toWellFormed: function () { return String.prototype.toWellFormed !== polyfill; } }
	);
	return polyfill;
};
