type Instruction = {};

const getMaskFromLine = (line): string => {
  return line.split(" = ")[1];
};

const parseMemoryLine = (line): [number, number] => {
  const regex = /^mem\[([\d]*)\] = ([\d]*)$/;
  const [, index, value] = regex.exec(line);

  return [Number(index), Number(value)];
};

const calculateMaskedValue = (value: number, mask: string): number => {
  const binaryValue = value.toString(2).padStart(36, "0");
  const maskedValueChars: string[] = [];

  for (let i = 0; i < mask.length; i++) {
    maskedValueChars.push(mask[i] === "X" ? binaryValue[i] : mask[i]);
  }

  return parseInt(maskedValueChars.join(""), 2);
};

const calculateMaskedIndexes = (index: number, mask: string): number[] => {
  const binaryIndex = index.toString(2).padStart(36, "0");
  const maskedIndexChars: string[] = [];

  for (let i = 0; i < mask.length; i++) {
    maskedIndexChars.push(mask[i] === "0" ? binaryIndex[i] : mask[i]);
  }

  const maskedIndexesWithX = [maskedIndexChars.join("")];

  while (maskedIndexesWithX.some((index) => index.includes("X"))) {
    const indexWithX = maskedIndexesWithX.shift();

    maskedIndexesWithX.push(indexWithX.replace("X", "0"));
    maskedIndexesWithX.push(indexWithX.replace("X", "1"));
  }

  return maskedIndexesWithX.map((index) => parseInt(index, 2));
};

var fs = require("fs");

const read = fs.readFileSync(`./q14/input.txt`);
const input: string[] = read.toString().split("\n");

let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
const memory: Map<number, number> = new Map();

for (const line of input) {
  if (line.includes("mask")) {
    mask = getMaskFromLine(line);
  } else {
    const [index, value] = parseMemoryLine(line);
    const maskedIndexes = calculateMaskedIndexes(index, mask);

    for (const index of maskedIndexes) memory.set(index, value);
  }
}

const sum = Array.from(memory.values()).reduce((sum, value) => sum + value, 0);

console.log("Part 2:", sum);

export {};
