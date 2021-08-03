# nonblocking-array

Provides nonblocking functions of various Array methods. Unlike the standard array methods that execute array iterations in its entirety in one cycle of the event loop, and may block the event loop on large arrays, these functions execute each iteration of the array in isolation (separate async functions) enabling the event loop to yield and handle other tasks while the large array operations/processing is in progress.

These functions work in only Node environment for now. Browsers may be supported in later versions.

## Installation

Install using `npm i nonblocking-array`

## Usage

The functions take at least two arguments. The first argument is the array to be processed and second argument is a callback function.
The `callback` is called with the `currentItem` as the first argument, `currentIndex` as the second argument and the `array` as third argument.
The functions are promised based and the callbacks can also be async functions.

Import/require as follows

```js
const array = require("nonblocking-array");
```

## Functions

### map

Returns a new array with the results of the returned values of the callback function. Similar to `Array.prototype.map`.

```js
const largeArray = [1, 2, 3, 4, 5]; //A large array that may block with regular Array.map
(async () => {
  const newArray = await array.map(largeArray, (element, index) => {
    //Do something with element
    return element * 2;
  });
  console.log(newArray); //Do something with the result of the map function
})();
```

### forEach

Calls the callback function with each item and index of the array.
`forEach` is promise based as of version `1.0.3` and can be used with the await keyword.

Returns `undefined`

```
array.forEach(largeArray, (currentItem, currentIndex)=> {
    console.log(`Current Item: ${currentItem}, Current Index: ${currentIndex}`);
});
```

### reduce

The reduce function behaves the exact same way the Array.prototype.reduce does.
"The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in a single output value."

```js
const reducedValue = await array.reduce(
  largeArray,
  (accumulator, currentItem, index) => {
    return accumulator + currentItem;
  }
);
console.log(reducedValue);
```

The reduce function complies with the Array.prototype.reduce specification `A value to use as the first argument to the first call of the callbackFn. If no initialValue is supplied, the first element in the array will be used as the initial accumulator value and skipped as currentValue. Calling reduce() on an empty array without an initialValue will throw a TypeError.`

```js
const reducedValue = await array.reduce(
  largeArray,
  (accumulator, currentItem, index) => {
    return accumulator + currentItem;
  },
  4
); // 4 specified as initial value
console.log(reducedValue);
```
