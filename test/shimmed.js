'use strict';

require('../auto');

var test = require('tape');
var defineProperties = require('define-properties');
var callBind = require('call-bind');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();
var hasStrictMode = require('has-strict-mode')();

var runTests = require('./tests');

test('shimmed', function (t) {
	t.equal(String.prototype.toWellFormed.length, 0, 'String#toWellFormed has a length of 0');
	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(String.prototype.toWellFormed.name, 'toWellFormed', 'String#toWellFormed has name "toWellFormed"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(false, isEnumerable.call(String.prototype, 'toWellFormed'), 'String#toWellFormed is not enumerable');
		et.end();
	});

	t.test('bad receiver', { skip: !hasStrictMode }, function (st) {
		st['throws'](function () { return String.prototype.toWellFormed.call(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return String.prototype.toWellFormed.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(callBind(String.prototype.toWellFormed), t);

	t.end();
});
