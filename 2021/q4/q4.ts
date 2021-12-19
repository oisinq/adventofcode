import * as fs from "fs";
import * as path from "path";
import { printResult } from "../print";

const read = fs.readFileSync(path.resolve(__dirname, "input.txt"));
const sections = read.toString().split("\n\n");

type BingoSquare = {
  value: number;
  marked: boolean;
};

type BingoCard = {
  squares: BingoSquare[][];
  won: boolean;
};

const calledNumbers = sections[0]
  .split(",")
  .map((numberStr) => Number(numberStr));

let bingoCards: BingoCard[];

const setUpCards = () => {
  bingoCards = sections
    .slice(1)
    .map((section) => {
      const splitLines = section.split("\n");

      return splitLines
        .map((line) => line.trimStart())
        .map((trimmedLine) => trimmedLine.split(/[ ]+/))
        .map((splitLine) =>
          splitLine.map((value) => ({ value: Number(value), marked: false }))
        );
    })
    .map((rawCard) => ({
      squares: rawCard,
      won: false,
    }));
};

const markBingoCard = (bingoCard: BingoCard, calledNumber: number) => {
  for (const row of bingoCard.squares) {
    for (const square of row) {
      if (square.value === calledNumber) {
        square.marked = true;
        return;
      }
    }
  }
};

const checkBingoSequence = (bingoSequence: BingoSquare[]) => {
  return bingoSequence.every((square) => square.marked);
};

const checkBingoCard = (bingoCard: BingoCard) => {
  const transposedCard = bingoCard.squares[0].map((_, colIndex) =>
    bingoCard.squares.map((row) => row[colIndex])
  );

  for (const row of bingoCard.squares) {
    const rowWin = checkBingoSequence(row);

    if (rowWin) {
      bingoCard.won = true;
      return true;
    }
  }

  for (const column of transposedCard) {
    const columnWin = checkBingoSequence(column);

    if (columnWin) {
      bingoCard.won = true;
      return true;
    }
  }

  return false;
};

const calculateUnmarkedSum = (bingoCard: BingoCard) => {
  return bingoCard.squares.reduce(
    (cardSum, row) =>
      cardSum +
      row
        .filter((square) => !square.marked)
        .reduce((rowSum, square) => rowSum + square.value, 0),
    0
  );
};

const part1 = () => {
  setUpCards();

  for (const calledNumber of calledNumbers) {
    for (const bingoCard of bingoCards) {
      markBingoCard(bingoCard, calledNumber);

      const win = checkBingoCard(bingoCard);

      if (win) {
        const unmarkedSum = calculateUnmarkedSum(bingoCard);

        printResult(unmarkedSum * calledNumber);
        return;
      }
    }
  }
};

const part2 = () => {
  setUpCards();

  let lastCard: BingoCard | undefined = undefined;

  for (const [calledNumberIndex, calledNumber] of calledNumbers.entries()) {
    for (const bingoCard of bingoCards) {
      markBingoCard(bingoCard, calledNumber);
      checkBingoCard(bingoCard);
    }

    const unwonCards = bingoCards.filter((card) => !card.won);

    if (unwonCards.length === 1) {
      lastCard = unwonCards[0];
    }

    if (unwonCards.length === 0 && lastCard) {
      const unmarkedSum = calculateUnmarkedSum(lastCard);
      printResult(unmarkedSum * calledNumber);
      return;
    }
  }
};

part1();
part2();
