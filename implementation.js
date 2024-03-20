'use strict';

var CodePointAt = require('es-abstract/2024/CodePointAt');
// var UTF16EncodeCodePoint = require('es-abstract/2023/UTF16EncodeCodePoint');
var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');
var ToString = require('es-abstract/2024/ToString');

module.exports = function toWellFormed() {
	var O = RequireObjectCoercible(this); // step 1
	var S = ToString(O); // step 2
	var strLen = S.length; // step 3
	var k = 0; // step 4
	var result = ''; // step 5
	while (k < strLen) { // step 6
		var cp = CodePointAt(S, k); // step 6.a
		if (cp['[[IsUnpairedSurrogate]]']) { // step 6.b
			result += '\uFFFD'; // step 6.b.i
		} else { // step 6.c
			result += cp['[[CodePoint]]']; // UTF16EncodeCodePoint(cp['[[CodePoint]]']); // step 6.c.i
		}
		k += cp['[[CodeUnitCount]]']; // step 6.d
	}
	return result; // step 7
};
