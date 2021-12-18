const bruteForce = (values) => {
  for (i = 0; i < values.length; i++) {
    for (j = i + 1; j < values.length; j++) {
      for (k = j + 1; k < values.length; k++) {
        if (values[i] + values[j] + values[k] === 2020) {
          return values[i] * values[j] * values[k];
        }
      }
    }
  }
};

var fs = require("fs");

const read = fs.readFileSync(`./q1/report.txt`);
const values = read
  .toString()
  .split("\n")
  .map((number) => parseInt(number, 10));

console.log(bruteForce(values));
