import { readFileSync } from "fs";

type Instruction = {
  action: string;
  amount: number;
};

type Direction = "N" | "E" | "S" | "W";

type Location = {
  coordinates: [number, number];
  direction: Direction;
};

const directions: Direction[] = ["N", "E", "S", "W"];

const calculateNextLocation = (
  location: Location,
  instruction: Instruction
): Location => {
  const { action, amount } = instruction;

  if (action === "L" || action === "R") {
    const numberOfTurns = amount / 90;
    const index = directions.indexOf(location.direction);
    const newIndex =
      action === "R"
        ? (index + numberOfTurns) % 4
        : (((index - numberOfTurns) % 4) + 4) % 4;
    const newDirection = directions[newIndex];

    return { ...location, direction: newDirection };
  }

  const coordinates = location.coordinates;
  let newCoordinates = coordinates;

  let directionToTravel = action == "F" ? location.direction : action;

  switch (directionToTravel) {
    case "N":
      newCoordinates = [coordinates[0], coordinates[1] + amount];
      break;
    case "E":
      newCoordinates = [coordinates[0] + amount, coordinates[1]];
      break;
    case "S":
      newCoordinates = [coordinates[0], coordinates[1] - amount];
      break;
    case "W":
      newCoordinates = [coordinates[0] - amount, coordinates[1]];
      break;
  }

  return { ...location, coordinates: newCoordinates };
};

const read = readFileSync(`./q12/input.txt`);
const input: string[] = read.toString().split("\n");
const instructions: Instruction[] = [];

for (const entry of input) {
  const regex = /^([\w])([\d]*)$/;
  const [, action, amount] = regex.exec(entry);

  instructions.push({ action, amount: Number(amount) });
}

let location: Location = {
  coordinates: [0, 0],
  direction: "E",
};

for (const instuction of instructions) {
  location = calculateNextLocation(location, instuction);
}

const manhattanDistance =
  Math.abs(location.coordinates[0]) + Math.abs(location.coordinates[1]);
console.log("Part 1:", manhattanDistance);

export {};
