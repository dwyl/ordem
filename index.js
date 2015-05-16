// MIT license (by Elan Shanker) >> adapted from + comments added by us
(function(global) {
  'use strict';

  var makeIterator = function (tasks) {
    var makeCallback = function (index) {
      var fn = function () {
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

  var _isArray = Array.isArray || function(maybeArray){
    return Object.prototype.toString.call(maybeArray) === '[object Array]';
  };

  var ordenado = function (tasks, callback) {
    callback = callback || function () {};
    if (!_isArray(tasks)) {
      var err = new Error('First argument to ordenado must be an array of functions');
      return callback(err);
    }
    if (!tasks.length) {
      return callback();
    }
    var wrapIterator = function (iterator) {
      return function (err) {
        if (err) {
          callback.apply(null, arguments);
          callback = function () {};
        } else {
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
        }
      };
    };
    wrapIterator(makeIterator(tasks))();
  };

  /**
   * export the module for various platforms
   */
  if (typeof define !== 'undefined' && define.amd) {
    define([], function () {
      return ordenado;
    }); // RequireJS
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = ordenado; // CommonJS
  } else {
    global.asyncordenado = ordenado; // <script> (browser)
  }
})(this);
