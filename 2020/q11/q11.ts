type Coordinates = [number, number];
type Board = string[][];
type Direction =
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "left"
  | "top-left";

const countOccupiedSeatsOnBoard = (board: Board): number => {
  let count = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      count += isSeatOccupied([i, j], board) ? 1 : 0;
    }
  }

  return count;
};

const isSeatOccupied = ([i, j]: Coordinates, board: Board): boolean =>
  board[i][j] === "#";

const isFloor = ([i, j]: Coordinates, board: Board): boolean =>
  board[i][j] === ".";

const squareExists = ([i, j]: Coordinates, board: Board): boolean =>
  i in board && j in board[0];

const findSeatInDirection = (
  [i, j]: Coordinates,
  direction: Direction,
  board: Board
): Coordinates | null => {
  let new_i: number, new_j: number;
  switch (direction) {
    case "top":
      [new_i, new_j] = [i - 1, j];
      break;
    case "top-left":
      [new_i, new_j] = [i - 1, j - 1];
      break;
    case "top-right":
      [new_i, new_j] = [i - 1, j + 1];
      break;
    case "left":
      [new_i, new_j] = [i, j - 1];
      break;
    case "right":
      [new_i, new_j] = [i, j + 1];
      break;
    case "bottom":
      [new_i, new_j] = [i + 1, j];
      break;
    case "bottom-left":
      [new_i, new_j] = [i + 1, j - 1];
      break;
    case "bottom-right":
      [new_i, new_j] = [i + 1, j + 1];
      break;
  }

  if (squareExists([new_i, new_j], board)) {
    if (isFloor([new_i, new_j], board)) {
      return findSeatInDirection([new_i, new_j], direction, board);
    }

    return [new_i, new_j];
  }

  return null;
};

const countOccupiedFirstSeats = (
  coordinates: Coordinates,
  board: Board
): number => {
  let count = 0;

  const directions: Direction[] = [
    "top",
    "top-right",
    "top-left",
    "left",
    "right",
    "bottom",
    "bottom-left",
    "bottom-right",
  ];

  for (const direction of directions) {
    const seat = findSeatInDirection(coordinates, direction, board);

    if (seat !== null) {
      count += isSeatOccupied(seat, board) ? 1 : 0;
    }
  }

  return count;
};

const countOccupiedAdjacentSeats = (
  [i, j]: Coordinates,
  board: Board
): number => {
  let count = 0;

  if (i - 1 in board) {
    if (j - 1 in board) count += isSeatOccupied([i - 1, j - 1], board) ? 1 : 0;
    if (j + 1 in board) count += isSeatOccupied([i - 1, j + 1], board) ? 1 : 0;
    count += isSeatOccupied([i - 1, j], board) ? 1 : 0;
  }

  if (i + 1 in board) {
    if (j - 1 in board) count += isSeatOccupied([i + 1, j - 1], board) ? 1 : 0;
    if (j + 1 in board) count += isSeatOccupied([i + 1, j + 1], board) ? 1 : 0;
    count += isSeatOccupied([i + 1, j], board) ? 1 : 0;
  }

  if (j in board[0]) {
    count += isSeatOccupied([i, j - 1], board) ? 1 : 0;
    count += isSeatOccupied([i, j + 1], board) ? 1 : 0;
  }

  return count;
};

const simulateAdjacentSeatTurn = (board: Board): [Board, number] => {
  const nextTurnBoard: Board = [];
  let numChanges = 0;

  for (let i = 0; i < board.length; i++) {
    nextTurnBoard[i] = [];
    for (let j = 0; j < board[i].length; j++) {
      const currentSeat = board[i][j];

      if (
        currentSeat === "L" &&
        countOccupiedAdjacentSeats([i, j], board) === 0
      ) {
        nextTurnBoard[i].push("#");
        numChanges += 1;
      } else if (
        currentSeat === "#" &&
        countOccupiedAdjacentSeats([i, j], board) >= 4
      ) {
        nextTurnBoard[i].push("L");
        numChanges += 1;
      } else {
        nextTurnBoard[i].push(currentSeat);
      }
    }
  }

  return [nextTurnBoard, numChanges];
};

const simulateFirstSeatTurn = (board: Board): [Board, number] => {
  const nextTurnBoard: Board = [];
  let numChanges = 0;

  for (let i = 0; i < board.length; i++) {
    nextTurnBoard[i] = [];
    for (let j = 0; j < board[i].length; j++) {
      const currentSeat = board[i][j];

      if (currentSeat === "L" && countOccupiedFirstSeats([i, j], board) === 0) {
        nextTurnBoard[i].push("#");
        numChanges += 1;
      } else if (
        currentSeat === "#" &&
        countOccupiedFirstSeats([i, j], board) >= 5
      ) {
        nextTurnBoard[i].push("L");
        numChanges += 1;
      } else {
        nextTurnBoard[i].push(currentSeat);
      }
    }
  }

  return [nextTurnBoard, numChanges];
};

const getBoardFromInput = (input: string[]): Board => {
  const board: Board = [];

  for (let i = 0; i < input.length; i++) {
    board[i] = [];
    for (let j = 0; j < input[i].length; j++) {
      board[i].push(input[i][j]);
    }
  }

  return board;
};

var fs = require("fs");

const read = fs.readFileSync(`./q11/input.txt`);
const input: string[] = read.toString().split("\n");

let board: Board = getBoardFromInput(input);
let numChanges = -1;

while (numChanges !== 0) {
  [board, numChanges] = simulateAdjacentSeatTurn(board);
}

console.log("Part 1:", countOccupiedSeatsOnBoard(board));

board = getBoardFromInput(input);
numChanges = -1;

while (numChanges !== 0) {
  [board, numChanges] = simulateFirstSeatTurn(board);
}

console.log("Part 2:", countOccupiedSeatsOnBoard(board));

export {};
