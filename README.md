# ordenado [![Dependency Status](https://david-dm.org/dwyl/ordenado.svg)](https://david-dm.org/dwyl/ordenado)

![ducks-in-a-row](http://i.imgur.com/K6kGr3M.jpg)

***ordenado*** is a ***synchronous*** (ordered) **task runner** for Node.js and Browser ... *for when you need to have* "***all your ducks in a row***".


## Why?

JavaScript is *synchrnous* and single-threaded, but when multiple
statements are called in succession, **results** ***can*** **be returned** in an
***unexpected order***.
Often we need to run a sequence of tasks in a *specific* order.

We wrote this for [**alvo**](https://github.com/dwyl/alvo) our ***automated browser test runner***. But its *useable* ***anywhere that runs JavaScript***!


## What?

Lets you run a series of JavaScript functions/methods in a specific order using a simple api.


## How?




## Background Reading

+ When is JavaScript Synchrnous?
http://stackoverflow.com/questions/2035645/when-is-javascript-synchronous
+ Is javascript guaranteed to be single-threaded?
http://stackoverflow.com/questions/2734025/is-javascript-guaranteed-to-be-single-threaded
+ IIFE with global 'this':
http://stackoverflow.com/questions/10314891/how-to-use-functionglobal-this
+ What is the difference between call and apply?
http://stackoverflow.com/questions/1986896/what-is-the-difference-between-call-and-apply
