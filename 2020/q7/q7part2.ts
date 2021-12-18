interface Bag {
  colour: string;
  containedBags: ContainedBag[];
}

interface ContainedBag {
  colour: string;
  amount: number;
}

const countContainedBags = (bag: Bag, map: Map<string, Bag>): number => {
  if (bag.containedBags.length === 0) return 0;

  return bag.containedBags.reduce(
    (value, bag) =>
      value +
      countContainedBags(map.get(bag.colour), map) * bag.amount +
      bag.amount, // the amount of contained bags is the amount of bags inside the current bag, as well as the amount of bags inside each of those bags
    0
  );
};

const parseInstruction = (instruction: string): Bag => {
  const firstRegex = /^([\a-z]* [a-z]*) bag[s]? contain ([\w ,]*)./;
  const [, bagColour, containedBagsStr] = firstRegex.exec(instruction);

  if (containedBagsStr.includes("no other bags"))
    return { colour: bagColour, containedBags: [] };

  const containedBags: ContainedBag[] = [];
  const individualBagNames: string[] = containedBagsStr.split(", ");

  const bagsRegex = /^(\d+) ([\a-z]* [a-z]*) bag[s]?$/;
  for (const bagStr of individualBagNames) {
    const [, amount, colour] = bagsRegex.exec(bagStr);

    containedBags.push({ colour, amount: Number(amount) });
  }

  return { colour: bagColour, containedBags };
};

var fs = require("fs");

const read = fs.readFileSync(`./q7/input.txt`);
const instructions: [string] = read.toString().split("\n");
const bagMap: Map<string, Bag> = new Map();

for (const instruction of instructions) {
  const bag = parseInstruction(instruction);

  bagMap.set(bag.colour, bag);
}

const shinyGoldBag = bagMap.get("shiny gold");

console.log("Part 2: ", countContainedBags(shinyGoldBag, bagMap));

export {};
