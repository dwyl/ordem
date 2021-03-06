# ordem - ordered task runner

[![Build Status](https://img.shields.io/travis/dwyl/ordem/master.svg?style=flat-square)](https://travis-ci.org/dwyl/ordem)
[![codecov.io](https://img.shields.io/codecov/c/github/dwyl/ordem/master.svg?style=flat-square)](http://codecov.io/github/dwyl/ordem?branch=master)
[![Dependencies: None!](https://david-dm.org/dwyl/ordem/status.svg?style=flat-square)](https://david-dm.org/dwyl/ordem)
[![devDependencies Status](https://david-dm.org/dwyl/ordem/dev-status.svg?style=flat-square)](https://david-dm.org/dwyl/ordem?type=dev)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/dwyl/ordem/issues)
[![HitCount](http://hits.dwyl.io/dwyl/ordem.svg)](http://hits.dwyl.io/dwyl/ordem)


![ducks-in-a-row](http://i.imgur.com/K6kGr3M.jpg)

***ordem*** is a ***synchronous*** (ordered)
**task runner** for Node.js and Client web applications
for when you need to run a list of functions in a specific order.


## Why?

JavaScript is ***synchronous*** *and* ***single-threaded***, but when multiple
statements are called in succession,  
**results** ***can*** **be returned** in an
***unexpected order***
 ... Often we need to run a sequence of tasks in a *specific* order.

## What?

Lets you run a series of JavaScript functions/methods in a specific order and then execute a callback (*once*) at the end.


## How?

### install from npm

```sh
npm install ordem --save-dev
```

### Usage

#### Node.js

```js
var ordem = require('ordem'); // load the module

ordem([
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

**Tip**: don't try to load the script directly from GitHub (they don't like that...) instead use https://raw.githubusercontent.com/dwyl/ordem/master/index.js


in your html:

```js
<script src="https://raw.githubusercontent.com/dwyl/ordem/master/index.js"> </script>

<script>
  ordem([
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

We needed this for [**alvo**](https://github.com/dwyl/alvo) our ***automated browser test runner***. But its *useable* ***anywhere that runs JavaScript***!

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
see: https://translate.google.com/#auto/en/ordem

**Interesting fact**: the word *ordem* is featured on the Brazilian flag:
![brazil flag](http://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/720px-Flag_of_Brazil.svg.png)

one of only [16 countries](https://answers.yahoo.com/question/index?qid=20091110134459AAsHxyL) to feature words on a flag.
they obviously feel quite passionately about it.
so do we.

Also, whenever I hear the word "*order*" I think of:

[![Everything seems to be in order](http://i.imgur.com/jttIEf0.png)](https://youtu.be/86NkAeSxhVI?t=1m37s "Everything seems to be in order")

Austin Powers 4 is "*in development*" ... http://www.imdb.com/title/tt1218992/ #[**YeahBaby**](https://www.youtube.com/watch?v=x4KEWEi5hE4)
