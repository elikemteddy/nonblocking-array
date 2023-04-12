/**
 * Works similar to Array.prototype.map but executes each iteration of the array asynchronously.
 * This allows the execution to yield to other tasks thereby not blocking the event loop.
 * @param {Array} array
 * @param {Function} callback
 * @returns A new array populated with the results of the callback function
 */
function map(array, callback, thisArg) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(array))
      reject(new TypeError("Invalid argument. Must be an array"));
    const newArray = [];
    function help(index) {
      if (index < array.length) {
        Promise.resolve(callback.call(thisArg, array[index], index, array))
          .then((result) => {
            newArray.push(result);
            setImmediate(help.bind(null, index + 1));
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve(newArray);
      }
    }
    help(0);
  });
}

function filter(array, callback, thisArg) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(array))
      reject(new TypeError("Invalid argument. Must be an array"));
    const newArray = [];
    function help(index) {
      if (index < array.length) {
        Promise.resolve(callback.call(thisArg, array[index], index, array))
          .then((result) => {
            if (result) newArray.push(array[index]);
            setImmediate(help.bind(null, index + 1));
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve(newArray);
      }
    }
    help(0);
  });
}

function forEach(array, callback, thisArg) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(array))
      reject(new TypeError("Invalid argument. Must be an array"));
    function help(index) {
      if (index < array.length) {
        Promise.resolve(callback.call(thisArg, array[index], index, array))
          .then((result) => {
            setImmediate(help.bind(null, index + 1));
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve(undefined);
        // return;
      }
    }
    help(0);
  });
}

function reduce(array, callback, initialValue) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(array))
      reject(new TypeError("Invalid argument. Must be an array"));
    if (
      (initialValue == undefined || initialValue == null) &&
      array.length === 0
    )
      reject(new TypeError("Array must not be empty"));

    let accumulator =
      initialValue == undefined || initialValue == null
        ? array[0]
        : initialValue;
    function help(index) {
      if (index < array.length) {
        Promise.resolve(callback(accumulator, array[index], index, array))
          .then((result) => {
            accumulator = result;
            setImmediate(help.bind(null, index + 1));
          })
          .catch((error) => {
            reject(error);
            return;
          });
      } else {
        resolve(accumulator);
        return;
      }
    }
    if (initialValue != undefined || initialValue != null) help(0);
    else help(1);
  });
}

module.exports = { map, forEach, reduce, filter };
