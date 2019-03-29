var ordenado = require('../');    // load the module
const test = require('tap').test; // see: github.com/dwyl/learn-tape

test("run module without callback function", function(t) {
  var expected = "Second argument to ordenado must be a callback function";
  var err = ordenado('dont supply callback function');
  t.equal(err.message, expected, 'Expected ERROR: '+ expected);
  t.end();
});

test("run module with string in place of tasks array", function(t) {

  var expected = "First argument to ordenado must be an array of functions";
  // exercise the function with a string instead of an array
  ordenado('this should fail array checks!', function callback(err, result) {
    // result now equals 'done'
    t.equal(err.message, expected, 'Expected ERROR: '+ expected);
    t.end();
  });

});

test("run module without any tasks (expect error message)", function(t) {
  // var done     = t.async(); // see: https://api.qunitjs.com/async/
  var expected = "ordenado expects at least one task (function) to run";

  // exercise the function without any tasks
  ordenado([], function callback(err, result) {
    t.equal(err.message, expected, 'Expected: '+ expected);
    t.end();
  });
});


test("Simulate error in one of the tasks", function(t) {
  var actual   = [];
  var expected = [ 'only one' ]; // only the first task succeeds

  // exercise the function
  ordenado([
    function(callback){
      actual.push('only one');
      callback(null, 'only one');
    },
    function(arg, callback){
      var err = new Error('second task failed');
      return callback(err);
    },
    function(arg1, callback){
      // this task will never get run!
      actual.push('this will never get pushed');
      callback(null, 'second task failed so this never runs!');
    }
  ], function callback(err, result) {
    // result now equals 'done'
    // console.log(err);
    t.equal(err.message, 'second task failed', 'Second task failed (as expected!)');
    t.deepEqual(actual, expected, 'Expected: Only one task succeeded');
    t.end();
  });
});


test("Results appear in the order we expect them", function(t) {
  var actual   = [];
  var expected = [ 'one', 'two', 'three' ];

  // exercise the function
  ordenado([
    function(callback){
      actual.push('one');
      callback(null, 'one', 'two');
    },
    function(arg1, arg2, callback){
      actual.push('two');
      callback(null, 'three');
    },
    function(arg1, callback){
      // arg1 now equals 'three'
      actual.push('three');
      callback(null, 'done');
    }
  ], function callback(err, result) {
    if(err) {
      console.log(err);
    }
    // result now equals 'done'
    for(i=0; i<actual.length; i++){
      t.equal(actual[i],expected[i], 'Result '+i+1 +' is ' + actual[i] +' | expected: '+ expected[i]);
    }
    t.end();
  });

});
