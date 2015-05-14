# ordenado

Synchronous (ordered) task runner for Node.js and Browser

## Why?

JavaScript is *synchrnous* and single-threaded, but when multiple
statements are called in succession, **results** ***can*** **be returned** in an
***unexpected order***.
Often we need to run a sequence of tasks in a *specific* order.


## Background Reading

+ When is JavaScript Synchrnous?
http://stackoverflow.com/questions/2035645/when-is-javascript-synchronous
+ Is javascript guaranteed to be single-threaded?
http://stackoverflow.com/questions/2734025/is-javascript-guaranteed-to-be-single-threaded
