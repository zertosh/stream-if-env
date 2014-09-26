/* jshint mocha: true */

'use strict';

require('tape')('stream-if-env', function(t) {

  var when = require('../').when;
  var unless = require('../').unless;

  t.test('exports', function(t) {
    t.equal(typeof when, 'function', 'should export "when"');
    t.equal(typeof unless, 'function', 'should export "unless"');
    t.end();
  });

  t.test('boolean with "when"', function(t) {
    t.equal(when(process.env.NODE_ENV), true, 'should be true for current NODE_ENV');
    t.equal(when(process.env.NODE_ENV+'_'), false, 'should be false for different NODE_ENV');
    t.end();
  });

  t.test('boolean with "unless"', function(t) {
    t.equal(when(process.env.NODE_ENV), true, 'should be true for current NODE_ENV');
    t.equal(when(process.env.NODE_ENV+'_'), false, 'should be false for different NODE_ENV');
    t.end();
  });

  t.test('boolean with "unless"', function(t) {
    t.equal(unless(process.env.NODE_ENV), false, 'should be false for current NODE_ENV');
    t.equal(unless(process.env.NODE_ENV+'_'), true, 'should be true for different NODE_ENV');
    t.end();
  });

  t.test('function with "when"', function(t) {
    t.plan(1);
    function func(a, b, c) {
      t.deepEqual([a, b, c], [1, 2, 3], 'should have correct arguments');
    }
    when(process.env.NODE_ENV, func, 1, 2, 3);
  });

  t.test('noop stream with "when"', function(t) {
    var stream = when(process.env.NODE_ENV+'_', function func(){});
    t.ok(isStream(stream), 'should return noop stream');
    t.end();
  });

  t.test('function with "unless"', function(t) {
    t.plan(1);
    function func(a, b, c) {
      t.deepEqual([a, b, c], [1, 2, 3], 'should have correct arguments');
    }
    unless(process.env.NODE_ENV+'_', func, 1, 2, 3);
  });

  t.test('noop stream with "unless"', function(t) {
    var stream = unless(process.env.NODE_ENV, function func(){});
    t.ok(isStream(stream), 'should return noop stream');
    t.end();
  });

  t.end();
});

function isStream(obj) {
  return obj && typeof obj.pipe === 'function';
}
