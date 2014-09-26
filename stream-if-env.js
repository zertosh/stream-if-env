/**
 * Create conditional object streams based on NODE_ENV
 */

'use strict';

var through = require('through2');

var slice = Array.prototype.slice;

function noop() {
  return through.obj();
}

function when(env, func) {
  var cond = process.env.NODE_ENV === env;
  if (typeof func === 'function') {
    return cond ? func.apply(null, slice.call(arguments, 2)) : noop();
  } else {
    return cond;
  }
}

function unless(env, func) {
  var cond = process.env.NODE_ENV !== env;
  if (typeof func === 'function') {
    return cond ? func.apply(null, slice.call(arguments, 2)) : noop();
  } else {
    return cond;
  }
}

module.exports.when = when;
module.exports.unless = unless;
