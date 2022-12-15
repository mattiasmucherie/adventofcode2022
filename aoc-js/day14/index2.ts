const createGrid = (lines: number[][][]) => {
  let mostDown = 0;
  lines.forEach((l) =>
    l.forEach((ll) => {
      if (ll[1] > mostDown) {
        mostDown = ll[1];
      }
    })
  );
  // Set a endless thing at y  + 2
  mostDown += 2;
  const columns = 500 + mostDown + 10;

  const grid: string[][] = [];
  for (let row = 0; row <= mostDown; row++) {
    if (row === mostDown) {
      grid[row] = new Array(columns).fill("#");
      break;
    }
    grid[row] = new Array(columns).fill(".");
  }
  let [prevRow, prevCol]: number[] | undefined[] = [undefined, undefined];
  lines.forEach((line) => {
    line.forEach((com) => {
      if (prevCol === undefined && prevRow === undefined) {
        grid[com[1]][com[0]] = "#";
        prevCol = com[0];
        prevRow = com[1];
      } else {
        if (prevRow !== com[1]) {
          if (prevRow < com[1]) {
            for (let row = prevRow; row <= com[1]; row++) {
              grid[row][com[0]] = "#";
            }
          } else {
            for (let row = com[1]; row <= prevRow; row++) {
              grid[row][com[0]] = "#";
            }
          }
        }
        if (prevCol !== com[0]) {
          if (prevCol < com[0]) {
            for (let col = prevCol; col <= com[0]; col++) {
              grid[com[1]][col] = "#";
            }
          } else {
            for (let col = com[0]; col <= prevCol; col++) {
              grid[com[1]][col] = "#";
            }
          }
        }
        prevCol = com[0];
        prevRow = com[1];
      }
    });
    prevCol = undefined;
    prevRow = undefined;
  });
  const startPoint = [0, 500];
  grid[startPoint[0]][startPoint[1]] = "+";
  return { grid, startPoint };
};

const day14b = async (file: string) => {
  const input: string = require("fs").readFileSync(file, "utf8");
  let lines = input
    .split("\n")
    .map((l) => l.split(" -> ").map((c) => c.split(",").map((n) => Number(n))));

  let sandUnit = 0;
  const { grid, startPoint } = createGrid(lines);
  let reachedAbyss = false;
  const placeSand = async (point: number[]) => {
    grid[point[0]][point[1]] = "o";
    sandUnit++;
    if (point[0] === 0) {
      reachedAbyss = true;
    }
  };

  const placeSanUnit = async (start: number[]) => {
    for (let row = start[0] + 1; row <= grid.length; row++) {
      const isEmptyBelow = grid[row][start[1]] === ".";
      const isRockBedBelow =
        grid[row][start[1]] === "#" &&
        grid[row][start[1] - 1] === "#" &&
        grid[row][start[1] + 1] === "#";
      const isSandBelow = grid[row][start[1]] === "o";
      const isRockBelow = grid[row][start[1]] === "#";

      if (isEmptyBelow) {
        continue;
      } else if (isRockBedBelow) {
        await placeSand([row - 1, start[1]]);
        break;
      } else if (isRockBelow || isSandBelow) {
        if (row === grid.length) {
          reachedAbyss = true;
          break;
        }
        if (grid[row][start[1] - 1] === ".") {
          await placeSanUnit([row, start[1] - 1]);
        } else if (grid[row][start[1] + 1] === ".") {
          await placeSanUnit([row, start[1] + 1]);
        } else if (
          (grid[row][start[1] - 1] === "o" ||
            grid[row][start[1] - 1] === "#") &&
          (grid[row][start[1] + 1] === "o" || grid[row][start[1] + 1] === "#")
        ) {
          await placeSand([row - 1, start[1]]);
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
  return sandUnit;
};

day14b("input.txt");
