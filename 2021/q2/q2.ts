import * as fs from "fs";
import * as path from "path";
import { printResult } from "../print";

type Instruction = {
  direction: "forward" | "up" | "down";
  amount: number;
};

const read = fs.readFileSync(path.resolve(__dirname, "input.txt"));
const instructions = read
  .toString()
  .split("\n")
  .map((line) => line.split(" "))
  .map(([direction, amount]) => ({
    direction,
    amount: Number(amount),
  })) as Instruction[];

const part1 = () => {
  let horizontalPostion = 0;
  let depth = 0;

  for (const instruction of instructions) {
    switch (instruction.direction) {
      case "forward":
        horizontalPostion += instruction.amount;
        break;
      case "up":
        depth -= instruction.amount;
        break;
      case "down":
        depth += instruction.amount;
        break;
    }
  }

  printResult(depth * horizontalPostion);
};

const part2 = () => {
  let horizontalPostion = 0;
  let depth = 0;
  let aim = 0;

  for (const instruction of instructions) {
    switch (instruction.direction) {
      case "forward":
        horizontalPostion += instruction.amount;
        depth += aim * instruction.amount;
        break;
      case "up":
        aim -= instruction.amount;
        break;
      case "down":
        aim += instruction.amount;
        break;
    }
  }

  printResult(depth * horizontalPostion);
};

part1();
part2();
