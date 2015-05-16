// inspired by Elan Shanker's async.waterfall
// simplified and tested
(function(global) {
  'use strict';

  // Array.isArray isn't universally available
  // so we borrow from lodash https://lodash.com/docs#isArray
  var _isArray = function(maybeArray){
    return Object.prototype.toString.call(maybeArray) === '[object Array]';
  };

  var iterator = function (tasks) {
    var makeCallback = function (index) {
      var fn = function () {
        /* istanbul ignore else */
        if (tasks.length) {
          tasks[index].apply(null, arguments);
        }
        return fn.next();
      };
      fn.next = function () {
        return (index < tasks.length - 1) ? makeCallback(index + 1): null;
      };
      return fn;
    };
    return makeCallback(0);
  };


  var ordenado = function (tasks, callback) {
    if(typeof callback !== 'function'){
      return new Error('Second argument to ordenado must be a callback function');
    }
    if (!_isArray(tasks)) {
      var err = new Error('First argument to ordenado must be an array of functions');
      return callback(err);
    }
    if (!tasks.length) {
      var err = new Error('ordenado expects at least one task (function) to run');
      return callback(err);
    }
    var wrapIterator = function (iterator) {
      return function (err) {
        // if (err) {
        //   callback.apply(null, arguments);
        //   callback = function () {};
        // } else {
          var args = Array.prototype.slice.call(arguments, 1);
          var next = iterator.next();
          if (next) {
            args.push(wrapIterator(next));
          } else {
            args.push(callback);
          }
          setTimeout(function () {
            iterator.apply(null, args);
          },0);
        // }
      };
    };
    wrapIterator(iterator(tasks))();
  };

  /**
   * export the module for node.js or browser!
   */
  /* istanbul ignore else */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ordenado;  // CommonJS/Node.js require()
  } else {
    global.ordenado = ordenado; // Browser <script>
  }
})(this);
