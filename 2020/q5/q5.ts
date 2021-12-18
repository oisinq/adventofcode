const part1 = (seatIds: number[]) => seatIds.reduce((a, b) => Math.max(a, b));

const part2 = (seatIds: number[]) => {
  seatIds.sort((a, b) => a - b);

  for (let i = 1; i < seatIds.length; i++) {
    if (seatIds[i] - seatIds[i - 1] !== 1) {
      console.log(
        "The missing seat is in here:",
        seatIds[i - 1],
        seatIds[i],
        seatIds[i + 1]
      );
    }
  }
};

var fs = require("fs");

const read = fs.readFileSync(`./q5/input.txt`);
const seats: [string] = read.toString().split("\n");
const seatIds: number[] = [];

for (const seat of seats) {
  const row = seat.substring(0, 7).split("B").join("1").split("F").join("0");
  const column = seat.substring(7).split("R").join("1").split("L").join("0");

  const seatId = parseInt(row, 2) * 8 + parseInt(column, 2);
  seatIds.push(seatId);
}

console.log("Part 1:", part1(seatIds));

console.log("Part 2:", part2(seatIds));

export {};
