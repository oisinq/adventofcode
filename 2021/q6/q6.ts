import * as fs from "fs";
import * as path from "path";
import { printResult } from "../print";

const textFile = fs.readFileSync(path.resolve(__dirname, "input.txt"));

let fishTimers = textFile
  .toString()
  .split(",")
  .map((value) => Number(value));

const part1 = () => {
  const numIterations = 80;

  for (let i = 0; i < numIterations; i++) {
    let newFish: number[] = [];

    fishTimers = fishTimers
      .map((fishTimer) => {
        if (fishTimer === 0) {
          newFish.push(8);
          return 6;
        }

        return fishTimer - 1;
      })
      .concat(newFish);
  }

  printResult(fishTimers.length);
};

const part2 = () => {
  const numIterations = 256;
  let map: Record<number, number> = {};

  for (let fishTimer of fishTimers) map[fishTimer] = (map[fishTimer] || 0) + 1;

  for (let i = 0; i < numIterations; i++) {
    const nextMap: Record<number, number> = {};
    for (let [timeStr, value] of Object.entries(map)) {
      const time = Number(timeStr);

      if (time === 0) {
        nextMap[8] = value;
        nextMap[6] = value;
        nextMap[0] = 0;
      } else {
        nextMap[time - 1] = (nextMap[time - 1] || 0) + value;
      }
    }

    map = nextMap;
  }

  printResult(Object.entries(map).reduce((sum, [_, value]) => sum + value, 0));
};

part1();
part2();
