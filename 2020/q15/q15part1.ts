var fs = require("fs");

const read = fs.readFileSync(`./q15/input.txt`);
const input: number[] = read
  .toString()
  .split(",")
  .map((value: string) => Number(value));

const memory: number[] = [...input, 0];

while (memory.length !== 30000000) {
  const index = memory.lastIndexOf(
    memory[memory.length - 1],
    memory.length - 2
  );

  if (index === -1) {
    memory.push(0);
  } else {
    memory.push(memory.length - index - 1);
  }
}

console.log("Part 1:", memory.pop());

export {};
