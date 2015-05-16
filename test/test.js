var ordenado = require('../');            // load the module
var QUnit    = require('qunitjs');        // require QUnit and all its friends
require('qunit-tap')(QUnit, console.log); // tell qunit-tap to use console.log for test output

test("run module without callback function", function(assert) {
  var expected = "Second argument to ordenado must be a callback function";
  var err = ordenado('dont supply callback function');
  assert.equal(err.message, expected, 'Expected ERROR: '+ expected);
});

test("run module with string in place of tasks array", function(assert) {

  var expected = "First argument to ordenado must be an array of functions";
  // exercise the function with a string instead of an array
  ordenado('this should fail array checks!', function callback(err, result) {
    // result now equals 'done'
    assert.equal(err.message, expected, 'Expected ERROR: '+ expected);
  });

});

test("run module without any tasks (expect error message)", function(assert) {
  // var done     = assert.async(); // see: https://api.qunitjs.com/async/
  var expected = "ordenado expects at least one task (function) to run";

  // exercise the function without any tasks
  ordenado([], function callback(err, result) {
    assert.equal(err.message, expected, 'Expected: '+ expected);
    // done();
  });
});


test("Simulate error in one of the tasks", function(assert) {
  var done     = assert.async(); // see: https://api.qunitjs.com/async/
  var actual   = [];
  var expected = [ 'one' ]; // only the first task succeeds

  // exercise the function
  ordenado([
    function(callback){
      actual.push('one');
      callback(null, 'one', 'two');
    },
    function(err, arg, callback){
      var err = new Error('second task failed');
      return callback(err);
    },
    function(arg1, callback){
      // this should never get run!
      actual.push('three');
      callback(null, 'done');
    }
  ], function callback(err, result) {
    // result now equals 'done'
    // console.log(err);
    assert.equal(err.message, 'second task failed', 'Second task failed (as expected!)')
    assert.deepEqual(actual, expected, 'Expected: Only one task succeeded')
    done();
  });
});


test("Results appear in the order we expect them", function(assert) {
  var done     = assert.async(); // see: https://api.qunitjs.com/async/
  var actual   = [];
  var expected = [ 'one', 'two', 'three' ];

  function check() {
    for(i=0; i<actual.length; i++){
      assert.equal(actual[i],expected[i], ''+i + ' is ' + actual[i] +' | expected: '+ expected[i]);
    }
  }

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
    // result now equals 'done'
    check();
    done()
  });

});

QUnit.load(); // run our test suite.
