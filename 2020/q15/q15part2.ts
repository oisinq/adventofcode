var fs = require("fs");

const read = fs.readFileSync(`./q15/input.txt`);
const input: number[] = read
  .toString()
  .split(",")
  .map((value: string) => Number(value));

const map: Map<number, number> = new Map();
let index = 0;
let lastNumber = -1;

for (const number of input) {
  map.set(number, index);
  index += 1;
  lastNumber = number;
}

let previousIndex = map.get(lastNumber);

while (index !== 30000000) {
  if (previousIndex !== undefined) {
    lastNumber = index - previousIndex - 1;
  } else {
    lastNumber = 0;
  }

  previousIndex = map.get(lastNumber);
  map.set(lastNumber, index);

  index += 1;
}

console.log("Part 2:", lastNumber);

export {};
