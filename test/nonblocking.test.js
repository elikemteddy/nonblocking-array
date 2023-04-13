const array = require(".././index.js");
describe("map", function () {
  it("should map an array", async function () {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const mappedArray = await array.map(numbers, (number) => {
      return number * 2;
    });
    expect(mappedArray).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
  });

  it("should map an array with async function", async function () {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const mappedArray = await array.map(numbers, async (number) => {
      return number * 2;
    });
    expect(mappedArray).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
  });

  it("should return the same result as Array.prototype.map", async function () {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const mappedArray = await array.map(numbers, (number) => {
      return number * 2;
    });
    expect(mappedArray).toEqual(numbers.map((number) => number * 2));
  });
});

describe("filter", function () {
  it("should filter an array", async function () {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const filteredArray = await array.filter(numbers, (number) => {
      return number % 2 === 0;
    });
    expect(filteredArray).toEqual([2, 4, 6, 8, 10]);
  });

  it("should filter an array with async function", async function () {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const filteredArray = await array.filter(numbers, async (number) => {
      return number % 2 === 0;
    });
    expect(filteredArray).toEqual([2, 4, 6, 8, 10]);
  });

  it("should return the same result as Array.prototype.filter", async function () {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const filteredArray = await array.filter(numbers, (number) => {
      return number % 2 === 0;
    });
    expect(filteredArray).toEqual(numbers.filter((number) => number % 2 === 0));
  });
});

describe("reduce", function () {
  it("should reduce an array", async function () {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const reducedArray = await array.reduce(numbers, (acc, number) => {
      return acc + number;
    });
    expect(reducedArray).toEqual(55);
  });

  it("should reduce an array with async function", async function () {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const reducedArray = await array.reduce(numbers, async (acc, number) => {
      return acc + number;
    });
    expect(reducedArray).toEqual(55);
  });

  it("should return the same result as Array.prototype.reduce", async function () {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const reducedArray = await array.reduce(numbers, (acc, number) => {
      return acc + number;
    });
    expect(reducedArray).toEqual(numbers.reduce((acc, number) => acc + number));
  });
});

describe("forEach", function () {
  it("should forEach an array", async function () {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = [];
    await array.forEach(numbers, (number) => {
      result.push(number);
    });
    expect(result).toEqual(numbers);
  });

  it("should forEach an array with async function", async function () {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = [];
    await array.forEach(numbers, async (number) => {
      result.push(number);
    });
    expect(result).toEqual(numbers);
  });

  it("should return the same result as Array.prototype.forEach", async function () {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = [];
    await array.forEach(numbers, (number) => {
      result.push(number);
    });
    const expected = [];
    numbers.forEach((number) => {
      expected.push(number);
    });
    expect(result).toEqual(expected);
    expect(await array.forEach(numbers, (number) => number)).toEqual(
      numbers.forEach((number) => number)
    );
  });
});
