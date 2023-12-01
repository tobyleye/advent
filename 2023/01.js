import fs from "fs";

let input = fs.readFileSync("./01.txt", "utf-8");
let total = 0;
// input = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen`;

let lettersNumberMap = {
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

const expandLine = (line) => {
  line = line.toLowerCase();
  let group = "";
  let matches = [];
  let chars = line;
  for (let char of chars) {
    group += char;
    // console.log({ group });
    if (group in lettersNumberMap) {
      line = line.replace(group, lettersNumberMap[group]);
      group = "";
      matches = [];
    } else {
      matches = matches.length > 0 ? matches : Object.keys(lettersNumberMap);
      matches = matches.filter((each) => each.startsWith(group));
      if (matches.length === 0) {
        // reset group and matches
        group = char;
        matches = [];
      }
    }
  }
  return line;
};

const findFirstAndLastDigits = (line) => {
  let firstDigit = "";
  let lastDigit;

  let matches = [];
  let group = "";
  let firstDigitLastSearchIndex;

  let digits = "123456789";
  for (let i = 0; i < line.length; i++) {
    let char = line[i];
    if (digits.includes(char)) {
      firstDigit = char;
      firstDigitLastSearchIndex = i;
      break;
    } else {
      group += char;
      if (group in lettersNumberMap) {
        firstDigit = lettersNumberMap[group];
        firstDigitLastSearchIndex = i;
        group = "";
        matches = [];
        break;
      } else {
        matches = matches.length > 0 ? matches : Object.keys(lettersNumberMap);
        matches = matches.filter((each) => each.startsWith(group));
        if (matches.length === 0) {
          // reset group and matches
          group = char;
          matches = [];
        }
      }
    }
  }

  for (let i = line.length - 1; i > firstDigitLastSearchIndex; i--) {
    let char = line[i];
    if (digits.includes(char)) {
      lastDigit = char;
      break;
    } else {
      group = char + group;
      //   console.log({ group });
      if (group in lettersNumberMap) {
        lastDigit = lettersNumberMap[group];
        group = "";
        matches = [];
        break;
      } else {
        matches = matches.length > 0 ? matches : Object.keys(lettersNumberMap);
        matches = matches.filter((each) => each.endsWith(group));
        if (matches.length === 0) {
          // reset group and matches
          group = char;
          matches = [];
        }
      }
    }
  }

  if (!lastDigit) {
    lastDigit = firstDigit;
  }
  //   console.log({ firstDigit });
  return firstDigit.concat(lastDigit);
};

console.log({
  expandedLine: findFirstAndLastDigits("5vgftjvqkxj6pnctdcrktwoneq"),
});

// replace all numbers spelled as letters
// for (let key in lettersNumberMap) {
//   input = input.replaceAll(key, lettersNumberMap[key]);
// }

// console.log({ input });

input.split("\n").forEach((line, index) => {
  let digits = findFirstAndLastDigits(line);
  console.log({ index: index + 1, digits });
  //   let digits = line.replace(/[^0-9]/g, "");
  //   let firstDigit = digits[0] ?? "";
  //   let lastDigits = digits[digits.length - 1];
  //   console.log({ index: index + 1, firstDigit, lastDigits });
  //   let combine = firstDigit.concat(lastDigits);
  total += Number(digits);
});

console.log({ total });
