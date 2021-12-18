const containsTree = (line, index) => {
  return line.charAt(index % line.length) === "#";
};

var fs = require("fs");

const read = fs.readFileSync(`./q3/input.txt`);
const values = read.toString().split("\n");
let count = 0;
let column = 0;
let skip = true;

console.log(values.slice(1));

for (line of values.slice(1)) {
  if (skip) {
    // this is for when you're going down 2 rows instead of 1. if you're going down 1 row, remove this if statement
    skip = false;
  } else {
    if (containsTree(line, column + 1)) count++;
    column = column + 1; // change depending on how many squares right you want to check
    skip = true;
  }
}

console.log(count);
