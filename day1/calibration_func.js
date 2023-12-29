const { readFileSync } = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "document", "calibration.txt");
const calibrationDocument = readFileSync(filePath, "utf8");

const lines = calibrationDocument.trim().split("\n");

const digitMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const compose =
  (...functions) =>
  (input) =>
    functions.reduce((result, fn) => fn(result), input);

const parseLineToDigits = (line) => {
  const digitMapKeys = Object.keys(digitMap);
  return (digits = Array.from(line)
    .map((char, i) => {
      return isNaN(char)
        ? digitMap[
            digitMapKeys.find((key) => key === line.slice(i, i + key.length))
          ]
        : char;
    })
    .filter((digit) => digit));
};

const calculateCalibrationValue = (digits) => {
  const firstDigit = digits[0];
  const lastDigit = digits[digits.length - 1];
  return Number(firstDigit + lastDigit);
};

const processLine = compose(parseLineToDigits, calculateCalibrationValue);

const calibrationValues = lines.map(processLine);

const sum = calibrationValues.reduce(
  (accumulator, value) => accumulator + value,
  0
);

console.log(sum);
