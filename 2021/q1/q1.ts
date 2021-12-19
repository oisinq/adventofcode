import * as fs from "fs";
import * as path from "path";
import { printResult } from "../print";

const read = fs.readFileSync(path.resolve(__dirname, "input.txt"));
const depths = read
  .toString()
  .split("\n")
  .map((value) => Number(value));

const part1 = () => {
  let answer = 0;

  for (let index = 1; index < depths.length; index++) {
    if (depths[index] > depths[index - 1]) answer++;
  }

  printResult({ part: 1, answer });
};

const part2 = () => {
  let answer = 0;
  let previousSum: number | undefined = undefined;

  for (let index = 0; index < depths.length - 2; index++) {
    const currentSum = depths[index] + depths[index + 1] + depths[index + 2];

    if (previousSum !== undefined) {
      if (currentSum > previousSum) answer++;
    }

    previousSum = currentSum;
  }

  printResult({ part: 2, answer });
};

part1();
part2();
