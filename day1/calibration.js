const { readFileSync } = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "document", "calibration.txt");
const calibrationDocument = readFileSync(filePath, "utf8");

const lines = calibrationDocument.trim().split("\n");

// const extractCalibrationValue = (line) => {
//   const digits = line.match(/\d/g);
//   const firstDigit = digits[0];
//   const lastDigit = digits[digits.length - 1];
//   const twoDigitNumber = Number(firstDigit + lastDigit);
//   return twoDigitNumber;
// };

// const calibrationValues = lines.map(extractCalibrationValue);

// const sum = calibrationValues.reduce((acc, value) => acc + value, 0);

// console.log(sum);

// Part 2

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

const extractCalibrationValue = (line) => {
  const digits = lineToDigits(line);
  const firstDigit = digits[0];
  const lastDigit = digits[digits.length - 1];
  const twoDigitNumber = Number(firstDigit + lastDigit);
  return twoDigitNumber;
};

const lineToDigits = (line) => {
  const digits = [];
  const digitMapKeys = Object.keys(digitMap);
  let currentDigit = "";
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (!isNaN(char)) {
      digits.push(char);
    } else {
      for (let j = 0; j < digitMapKeys.length; j++) {
        const digitMapKey = digitMapKeys[j];
        currentDigit = line.slice(i, i + digitMapKey.length);
        if (currentDigit === digitMapKey) {
          digits.push(digitMap[digitMapKey]);
          break;
        }
      }
    }
  }
  return digits;
};

const calibrationValues = lines.map(extractCalibrationValue);

const sum = calibrationValues.reduce((acc, value) => acc + value, 0);

console.log(sum);
