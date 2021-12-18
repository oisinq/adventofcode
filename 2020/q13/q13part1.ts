const part1 = (startingTimestamp: number, busIds: number[]): number => {
  let currentTime = startingTimestamp;
  while (true) {
    for (const busId of busIds) {
      if (currentTime % busId === 0)
        return busId * (currentTime - startingTimestamp);
    }

    currentTime += 1;
  }
};

var fs = require("fs");

const read = fs.readFileSync(`./q13/input.txt`);
const input: string[] = read.toString().split("\n");

const startingTimestamp = Number(input[0]);
const busIds = input[1]
  .split(",")
  .filter((id) => id !== "x")
  .map((id) => Number(id));

console.log("Part 1:", part1(startingTimestamp, busIds));

export {};
