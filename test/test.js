var ordenado = require('../');            // load the module
var QUnit    = require('qunitjs');        // require QUnit and all its friends
require('qunit-tap')(QUnit, console.log); // tell qunit-tap to use console.log for test output

test("run module without callback function", function(assert) {
  var expected = "Second argument to ordenado must be a callback function";
  var err = ordenado('dont supply callback function');
  assert.equal(err.message, expected, 'Expected ERROR: '+ expected);
});

test("run module with string in place of tasks array", function(assert) {
  var done     = assert.async(); // see: https://api.qunitjs.com/async/
  var expected = "First argument to ordenado must be an array of functions";

  function check(err) {
    assert.equal(err.message, expected, 'Expected ERROR: '+ expected);
    done();
  }

  function callback(){
    console.log(arguments);
  }
  // exercise the function with a string instead of an array
  ordenado('this should fail array checks!', function (err, result) {
    // result now equals 'done'
    check(err);
    callback(err, result);
  });
});

test("run module without any tasks (expect error message)", function(assert) {
  var done     = assert.async(); // see: https://api.qunitjs.com/async/
  var expected = "ordenado expects at least one task (function) to run";

  function check(err) {
    assert.equal(err.message, expected, ' expected: '+ expected);
    done();
  }

  function callback(){
    console.log(arguments);
  }
  // exercise the function without any tasks
  ordenado([], function (err, result) {
    // result now equals 'done'
    check(err);
    callback(err, result);
  });
});

test("run module without any tasks (expect error message)", function(assert) {
  var done     = assert.async(); // see: https://api.qunitjs.com/async/
  var expected = "ordenado expects at least one task (function) to run";

  function check(err) {
    assert.equal(err.message, expected, ' expected: '+ expected);
    done();
  }

  function callback(){
    console.log(arguments);
  }
  // exercise the function without any tasks
  ordenado([], function (err, result) {
    // result now equals 'done'
    check(err);
    callback(err, result);
  });
});

test("Simulate error in one of the tasks", function(assert) {
  var done     = assert.async(); // see: https://api.qunitjs.com/async/
  var actual   = [];
  var expected = [ 'one', 'two', 'three' ];

  function check() {
    for(i=0; i<actual.length; i++){
      assert.equal(actual[i],expected[i], ''+i + ' is ' + actual[i] +' | expected: '+ expected[i]);
    }
    done();
  }

  function callback(err, etc){
    console.log(arguments);
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
  ], function (err, result) {
    // result now equals 'done'
    check();
    callback(err, result);
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
    done();
  }

  function callback(err, etc){
    console.log(arguments);
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
  ], function (err, result) {
    // result now equals 'done'
    check();
    callback(err, result);
  });

});

// math operator presedence test?



QUnit.load(); // run our test suite.
