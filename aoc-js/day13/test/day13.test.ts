import { expect, test } from "vitest";

const compareValues = (left: any, right: any) => {
  if (Number.isInteger(left) && Number.isInteger(right)) {
    if (left > right) return false;
    if (left < right) return true;
    return null;
  } else if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      let result = compareValues(left[i], right[i]);
      if (result != null) return result;
    }

    if (left.length < right.length) return true;
    else if (left.length > right.length) return false;
    return null;
  } else {
    return compareValues(
      typeof left == "number" ? [left] : left,
      typeof right == "number" ? [right] : right
    );
  }
};

const day13a = (file: string) => {
  const input: string = require("fs").readFileSync(file, "utf8");

  return input.split("\n\n").reduce((acc, lines, index) => {
    let [left, right] = lines.split("\n").map((element) => JSON.parse(element));

    if (compareValues(left, right)) acc += index + 1;
    return acc;
  }, 0);
};

const day13b = (file: string) => {
  const input: string = require("fs").readFileSync(file, "utf8");
  let lines = input
    .split("\n")
    .filter((element) => element != "")
    .map((line) => JSON.parse(line));
  lines.push([[2]], [[6]]);
  lines.sort((left, right) => {
    let result = compareValues(left, right);
    if (result != null) return result ? -1 : 1;
    else return 0;
  });

  let first = -1,
    second = -1;
  for (let i = 0; i < lines.length; i++) {
    if (JSON.stringify(lines[i]) == "[[2]]") first = i + 1;
    if (JSON.stringify(lines[i]) == "[[6]]") second = i + 1;
  }

  return first * second;
};

test("day13", () => {
  expect(day13a("tinput.txt")).toBe(13);
  expect(day13a("input.txt")).toBe(5808);
  expect(day13b("tinput.txt")).toBe(140);
  expect(day13b("input.txt")).toBe(22713);
});
