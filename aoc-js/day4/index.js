const path = require("path");
const fs = require("fs");

const data = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

function contains(range1, range2) {
  if (
    parseInt(range1[0]) <= parseInt(range2[0]) &&
    parseInt(range1[1]) >= parseInt(range2[1])
  ) {
    return true;
  } else if (
    parseInt(range1[0]) >= parseInt(range2[0]) &&
    parseInt(range1[1]) <= parseInt(range2[1])
  ) {
    return true;
  } else {
    return false;
  }
}
function overlaps(range1, range2) {
  if (
    parseInt(range1[0]) <= parseInt(range2[0]) &&
    parseInt(range1[1]) >= parseInt(range2[0])
  ) {
    return true;
  } else if (
    parseInt(range1[0]) >= parseInt(range2[0]) &&
    parseInt(range1[0]) <= parseInt(range2[1])
  ) {
    return true;
  } else {
    return false;
  }
}

let sum = 0; // part 1
let sum2 = 0; // part 2
for (i of data) {
  const [rangeOne, rangeTwo] = i.split(",").map((a) => a.split("-"));

  if (contains(rangeOne, rangeTwo)) {
    sum += 1;
  }

  if (overlaps(rangeOne, rangeTwo)) {
    sum2 += 1;
  }
}
console.log(sum, sum2);
