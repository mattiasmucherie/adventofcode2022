import { expect, test } from "vitest";

// Can't run test with this... Run it solo if you want.
let visualize = false;

const printGrid = (grid: string[][]) => {
  process.stdout.write("\n");
  grid.forEach((g) => {
    g.forEach((gg) => {
      if (gg === "o" || gg == "i") {
        process.stdout.write(`\x1b[93m${gg}\x1b[39m`);
      } else {
        process.stdout.write(gg);
      }
    });
    process.stdout.write("\n");
  });
  process.stdout.write("\n");
};
const createGrid = (lines: number[][][]) => {
  let mostLeft = 999;
  let mostRight = 0;
  lines.forEach((l) =>
    l.forEach((ll) => {
      if (ll[0] < mostLeft) {
        mostLeft = ll[0];
      }
    })
  );
  lines.forEach((l) =>
    l.forEach((ll) => {
      if (ll[0] > mostRight) {
        mostRight = ll[0];
      }
    })
  );
  let mostDown = 0;
  lines.forEach((l) =>
    l.forEach((ll) => {
      if (ll[1] > mostDown) {
        mostDown = ll[1];
      }
    })
  );
  const columns = mostRight - mostLeft + 1;

  const grid: string[][] = [];
  for (let row = 0; row <= mostDown; row++) {
    grid[row] = new Array(columns).fill(" ");
  }
  let [prevRow, prevCol]: number[] | undefined[] = [undefined, undefined];
  lines.forEach((line) => {
    line.forEach((com) => {
      if (prevCol === undefined && prevRow === undefined) {
        grid[com[1]][com[0] - mostLeft] = "#";
        prevCol = com[0] - mostLeft;
        prevRow = com[1];
      } else {
        if (prevRow !== com[1]) {
          if (prevRow < com[1]) {
            for (let row = prevRow; row <= com[1]; row++) {
              grid[row][com[0] - mostLeft] = "#";
            }
          } else {
            for (let row = com[1]; row <= prevRow; row++) {
              grid[row][com[0] - mostLeft] = "#";
            }
          }
        }
        if (prevCol !== com[0] - mostLeft) {
          if (prevCol < com[0] - mostLeft) {
            for (let col = prevCol; col <= com[0] - mostLeft; col++) {
              grid[com[1]][col] = "#";
            }
          } else {
            for (let col = com[0] - mostLeft; col <= prevCol; col++) {
              grid[com[1]][col] = "#";
            }
          }
        }
        prevCol = com[0] - mostLeft;
        prevRow = com[1];
      }
    });
    prevCol = undefined;
    prevRow = undefined;
  });
  const startPoint = [0, 500 - mostLeft];
  grid[startPoint[0]][startPoint[1]] = "+";
  return { grid, startPoint };
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const day14a = async (file: string) => {
  const input: string = require("fs").readFileSync(file, "utf8");
  let lines = input
    .split("\n")
    .map((l) => l.split(" -> ").map((c) => c.split(",").map((n) => Number(n))));

  let sandUnit = 0;
  const { grid, startPoint } = createGrid(lines);

  let reachedAbyss = false;
  const placeAndPrint = async (point: number[]) => {
    if (visualize) {
      grid[point[0]][point[1]] = "o";
      printGrid(grid);
      console.warn(point, "#", sandUnit);
      await delay(50);
      console.clear();
    }

    grid[point[0]][point[1]] = "o";
    sandUnit++;
  };
  const printSandCorn = async (point: number[]) => {
    if (visualize) {
      const material = grid[point[0]][point[1]];
      grid[point[0]][point[1]] = "i";
      printGrid(grid);
      console.warn(point, "#", sandUnit);
      await delay(50);
      console.clear();
      grid[point[0]][point[1]] = material;
    }
  };
  const placeSanUnit = async (start: number[]) => {
    for (let row = start[0] + 1; row <= grid.length; row++) {
      await printSandCorn([row - 1, start[1]]);
      if (row === grid.length) {
        reachedAbyss = true;
        break;
      }
      const isEmptyBelow = grid[row][start[1]] === " ";
      const isRockBedBelow =
        grid[row][start[1]] === "#" &&
        grid[row][start[1] - 1] === "#" &&
        grid[row][start[1] + 1] === "#";
      const isSandBelow = grid[row][start[1]] === "o";
      const isRockBelow = grid[row][start[1]] === "#";

      if (isEmptyBelow) {
        continue;
      } else if (isRockBedBelow) {
        await placeAndPrint([row - 1, start[1]]);
        break;
      } else if (isRockBelow || isSandBelow) {
        if (row === grid.length) {
          reachedAbyss = true;
          break;
        }
        if (grid[row][start[1] - 1] === " ") {
          await placeSanUnit([row, start[1] - 1]);
        } else if (grid[row][start[1] + 1] === " ") {
          await placeSanUnit([row, start[1] + 1]);
        } else if (
          (grid[row][start[1] - 1] === "o" ||
            grid[row][start[1] - 1] === "#") &&
          (grid[row][start[1] + 1] === "o" || grid[row][start[1] + 1] === "#")
        ) {
          await placeAndPrint([row - 1, start[1]]);
        } else {
          reachedAbyss = true;
        }
        break;
      }
      reachedAbyss = true;
    }
  };
  while (!reachedAbyss) {
    await placeSanUnit(startPoint);
  }
  if (visualize) printGrid(grid);
  return sandUnit;
};

test("day14a", async () => {
  expect(await day14a("tinput.txt")).toBe(24);
  expect(await day14a("input.txt")).toBe(1406);
});
