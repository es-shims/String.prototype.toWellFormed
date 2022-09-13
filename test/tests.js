'use strict';

var v = require('es-value-fixtures');
var forEach = require('for-each');
var inspect = require('object-inspect');

var SymbolDescriptiveString = require('es-abstract/2022/SymbolDescriptiveString');

var leadingPoo = '\uD83D';
var trailingPoo = '\uDCA9';
var wholePoo = leadingPoo + trailingPoo;

var replacementChar = '\uFFFD';

module.exports = function (toWellFormed, t) {
	t.test('well-formed strings', function (st) {
		forEach(v.nonStrings.concat(v.strings, wholePoo), function (value) {
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
		st.equal(
			toWellFormed(leadingPoo),
			replacementChar,
			'a string with a leading surrogate but no trailing surrogate has the lone surrogate replaced as expected'
		);
		st.equal(
			toWellFormed(trailingPoo),
			replacementChar,
			'a string with a trailing surrogate but no leading surrogate has the lone surrogate replaced as expected'
		);

		st.end();
	});
};
