var order    = require('../');
var assert   = require('assert');
var actual   = [];
var expected = [ 'one', 'two', 'three' ];

function callback(err, first, second){
  console.log(err, first, second);
}

order([
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
  console.log(err, result);
  check();
});

var check = function(){
  for(i=0; i<actual.length; i++){
    assert.equal(actual[i],expected[i], '>'+i);
  }
  console.log(actual);
}
