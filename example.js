const array = require("./");

(async () => {
  // map example
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const mappedArray = await array.map(numbers, (number) => {
    return number * 2;
  });

  // filter example
  console.log("mapped array", mappedArray); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

  const filteredArray = await array.filter(numbers, (number) => {
    return number % 2 === 0;
  });

  console.log("filtered array", filteredArray); // [2, 4, 6, 8, 10]

  // reduce example
  const reducedArray = await array.reduce(numbers, (acc, number) => {
    return acc + number;
  });

  console.log("reduced array", reducedArray); // 55

  //  forEach example
  await array.forEach(numbers, (number) => {
    console.log(number);
  });
})();
