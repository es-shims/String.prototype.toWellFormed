'use strict';

var v = require('es-value-fixtures');
var forEach = require('for-each');
var inspect = require('object-inspect');
var mockProperty = require('mock-property');
var hasSymbols = require('has-symbols')();
var hasBigInts = require('has-bigints')();

var SymbolDescriptiveString = require('es-abstract/2023/SymbolDescriptiveString');

var leadingPoo = '\uD83D';
var trailingPoo = '\uDCA9';
var wholePoo = leadingPoo + trailingPoo;

var replacementChar = '\uFFFD';

module.exports = function (toWellFormed, t) {
	t.test('does not call prototype toString methods on primitives', function (st) {
		st.teardown(mockProperty(Boolean.prototype, 'toString', function fakeToString() {
			st.fail('Boolean.prototype.toString should not be called');
		}));
		st.teardown(mockProperty(Number.prototype, 'toString', function fakeToString() {
			st.fail('Number.prototype.toString should not be called');
		}));
		if (hasBigInts) {
			st.teardown(mockProperty(BigInt.prototype, 'toString', function fakeToString() {
				st.fail('BigInt.prototype.toString should not be called');
			}));
		}
		if (hasSymbols) {
			st.teardown(mockProperty(Symbol.prototype, 'toString', function fakeToString() {
				st.fail('Symbol.prototype.toString should not be called');
			}));
		}

		forEach(v.nonNullPrimitives, function (nonNullPrimitive) {
			if (typeof nonNullPrimitive === 'symbol') {
				st['throws'](
					function () { toWellFormed(nonNullPrimitive); },
					inspect(nonNullPrimitive) + ' throws when implicitly coerced to a string, and does not call the proto method'
				);
			} else if (typeof nonNullPrimitive !== 'string') {
				st.equal(toWellFormed(nonNullPrimitive), String(nonNullPrimitive), inspect(nonNullPrimitive) + ' stringifies without calling the proto method');
			}
		});

		st.end();
	});

	t.test('well-formed strings', function (st) {
		forEach(v.nonStrings.concat(
			v.strings,
			wholePoo, // a concatenated surrogate pair
			'abc', // a latin-1 string
			'a💩c', // a surrogate pair using a literal code point
			'a\uD83D\uDCA9c', // a surrogate pair formed by escape sequences
			'a' + leadingPoo + trailingPoo + 'd', // a surrogate pair formed by concatenation
			'a\u25A8c' // a non-ASCII character
		), function (value) {
			if (value != null) { // eslint-disable-line eqeqeq
				var string = typeof value === 'symbol' ? SymbolDescriptiveString(value) : String(value);
				st.equal(
					toWellFormed(string),
					string,
					inspect(string) + ' (from ' + inspect(value) + ') is well-formed'
				);
			}
		});

		st.end();
	});

	t.test('not well-formed strings', function (st) {
		forEach([
			[leadingPoo, replacementChar, 'a string with a leading surrogate but no trailing surrogate'],
			[trailingPoo, replacementChar, 'a string with a trailing surrogate but no leading surrogate'],
			['a' + leadingPoo + 'c' + leadingPoo + 'e', 'a' + replacementChar + 'c' + replacementChar + 'e', 'leading lone surrogates'],
			['a' + trailingPoo + 'c' + trailingPoo + 'e', 'a' + replacementChar + 'c' + replacementChar + 'e', 'trailing lone surrogates'],
			['a' + trailingPoo + leadingPoo + 'd', 'a' + replacementChar + replacementChar + 'd', 'a wrong-ordered surrogate pair'],
			[wholePoo.slice(0, 1), replacementChar, 'a surrogate pair sliced to the leading surrogate'],
			[wholePoo.slice(1), replacementChar, 'a surrogate pair sliced to the trailing surrogate is not well-formed']
		], function (arr) {
			var str = arr[0];
			var exp = arr[1];
			var msg = arr[2];

			st.equal(toWellFormed(str), exp, msg + ' is not well-formed, and lone surrogates are replaced as expected');
		});

		st.end();
	});
};
