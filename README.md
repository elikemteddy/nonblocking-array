# nonblocking-array

Provides nonblocking functions of various Array methods. Unlike the standard array methods that execute array iterations in its entirety in one cycle of the event loop, and may block the event loop on large arrays, these functions execute each iteration of the array in isolation (separate async functions) enabling the event loop to yield and handle other tasks while the large array operations/processing is in progress.

This currently supports only Node JS environment. Browsers will be supported in later versions.

## Usage

### Map

```
const array = require("nonblocking-array");
const largeArray = [1,2,3,4,5]; //A large array that may block with regular Array.map
(async ()=>{
    const newArray = await array.map(largeArray, (element, index)=>{
        //Do something with element
        return element * 2;
    });
    console.log(newArray); //Do something with the result of the map function
})();
```
