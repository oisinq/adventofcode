const passportIsValid = (passport) => {
  const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const fixedPassport = passport.replace("\n", " ");

  for (const attribute of required) {
    if (fixedPassport.search(attribute) === -1) {
      return false;
    }
  }

  return true;
};

var fs = require("fs");

const read = fs.readFileSync(`./q4/input.txt`);
const passports = read.toString().split("\n\n");
let count = 0;

for (passport of passports) {
  if (passportIsValid(passport)) count += 1;
}

console.log(count);
