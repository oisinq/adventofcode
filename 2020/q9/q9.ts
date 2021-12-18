const findContiguousSet = (target: number, input: number[]): number[] => {
  let [start, end] = [0, 2];
  let currentList = input.slice(start, end);
  let listSum = currentList.reduce((sum, value) => sum + value, 0);

  while (listSum !== target) {
    if (listSum < target) {
      end += 1;
    } else {
      start += 1;
    }

    currentList = input.slice(start, end);
    listSum = currentList.reduce((sum, value) => sum + value, 0);
  }
  return currentList;
};

const containsMatch = (number: number, previousNumbers: number[]) => {
  for (const previous of previousNumbers) {
    const otherKeys = previousNumbers.filter(
      (currentKey) => currentKey !== previous
    );

    if (otherKeys.includes(number - previous)) return true;
  }

  return false;
};

const findInvalidNumber = (input: number[], preamble: number): number => {
  let index = preamble;

  while (true) {
    const previousNumbers = input.slice(index - preamble, index);
    const number = input[index];

    if (!containsMatch(number, previousNumbers)) {
      return number;
    }

    index += 1;
  }
};

var fs = require("fs");

const read = fs.readFileSync(`./q9/input.txt`);
const input: [number] = read
  .toString()
  .split("\n")
  .map((value: string) => Number(value));

const preamble = 25;
const invalidNumber = findInvalidNumber(input, preamble);

console.log("Part 1:", invalidNumber);

const contiguousSet = findContiguousSet(invalidNumber, input);
const max = Math.max(...contiguousSet);
const min = Math.min(...contiguousSet);

console.log("Part 2:", max + min);

export {};
