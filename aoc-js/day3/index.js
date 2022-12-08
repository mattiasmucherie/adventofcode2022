const path = require("path");
const fs = require("fs");

const data = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

// Part 1
const items = [];
for (i of data) {
  const firstPart = i.slice(0, i.length / 2).split("");
  const secondPart = i.slice(i.length / 2, i.length).split("");
  for (let j = 0; j < firstPart.length; j++) {
    if (secondPart.includes(firstPart[j])) {
      items.push(firstPart[j]);
      break;
    }
  }
}

const sum = items.reduce((prev, curr) => {
  return (
    prev +
    ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(curr) + 1)
  );
}, 0);

console.warn(sum);

// Part 2
const items2 = [];
for (let i = 0; i < data.length - 2; i += 3) {
  const first = data[i].split("");
  const second = data[i + 1].split("");
  const third = data[i + 2].split("");
  for (let j = 0; j < first.length; j++) {
    if (second.includes(first[j]) && third.includes(first[j])) {
      items2.push(first[j]);
      break;
    }
  }
}
const sum2 = items2.reduce((prev, curr) => {
  return (
    prev +
    ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(curr) + 1)
  );
}, 0);
console.log(sum2);
