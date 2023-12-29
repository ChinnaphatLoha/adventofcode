const { readFileSync } = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "document", "instructions.txt");
const instructions = readFileSync(filePath, "utf8");

const findFloor = (instructions) =>
  Array.from(instructions).reduce((floor, instruction) => {
    return instruction === "(" ? floor + 1 : floor - 1;
  }, 0);

console.log(findFloor(instructions));
