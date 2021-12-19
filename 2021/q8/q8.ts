import * as fs from "fs";
import * as path from "path";
import { printResult } from "../print";

type Entry = {
  examples: string[];
  output: string[];
};

const textFile = fs.readFileSync(path.resolve(__dirname, "input.txt"));
const entries = textFile
  .toString()
  .split("\n")
  .map((value) => {
    const [examplesStr, outputStr] = value.split(" | ");

    return {
      examples: examplesStr
        .split(" ")
        .map((example) => example.split("").sort().join("")),
      output: outputStr
        .split(" ")
        .map((example) => example.split("").sort().join("")),
    };
  });

const part1 = () => {
  let count = 0;

  for (let { output } of entries) {
    for (let number of output) {
      if (number.length <= 4 || number.length === 7) count++;
    }
  }

  printResult(count);
};

const containsAllLetters = (child: string, parent: string) => {
  for (let letter of child) {
    if (!parent.includes(letter)) return false;
  }

  return true;
};

const deduceCypher = (codes: string[]) => {
  const cypher: Record<string, number> = {};
  codes.sort((a, b) => a.length - b.length);

  const fiveDigitCodes = codes.slice(3, 6);
  const sixDigitCodes = codes.slice(6, 9);

  const [oneCode, sevenCode, fourCode] = codes;
  const eightCode = codes[9];

  const threeCode =
    fiveDigitCodes.find((mysteryCode) =>
      containsAllLetters(oneCode, mysteryCode)
    ) || "";

  const sixCode =
    sixDigitCodes.find(
      (mysteryCode) => !containsAllLetters(oneCode, mysteryCode)
    ) || "";

  const nineCode =
    sixDigitCodes.find((mysteryCode) =>
      containsAllLetters(fourCode, mysteryCode)
    ) || "";

  const zeroCode =
    sixDigitCodes.find(
      (mysteryCode) => mysteryCode !== sixCode && mysteryCode !== nineCode
    ) || "";

  const fiveCode =
    fiveDigitCodes.find((mysteryCode) =>
      containsAllLetters(mysteryCode, sixCode)
    ) || "";

  const twoCode =
    fiveDigitCodes.find(
      (mysteryCode) => mysteryCode !== threeCode && mysteryCode !== fiveCode
    ) || "";

  cypher[zeroCode] = 0;
  cypher[oneCode] = 1;
  cypher[twoCode] = 2;
  cypher[threeCode] = 3;
  cypher[fourCode] = 4;
  cypher[fiveCode] = 5;
  cypher[sixCode] = 6;
  cypher[sevenCode] = 7;
  cypher[eightCode] = 8;
  cypher[nineCode] = 9;

  return cypher;
};

const part2 = () => {
  let sum = 0;

  for (let { examples, output } of entries) {
    const cypher = deduceCypher(examples);

    const firstNumber = cypher[output[0]];
    const secondNumber = cypher[output[1]];
    const thirdNumber = cypher[output[2]];
    const fourthNumber = cypher[output[3]];

    const crackedCode = `${firstNumber}${secondNumber}${thirdNumber}${fourthNumber}`;
    sum += Number(crackedCode);
  }

  printResult(sum);
};

part1();
part2();
