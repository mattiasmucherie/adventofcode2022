import { test } from "vitest";

const edges = (matrix: string[][]) => {
  const map = new Map<string, boolean>();
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (
        row === 0 ||
        col === 0 ||
        row === matrix.length - 1 ||
        col === matrix[row].length - 1
      ) {
        map.set(`${col},${row}`, true);
      }
    }
  }
  return map.size;
};

const isVisible = (row: number, col: number, matrix: string[][]) => {
  const visibleTrees = (arr: string[]) => {
    return Math.max(...arr.map((t) => Number(t))) < Number(matrix[row][col]);
  };

  // Check left tree
  const treesToTheLeft = matrix[row].slice(0, col);
  const visibleFromLeft = visibleTrees(treesToTheLeft);

  // Check right tree
  const treesToTheRight = matrix[row].slice(col + 1, matrix[row].length);
  const visibleFromRight = visibleTrees(treesToTheRight);

  const invertedMatrix = matrix.map((_, colIndex) =>
    matrix.map((row) => row[colIndex])
  );

  // CHeck from top
  const treesAbove = invertedMatrix[col].slice(0, row);
  const visibleFromTop = visibleTrees(treesAbove);

  // CHeck from bottom
  const treesBelow = invertedMatrix[col].slice(row + 1, matrix[row].length);
  const visibleFromBelow = visibleTrees(treesBelow);

  return (
    visibleFromLeft || visibleFromRight || visibleFromTop || visibleFromBelow
  );
};

const calcScore = (arr: string[], curr: string) => {
  let pLeft = 0;
  for (let t = 0; t < arr.length; t++) {
    if (parseInt(arr[t]) < parseInt(curr)) {
      pLeft++;
    } else {
      pLeft++;
      break;
    }
  }
  return pLeft;
};
const scenicScore = (row: number, col: number, matrix: string[][]) => {
  // Left
  const treesToTheLeft = matrix[row].slice(0, col).reverse();
  const pLeft = calcScore(treesToTheLeft, matrix[row][col]);
  // Right
  const treesToTheRight = matrix[row].slice(col + 1, matrix[row].length);
  const pRight = calcScore(treesToTheRight, matrix[row][col]);

  const invertedMatrix = matrix.map((_, colIndex) =>
    matrix.map((row) => row[colIndex])
  );

  // Check from top
  const treesAbove = invertedMatrix[col].slice(0, row).reverse();
  const pTop = calcScore(treesAbove, matrix[row][col]);

  // Check from bottom
  const treesBelow = invertedMatrix[col].slice(row + 1, matrix[row].length);
  const pBelow = calcScore(treesBelow, matrix[row][col]);

  return pLeft * pRight * pTop * pBelow;
};

function day8() {
  const input: string = require("fs").readFileSync("input.txt", "utf8");
  const matrix = input
    .trim()
    .split("\n")
    .map((row) => row.split(""));
  let visibleTrees = edges(matrix);
  for (let r = 1; r < matrix.length - 1; r++) {
    for (let c = 1; c < matrix[r].length - 1; c++) {
      if (isVisible(r, c, matrix)) {
        visibleTrees++;
      }
    }
  }
  let bestScore = 0;
  let colrow = [];
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      const score = scenicScore(r, c, matrix);
      if (score > bestScore) {
        bestScore = score;
        colrow = [r, c];
      }
    }
  }
  console.warn("visible trees are:", visibleTrees);
  console.warn(
    "Best score is:",
    bestScore,
    "at row ",
    colrow[0],
    "and column ",
    colrow[1]
  );
}

test("day8", () => {
  day8();
});
