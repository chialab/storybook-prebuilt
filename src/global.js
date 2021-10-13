import 'regenerator-runtime/runtime';

function check(it) {
    return it && it.Math == Math && it;
}

const globalVar =
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    check(typeof self == 'object' && self) ||
    check(typeof global == 'object' && global) ||
    (function() { return this; })() || Function('return this')();


globalVar.module = {};
globalVar.FEATURES = {};

export { globalVar as window };
export default globalThis;
