import { test } from "vitest";

const path = require("path");
const fs = require("fs");

function day7() {
  const input = fs
    .readFileSync(path.join(__dirname, "../input.txt"), "utf8")
    .toString()
    .trim()
    .split("\n");
  const fileDirectory = new Map<string, number>();
  let pwd: string[] = ["/"];
  for (let i = 0; i < input.length; i++) {
    if (input[i].startsWith("$ cd")) {
      const [_, __, dir] = input[i].split(" ");
      if (dir === "/") {
        pwd = ["/"];
      } else if (dir === "..") {
        pwd.pop();
      } else {
        pwd.push(dir);
      }
    } else if (!input[i].startsWith("$") && !input[i].startsWith("dir")) {
      // Add to dir and also parent dir
      const [size] = input[i].split(" ");
      let prevPath = "";
      for (let path of pwd) {
        prevPath += path;
        fileDirectory.set(
          prevPath,
          (fileDirectory.get(prevPath) ?? 0) + parseInt(size)
        );
        prevPath += "/";
      }
    }
  }
  const needToBeFree = fileDirectory.get("/")! - (70000000 - 30000000);
  let bestToDelete = 9999999999;
  let sum = 0;
  fileDirectory.forEach((value) => {
    if (value < 100000) {
      sum += value;
    }
    if (value >= needToBeFree) {
      bestToDelete = Math.min(value, bestToDelete);
    }
  });
  console.warn("sum", sum);

  console.warn("best to delete", bestToDelete);
}

test("day7", () => {
  day7();
});
