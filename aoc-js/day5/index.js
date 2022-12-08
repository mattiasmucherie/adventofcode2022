const data = {
  1: "DHNQTWVB".split(""),
  2: "DWB".split(""),
  3: "TSQWJC".split(""),
  4: "FJRNZTP".split(""),
  5: "GPVJMST".split(""),
  6: "BWFTN".split(""),
  7: "BLDQFHVN".split(""),
  8: "HPFR".split(""),
  9: "ZSMBLNPH".split(""),
};

const path = require("path");
const fs = require("fs");

const instructions = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

// console.warn(data);
for (i of instructions) {
  const amount = parseInt(i.match(/(?<=move\s).*?(?=\s+from)/gs));
  const from = parseInt(i.match(/(?<=from\s).*?(?=\s+to)/gs));
  const to = parseInt(i.slice(-1));
  const letters = data[from].splice(-amount, amount);
  data[to].push(...letters);
}
// console.warn(data);
for (d in data) {
  console.warn(data[d].at(-1));
}
