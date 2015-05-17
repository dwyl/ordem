# ordenado
[![Build Status](https://travis-ci.org/dwyl/ordenado.svg)](https://travis-ci.org/dwyl/ordenado)
[![Code Climate](https://codeclimate.com/github/dwyl/ordenado/badges/gpa.svg)](https://codeclimate.com/github/dwyl/ordenado)
[![Test Coverage](https://codeclimate.com/github/dwyl/ordenado/badges/coverage.svg)](https://codeclimate.com/github/dwyl/ordenado/coverage)
[![Dependency Status](https://david-dm.org/dwyl/ordenado.svg)](https://david-dm.org/dwyl/ordenado)
[![devDependency Status](https://david-dm.org/dwyl/ordenado/dev-status.svg)](https://david-dm.org/dwyl/ordenado#info=devDependencies)
[![bitHound Score](https://www.bithound.io/github/dwyl/ordenado/badges/score.svg)](https://www.bithound.io/github/dwyl/ordenado)


![ducks-in-a-row](http://i.imgur.com/K6kGr3M.jpg)

***ordenado*** is a ***synchronous*** (ordered) **task runner** for Node.js and Browser  
... *for when you need to have* "***all your ducks in a row***".


## Why?

JavaScript is ***synchronous*** *and* ***single-threaded***, but when multiple
statements are called in succession,  
**results** ***can*** **be returned** in an
***unexpected order***
 ... Often we need to run a sequence of tasks in a *specific* order.

We wrote this for [**alvo**](https://github.com/dwyl/alvo) our ***automated browser test runner***. But its *useable* ***anywhere that runs JavaScript***!

## What?

Lets you run a series of JavaScript functions/methods in a specific order and then execute a callback (*once*) at the end.

***Tested*** in **node.js** [![Build Status](https://travis-ci.org/dwyl/ordenado.svg)](https://travis-ci.org/dwyl/ordenado) [![Node version](https://img.shields.io/node/v/ordenado.svg?style=flat)](http://nodejs.org/download/)
 [![npm version](https://badge.fury.io/js/ordenado.svg)](http://badge.fury.io/js/ordenado)

and ***ALL teh Devices/Browsers*** via
[***SauceLabs***](https://github.com/docdis/learn-saucelabs)
[![Sauce Test Status](https://docs.saucelabs.com/images/reference/status-images/status-passing.3a137816.png)](https://saucelabs.com/u/ordenado)

Try it yourself: https://ordenado.herokuapp.com/


## How?

### install from npm

```sh
npm install ordenado --save-dev
```

### Usage

#### Node.js

```js
var ordenado = require('ordenado'); // load the module

ordenado([
  function(callback){
    // perform the first task
    callback(null, 'one');
  },
  function(arg1, arg2, callback){
    // perform second task
    callback(null, 'two');
  },
  function(callback){
    // perform third task, etc.
    callback(null, 'done');
  }
], function callback(err, result) {
  // result now equals 'done'
  // callback only gets called once!
});
```

#### Browser

**Tip**: don't try to load the script directly from GitHub (they don't like that...) instead use https://raw.githubusercontent.com/dwyl/ordenado/master/index.js


in your html:

```js
<script src="https://raw.githubusercontent.com/dwyl/ordenado/master/index.js"> </script>

<script>
  ordenado([
    function(callback){
      // perform the first task
      callback(null, 'one');
    },
    function(arg1, arg2, callback){
      // perform second task
      callback(null, 'two');
    },
    function(callback){
      // perform third task, etc.
      callback(null, 'done');
    }
  ], function callback(err, result) {
    // result now equals 'done'
    // callback only gets called once!
  });
</script>
```


see: example/**index.html** for ***copy-pasteable example code***.

<br />
<br />

# tl;dr

## Background Reading

+ When is JavaScript Synchronous?
http://stackoverflow.com/questions/2035645/when-is-javascript-synchronous
+ Is javascript guaranteed to be single-threaded?
http://stackoverflow.com/questions/2734025/is-javascript-guaranteed-to-be-single-threaded
+ IIFE with global 'this':
http://stackoverflow.com/questions/10314891/how-to-use-functionglobal-this
+ What is the difference between call and apply?
http://stackoverflow.com/questions/1986896/what-is-the-difference-between-call-and-apply
+ what is the difference in throw new Error and throw(object):  http://stackoverflow.com/questions/9156176/javascript-what-is-the-difference-in-throw-new-error-and-throwobject
+ Which Async Javascript Libraries Should I Use? https://www.airpair.com/javascript/posts/which-async-javascript-libraries-should-i-use ( a better *first* question would be: when do I need to run tasks asynchronously...? )

## Name?

All the "good" names are taken.  
So we used the Portuguese/Spanish word for "*orderly*"
see: https://translate.google.com/#auto/en/ordenado
