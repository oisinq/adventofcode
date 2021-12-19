import * as fs from "fs";
import * as path from "path";
import { printResult } from "../print";

const textFile = fs.readFileSync(path.resolve(__dirname, "input.txt"));
const horizontalPositions = textFile
  .toString()
  .split(",")
  .map((value) => Number(value))
  .sort((a, b) => a - b);

const calculateFuelCostPart1 = (
  horizontalPositions: number[],
  index: number
) => {
  let total = 0;

  for (const position of horizontalPositions) {
    total += Math.abs(position - index);
  }

  return total;
};

const part1 = () => {
  let smallestFuelCost = Infinity;
  for (
    let i = horizontalPositions[0];
    i < horizontalPositions[horizontalPositions.length - 1];
    i++
  ) {
    const fuelCost = calculateFuelCostPart1(horizontalPositions, i);

    if (fuelCost < smallestFuelCost) {
      smallestFuelCost = fuelCost;
    }
  }

  printResult(smallestFuelCost);
};

const calculateFuelCostPart2 = (
  horizontalPositions: number[],
  index: number
) => {
  let total = 0;

  for (const position of horizontalPositions) {
    const absoluteDistance = Math.abs(position - index);
    const fuelConsumed = (Math.pow(absoluteDistance, 2) + absoluteDistance) / 2;
    total += fuelConsumed;
  }

  return total;
};

const part2 = () => {
  let smallestFuelCost = Infinity;
  for (
    let i = horizontalPositions[0];
    i < horizontalPositions[horizontalPositions.length - 1];
    i++
  ) {
    const fuelCost = calculateFuelCostPart2(horizontalPositions, i);

    if (fuelCost < smallestFuelCost) {
      smallestFuelCost = fuelCost;
    }
  }

  printResult(smallestFuelCost);
};

part1();
part2();
