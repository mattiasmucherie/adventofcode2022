const path = require("path");
const fs = require("fs");

const data = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

let scorePart1 = 0;
let scorePart2 = 0;
for (round of data) {
  const [a, b] = round.split(" ");
  // Part 1

  if (b === "X") {
    scorePart1 += 1;
    if (a === "A") {
      scorePart1 += 3;
    }
    if (a === "C") {
      scorePart1 += 6;
    }
  } else if (b === "Y") {
    scorePart1 += 2;
    if (a === "B") {
      scorePart1 += 3;
    }
    if (a === "A") {
      scorePart1 += 6;
    }
  } else if (b === "Z") {
    scorePart1 += 3;
    if (a === "C") {
      scorePart1 += 3;
    }
    if (a === "B") {
      scorePart1 += 6;
    }
  }

  // Part 2
  if (b === "X") {
    if (a === "A") {
      scorePart2 += 3;
    } else if (a === "B") {
      scorePart2 += 1;
    } else if (a === "C") {
      scorePart2 += 2;
    }
  } else if (b === "Y") {
    scorePart2 += 3;
    if (a === "A") {
      scorePart2 += 1;
    } else if (a === "B") {
      scorePart2 += 2;
    } else if (a === "C") {
      scorePart2 += 3;
    }
  } else if (b === "Z") {
    scorePart2 += 6;
    if (a === "A") {
      scorePart2 += 2;
    } else if (a === "B") {
      scorePart2 += 3;
    } else if (a === "C") {
      scorePart2 += 1;
    }
  }
}

console.warn("Part 1: ", scorePart1);
console.log("Part 2: ", scorePart2);
