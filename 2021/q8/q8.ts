import * as fs from "fs";
import * as path from "path";
import { printResult } from "../print";

type Entry = {
  examples: string[];
  output: string[];
};

const textFile = fs.readFileSync(path.resolve(__dirname, "sample.txt"));
const entries = textFile
  .toString()
  .split("\n")
  .map((value) => {
    const [examplesStr, outputStr] = value.split(" | ");

    return {
      examples: examplesStr.split(" "),
      output: outputStr.split(" "),
    };
  });

console.log( entries[0] );

const part1 = () => {
  printResult();
};

const part2 = () => {
  printResult();
};

part1();
part2();
