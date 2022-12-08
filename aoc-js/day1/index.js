const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n\n")
  .map((e) => e.split("\n").map((e) => Number(e)));

let elfTotal = [];

for (i of input) {
  const sum = i.reduce((acc, v) => acc + v, 0);
  elfTotal.push(sum);
}
console.warn("Part 1: ", elfTotal.sort((a, b) => b - a)[0]);
console.log("Part 2: ", elfTotal[0] + elfTotal[1] + elfTotal[2]);
