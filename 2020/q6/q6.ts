const uniqueQuestionsForGroup = (group: string): number => {
  const condensedGroup = group.split("\n").join("");

  const set = new Set();
  for (const letter of condensedGroup) {
    set.add(letter);
  }

  return set.size;
};

const commonQuestionsForGroup = (group: string): number => {
  const members = group.split("\n");

  const set: Set<string> = new Set();

  for (const letter of members[0]) {
    set.add(letter);
  }

  for (const member of members.slice(1)) {
    for (const letter of set) {
      if (!member.includes(letter)) set.delete(letter);
    }
  }

  return set.size;
};

var fs = require("fs");

const read = fs.readFileSync(`./q6/input.txt`);
const groups: [string] = read.toString().split("\n\n");

let uniqueCount = 0;
let commonQuestionsCount = 0;

for (const group of groups) {
  uniqueCount += uniqueQuestionsForGroup(group); // part 1
  commonQuestionsCount += commonQuestionsForGroup(group); // part 1
}

console.log("Part 1:", uniqueCount);
console.log("Part 2:", commonQuestionsCount);

export {};
