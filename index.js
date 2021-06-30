/**
 * Works similar to Array.prototype.map but executes each iteration of the array asynchronously.
 * This allows the execution to yield to other tasks thereby not blocking the event loop.
 * @param {Array} array
 * @param {Function} callback
 * @returns A new array populated with the results of the callback function
 */
function map(array, callback) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(array))
      reject(new TypeError("Invalid argument. Must be an array"));
    const newArray = [];
    function help(index) {
      if (index < array.length) {
        Promise.resolve(callback(array[index], index))
          .then((result) => {
            newArray.push(result);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve(newArray);
        return;
      }
      setImmediate(help.bind(null, index + 1));
    }
    help(0);
  });
}

function forEach(array, callback) {
  if (!Array.isArray(array))
    reject(new TypeError("Invalid argument. Must be an array"));
  function help(index) {
    if (index < array.length) {
      callback(array[index], index);
    } else {
      return;
    }
    setImmediate(help.bind(null, index + 1));
  }
  help(0);
}

module.exports = { map, forEach };
