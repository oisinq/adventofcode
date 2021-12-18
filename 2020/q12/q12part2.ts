// @ts-ignore
import { multiply, rotationMatrix } from "mathjs";

type Instruction = {
  action: string;
  amount: number;
};

type Direction = "N" | "E" | "S" | "W";
type Coordinates = [number, number];

type Ship = {
  location: Coordinates;
  waypoint: Coordinates;
};

const calculateNextShip = (ship: Ship, instruction: Instruction): Ship => {
  const { action, amount } = instruction;

  if (action === "L" || action === "R") {
    const waypoint = rotateWaypoint(ship, instruction);

    return { ...ship, waypoint };
  }

  const location = ship.location;
  let newLocation = location;

  if (action === "F") {
    newLocation = [
      location[0] + ship.waypoint[0] * amount,
      location[1] + ship.waypoint[1] * amount,
    ];

    return { ...ship, location: newLocation };
  }

  const waypoint = ship.waypoint;
  let newWaypoint = waypoint;

  switch (action) {
    case "N":
      newWaypoint = [waypoint[0], waypoint[1] + amount];
      break;
    case "E":
      newWaypoint = [waypoint[0] + amount, waypoint[1]];
      break;
    case "S":
      newWaypoint = [waypoint[0], waypoint[1] - amount];
      break;
    case "W":
      newWaypoint = [waypoint[0] - amount, waypoint[1]];
      break;
  }

  return { ...ship, waypoint: newWaypoint };
};

const rotateWaypoint = (
  { location, waypoint }: Ship,
  { action, amount }: Instruction
): Coordinates => {
  const degrees = action === "L" ? amount : 360 - amount;

  const newWaypoint: any = multiply(
    rotationMatrix(degrees * (Math.PI / 180)),
    waypoint
  ).toArray();

  return [Math.round(newWaypoint[0]), Math.round(newWaypoint[1])];
};

var fs = require("fs");

const read = fs.readFileSync(`./q12/input.txt`);
const input: string[] = read.toString().split("\n");
const instructions: Instruction[] = [];

for (const entry of input) {
  const regex = /^([\w])([\d]*)$/;
  const [, action, amount] = regex.exec(entry);

  instructions.push({ action, amount: Number(amount) });
}

let ship: Ship = {
  location: [0, 0],
  waypoint: [10, 1],
};

for (const instuction of instructions) {
  ship = calculateNextShip(ship, instuction);
}

const manhattanDistance =
  Math.abs(ship.location[0]) + Math.abs(ship.location[1]);
console.log("Part 2:", manhattanDistance);

export {};
