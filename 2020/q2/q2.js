const parseLine = (line) => {
  const regex = /(\d*)-(\d*) ([a-z]): ([a-z]*)/;
  return regex.exec(line);
};

const isValidQ1 = (line) => {
  const [, minAmount, maxAmount, letter, password] = parseLine(line);

  const passwordMatcher = new RegExp(letter, "g");
  const matches = password.match(passwordMatcher);

  if (matches === null) return false;

  if (matches.length >= minAmount && matches.length <= maxAmount) return true;

  return false;
};

const isValidQ2 = (line) => {
  const [, firstIndex, secondIndex, letter, password] = parseLine(line);

  const firstMatch = password.charAt(firstIndex - 1) === letter;
  const secondMatch = password.charAt(secondIndex - 1) == letter;

  return firstMatch ^ secondMatch;
};

var fs = require("fs");

const read = fs.readFileSync(`./q2/file.txt`);
const values = read.toString().split("\n");
let count = 0;

for (line of values) {
  if (isValidQ2(line)) count++;
}

console.log(count);
