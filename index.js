// inspired by async.waterfall but much simpler no bloat!
(function(global) {
  'use strict';

  // Array.isArray isn't universally available
  // so we borrow from lodash https://lodash.com/docs#isArray
  var _isArray = function(maybeArray){
    return Object.prototype.toString.call(maybeArray) === '[object Array]';
  };

  var iterator = function (tasks) {
    var callme = function (index) {
      var fn = function () {
        /* istanbul ignore else */
        if (tasks.length) {
          tasks[index].apply(null, arguments);
        }
        return fn.next();
      };
      fn.next = function () {
        return (index < tasks.length - 1) ? callme(index + 1) : null;
      };
      return fn;
    };
    return callme(0);
  };

  /**
   * ordenado accepts two parameters:
   * @param tasks - an array of functions to be executed in order
   * @param callback - the callback function that will be called once!
   */

  var ordenado = function (tasks, callback) {
    if(typeof callback !== 'function'){
      return new Error('Second argument to ordenado must be a callback function');
    }
    if (!_isArray(tasks)) {
      var e = new Error('First argument to ordenado must be an array of functions');
      return callback(e);
    }
    if (!tasks.length) {
      var er = new Error('ordenado expects at least one task (function) to run');
      return callback(er);
    }
    var wrap = function (iterator) {
      return function (err) {
        if (err) {
          callback.apply(err, arguments);
        } else {
          var args = Array.prototype.slice.call(arguments, 1);
          var next = iterator.next();
          if (next) {
            args.push(wrap(next));
          } else {
            args.push(callback);
          }
          setTimeout(function () {
            iterator.apply(null, args);
          },0);
        }
      };
    };
    wrap(iterator(tasks))();
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
