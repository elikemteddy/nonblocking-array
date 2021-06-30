# nonblocking-array

Provides nonblocking functions of various Array methods. Unlike the standard array methods that execute array iterations in its entirety in one cycle of the event loop, and may block the event loop on large arrays, these functions execute each iteration of the array in isolation (separate async functions) enabling the event loop to yield and handle other tasks while the large array operations/processing is in progress.

This currently supports only Node JS environment. Browsers will be supported in later versions.

## Installation

Install using `npm i nonblocking-array`

## Usage

The functions take two arguments. First argument is the array to process and second argument is a callback function.
The `callback` is called with the `currentItem` as the first argument and the `currentIndex` as the second argument.
The functions are promised based and the callbacks can also be async functions.

Import/require as follows

```
const array = require("nonblocking-array");
```

### map

Returns a new array with the results of the returned values of the callback function

```
const largeArray = [1,2,3,4,5]; //A large array that may block with regular Array.map
(async ()=>{
    const newArray = await array.map(largeArray, (element, index)=>{
        //Do something with element
        return element * 2;
    });
    console.log(newArray); //Do something with the result of the map function
})();
```

### forEach

Calls the callback function with each item and index of the array. Does not return a new array

```
array.forEach(largeArray, (currentItem, currentIndex)=>{
    console.log(`Current Item: ${currentItem}, Current Index: ${currentIndex}`);
});
```
