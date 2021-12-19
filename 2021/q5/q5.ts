import * as fs from "fs";
import * as path from "path";
import { printResult } from "../print";

const textFile = fs.readFileSync(path.resolve(__dirname, "input.txt"));

type Coordinate = {
  x: number;
  y: number;
};

type Line = {
  start: Coordinate;
  end: Coordinate;
};

const lines: Line[] = textFile
  .toString()
  .split("\n")
  .map((line) => {
    const coordinates = line.split(" -> ").map((coordinate) => {
      const values = coordinate.split(",").map((value) => Number(value));
      return { x: values[0], y: values[1] } as Coordinate;
    });

    return { start: coordinates[0], end: coordinates[1] };
  });

const filterOutDiagonalLines = (lines: Line[]) =>
  lines.filter(
    (line) => line.start.x === line.end.x || line.start.y === line.end.y
  );

const countCollisions = (grid: number[][]) => {
  let answer = 0;

  for (let i = 0; i < grid.length; i++) {
    if (grid[i]) {
      for (let j = 0; j < grid[i].length; j++) {
        const square = grid[i][j];
        if (square && square > 1) {
          answer++;
        }
      }
    }
  }

  return answer;
};

const mapHorizontalLines = (
  grid: number[][],
  start: Coordinate,
  end: Coordinate
) => {
  if (!grid[start.x]) {
    grid[start.x] = [];
  }

  let low = Math.min(start.y, end.y);
  let high = Math.max(start.y, end.y);

  for (let i = low; i <= high; i++) {
    const currentValue = grid[start.x][i];
    grid[start.x][i] = (currentValue || 0) + 1;
  }
};

const mapVerticalLines = (
  grid: number[][],
  start: Coordinate,
  end: Coordinate
) => {
  let low = Math.min(start.x, end.x);
  let high = Math.max(start.x, end.x);

  for (let i = low; i <= high; i++) {
    if (!grid[i]) {
      grid[i] = [];
    }

    const currentValue = grid[i][start.y];
    grid[i][start.y] = (currentValue || 0) + 1;
  }
};

const mapDiagonalLines = (
  grid: number[][],
  start: Coordinate,
  end: Coordinate
) => {
  const numRequiredSteps = Math.abs(start.x - end.x);
  let currentStep = 0;
  let { x: currentX, y: currentY } = start;

  let xIncrement = start.x < end.x ? 1 : -1;
  let yIncrement = start.y < end.y ? 1 : -1;

  while (currentStep <= numRequiredSteps) {
    if (!grid[currentX]) {
      grid[currentX] = [];
    }

    const currentValue = grid[currentX][currentY];
    grid[currentX][currentY] = (currentValue || 0) + 1;

    currentX += xIncrement;
    currentY += yIncrement;
    currentStep += 1;
  }
};

const part1 = () => {
  const filteredLines = filterOutDiagonalLines(lines);
  const mappedGrid: number[][] = [];

  for (const { start, end } of filteredLines) {
    if (start.x === end.x && start.y !== end.y) {
      mapHorizontalLines(mappedGrid, start, end);
    } else if (start.x !== end.x && start.y === end.y) {
      mapVerticalLines(mappedGrid, start, end);
    }
  }

  let answer = countCollisions(mappedGrid);

  printResult(answer);
};

const part2 = () => {
  const mappedGrid: number[][] = [];

  for (const { start, end } of lines) {
    if (start.x === end.x && start.y !== end.y) {
      mapHorizontalLines(mappedGrid, start, end);
    } else if (start.x !== end.x && start.y === end.y) {
      mapVerticalLines(mappedGrid, start, end);
    } else {
      mapDiagonalLines(mappedGrid, start, end);
    }
  }

  let answer = countCollisions(mappedGrid);

  printResult(answer);
};

part1();
part2();
