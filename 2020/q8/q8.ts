type Instruction = {
  type: string;
  value: number;
};

const executeInstruction = (
  instruction: Instruction,
  index: number,
  accumulator: number
): [number, number] => {
  switch (instruction.type) {
    case "nop":
      return [index + 1, accumulator];
    case "acc":
      return [index + 1, accumulator + instruction.value];
    case "jmp":
      return [index + instruction.value, accumulator];
  }
};

const accumulatorValueBeforeLoop = (instructions: Instruction[]): number => {
  let [index, accumulator] = [0, 0];
  let visitedIndexes: number[] = [];

  while (true) {
    visitedIndexes.push(index);

    [index, accumulator] = executeInstruction(
      instructions[index],
      index,
      accumulator
    );

    if (visitedIndexes.includes(index)) {
      return accumulator;
    }
  }
};

const loopReachesEnd = (
  instructions: Instruction[],
  startingIndex: number,
  startingAccumulator: number,
  startingVisitedIndexes: number[]
): boolean => {
  let [index, accumulator] = [startingIndex, startingAccumulator];
  let visitedIndexes = [...startingVisitedIndexes];

  while (true) {
    visitedIndexes.push(index);

    [index, accumulator] = executeInstruction(
      instructions[index],
      index,
      accumulator
    );

    if (visitedIndexes.includes(index)) return false;
    if (index === instructions.length) {
      console.log("Accumulator value for part 2:", accumulator);
      return true;
    }
  }
};

const changeOneInstruction = (instructions: Instruction[]): void => {
  let [index, accumulator] = [0, 0];
  let visitedIndexes: number[] = [];

  while (true) {
    visitedIndexes.push(index);
    const instruction = instructions[index];

    instructions[index] = {
      ...instruction,
      type: instruction.type === "nop" ? "jmp" : "nop",
    };

    if (loopReachesEnd(instructions, index, accumulator, [...visitedIndexes])) {
      return;
    }

    instructions[index] = instruction;

    [index, accumulator] = executeInstruction(
      instructions[index],
      index,
      accumulator
    );

    if (visitedIndexes.includes(index)) return;
  }
};

const parseInstruction = (input: string): Instruction => {
  const [type, value] = input.split(" ");
  return { type, value: Number(value) };
};

var fs = require("fs");

const read = fs.readFileSync(`./q8/input.txt`);
const input: [string] = read.toString().split("\n");
const instructions: Instruction[] = [];

for (const line of input) {
  const instruction = parseInstruction(line);

  instructions.push(instruction);
}

console.log("Part 1:", accumulatorValueBeforeLoop(instructions));
changeOneInstruction(instructions);

export {};
