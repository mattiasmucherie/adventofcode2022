const path = require("path");
const fs = require("fs");

const data = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim();

const CHARS = 14;

const fourCharSame = (arrayOfString) => {
  return new Set(arrayOfString).size !== arrayOfString.length;
};

const arrayData = data.split("");

for (let i = 0; i < arrayData.length - CHARS; i++) {
  const recentChar = arrayData.slice(i, i + CHARS);
  if (!fourCharSame(recentChar)) {
    console.warn(i + CHARS);
    break;
  }
}
