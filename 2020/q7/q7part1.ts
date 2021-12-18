const containsGoldShinyBag = (
  bag: string,
  map: Map<string, string[]>
): boolean => {
  const containedBags = map.get(bag);

  if (containedBags.length === 0) return false;
  if (containedBags.includes("shiny gold")) return true;

  return containedBags.some((bag) => containsGoldShinyBag(bag, map));
};

const parseInstruction = (instruction: string): [string, string[]] => {
  const containedBags: string[] = [];
  const firstRegex = /^([\a-z]* [a-z]*) bag[s]? contain ([\w ,]*)./;
  const [, bagColour, containedBagsStr] = firstRegex.exec(instruction);

  if (containedBagsStr.includes("no other bags")) return [bagColour, []];

  const individualBags: string[] = containedBagsStr.split(", ");

  const bagsRegex = /^\d+ ([\a-z]* [a-z]*) bag[s]?$/;
  for (const bagStr of individualBags) {
    const [, containedBag] = bagsRegex.exec(bagStr);

    containedBags.push(containedBag);
  }

  return [bagColour, containedBags];
};

var fs = require("fs");

const read = fs.readFileSync(`./q7/input.txt`);
const instructions: [string] = read.toString().split("\n");
const bagMap: Map<string, string[]> = new Map();

for (const instruction of instructions) {
  const [bagColour, containedBags] = parseInstruction(instruction);

  bagMap.set(bagColour, containedBags);
}

let count = 0;

for (const colour of bagMap.keys()) {
  if (containsGoldShinyBag(colour, bagMap)) count += 1;
}

console.log(count);

export {};
