const passportObjIsValid = (passport: { [key: string]: string }) => {
  const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  for (const attribute of required) {
    if (
      Object.keys(passport).find((key) => key === attribute) === undefined &&
      attribute !== "cid"
    ) {
      return false;
    }
  }

  for (const [attribute, value] of Object.entries(passport)) {
    switch (attribute) {
      case "byr":
        if (Number(value) < 1920 || Number(value) > 2002) {
          return false;
        }
        break;
      case "iyr":
        if (Number(value) < 2010 || Number(value) > 2020) {
          return false;
        }
        break;
      case "eyr":
        if (Number(value) < 2020 || Number(value) > 2030) {
          return false;
        }
        break;
      case "hgt":
        if (value.includes("cm")) {
          const height = Number(value.split("cm")[0]);
          if (height < 150 || height > 193) {
            return false;
          }
        } else if (value.includes("in")) {
          const height = Number(value.split("in")[0]);
          if (height < 59 || height > 76) {
            return false;
          }
        } else {
          return false;
        }
        break;
      case "hcl":
        const hclRegex = /^#[0-9a-f]{6}$/;
        if (!value.match(hclRegex)) {
          return false;
        }
        break;
      case "ecl":
        const eyeValues = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
        if (!eyeValues.includes(value)) {
          return false;
        }
        break;
      case "pid":
        const pidRegex = /^[0-9]{9}$/;
        if (!value.match(pidRegex)) {
          return false;
        }
      case "cid":
        break;
      default:
        return false;
    }
  }

  return true;
};

var fs = require("fs");

const read = fs.readFileSync(`./q4/input.txt`);
const passports: [string] = read.toString().split("\n\n");
let count = 0;

for (const passport of passports) {
  const fixedPassport = passport.split("\n").join(" ").replace("\n", "");
  const passportObj: { [key: string]: string } = {};

  for (const entry of fixedPassport.split(" ")) {
    const [attribute, value] = entry.split(":");

    passportObj[attribute] = value;
  }

  if (passportObjIsValid(passportObj)) count += 1;
}

console.log(count);

export {};
