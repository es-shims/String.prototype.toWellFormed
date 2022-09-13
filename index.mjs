import callBind from 'call-bind';
import RequireObjectCoercible from 'es-abstract/2022/RequireObjectCoercible.js';

import getPolyfill from 'string.prototype.towellformed/polyfill';

const bound = callBind(getPolyfill());

export default function toWellFormed(string) {
	RequireObjectCoercible(string);
	return bound(string);
}

export { default as getPolyfill } from 'string.prototype.towellformed/polyfill';
export { default as implementation } from 'string.prototype.towellformed/implementation';
export { default as shim } from 'string.prototype.towellformed/shim';
