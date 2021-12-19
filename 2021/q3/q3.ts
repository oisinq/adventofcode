import * as fs from "fs";
import * as path from "path";
import { printResult } from "../print";

const read = fs.readFileSync(path.resolve(__dirname, "input.txt"));
const positions = read.toString().split("\n");

const mostCommonBitValue = (positions: string[], bitIndex: number) => {
  const tally = { "0": 0, "1": 0 };

  for (const position of positions) {
    tally[position.charAt(bitIndex) as "0" | "1"] += 1;
  }

  return tally["0"] > tally["1"] ? "0" : "1";
};

const part1 = () => {
  const positionLength = positions[0].length;
  let gammaInBinary = "";
  let epsilonInBinary = "";

  for (let bitIndex = 0; bitIndex < positionLength; bitIndex++) {
    const mostCommon = mostCommonBitValue(positions, bitIndex);

    gammaInBinary += mostCommon;
    epsilonInBinary += mostCommon === "1" ? "0" : "1"; // there's definitely a better way of doing this - epsilonInBinary is really the inverse of gammaInBinary
  }

  const gamma = parseInt(gammaInBinary, 2);
  const epsilon = parseInt(epsilonInBinary, 2);

  printResult({ part: 1, answer: gamma * epsilon });
};

const calculateOxygenRating = () => {
  let validPoisitions = [...positions];
  const positionLength = validPoisitions[0].length;

  for (let bitIndex = 0; bitIndex < positionLength; bitIndex++) {
    const mostCommon = mostCommonBitValue(validPoisitions, bitIndex);

    validPoisitions = validPoisitions.filter(
      (position) => position.charAt(bitIndex) === mostCommon
    );

    if (validPoisitions.length === 1) {
      return parseInt(validPoisitions[0], 2);
    }
  }

  return 0;
};

const calculateCO2Rating = () => {
  let validPoisitions = [...positions];
  const positionLength = validPoisitions[0].length;

  for (let bitIndex = 0; bitIndex < positionLength; bitIndex++) {
    const mostCommon = mostCommonBitValue(validPoisitions, bitIndex);

    validPoisitions = validPoisitions.filter(
      (position) => position.charAt(bitIndex) !== mostCommon // This is the only difference between these two calculate functions - definitely room to clean this up (but i'm tired)
    );

    if (validPoisitions.length === 1) {
      return parseInt(validPoisitions[0], 2);
    }
  }

  return 0;
};

const part2 = () => {
  const oxygenRating = calculateOxygenRating();
  const CO2Rating = calculateCO2Rating();

  printResult({ part: 2, answer: oxygenRating * CO2Rating });
};

part1();
part2();
