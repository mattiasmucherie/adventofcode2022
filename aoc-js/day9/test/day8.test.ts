import { expect, test } from "vitest";

const dirs = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, 1],
  D: [0, -1],
};

function day9(knots: number, file: string): number {
  const input: string = require("fs").readFileSync(file, "utf8").split("\n");
  const tailPlaces = new Set<string>();

  let rope = Array.from({ length: knots }, () => [0, 0]);

  for (let i of input) {
    const [direction, stepsString] = i.split(" ");
    const steps = Number(stepsString);

    for (let s = 0; s < steps; s++) {
      // Set HEAD
      rope[0] = rope[0].map((v, d) => v + dirs[direction][d]);
      // Set Knots
      for (let j = 1; j < knots; j++) {
        // Check if further than one dir away
        if (rope[j - 1].some((v, d) => Math.abs(v - rope[j][d]) > 1)) {
          rope[j] = rope[j].map((v, d) => v + Math.sign(rope[j - 1][d] - v));
        }
      }

      tailPlaces.add(`${rope[knots - 1][0]},${rope[knots - 1][1]}`);
    }
  }

  return tailPlaces.size;
}

test("day9", () => {
  expect(day9(2, "tinput.txt")).toBe(13);
  expect(day9(10, "tinput.txt")).toBe(1);
  expect(day9(2, "input.txt")).toBe(6376);
  expect(day9(10, "input.txt")).toBe(2607);
});
