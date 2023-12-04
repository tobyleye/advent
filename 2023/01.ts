import fs from "fs";

let input = fs.readFileSync("./01.txt", "utf-8");

const extractFirstAndLastDigits = (line: string) => {
  let digits = line.replace(/[^0-9]/g, "");
  let firstDigit = digits[0] ?? "";
  let lastDigits = digits[digits.length - 1];
  return firstDigit.concat(lastDigits);
};

const part1 = () => {
  let total = 0;
  input.split("\n").forEach((line) => {
    let firstLastDigits = extractFirstAndLastDigits(line);
    total += Number(firstLastDigits);
  });
  console.log("part 1:", { total });
};

const part2 = () => {
  let total = 0;
  let lettersNumberMap = {
    one: "on1e",
    two: "tw2o",
    three: "thre3e",
    four: "fou4r",
    five: "fiv5e",
    six: "si6x",
    seven: "seve7n",
    eight: "eigh8t",
    nine: "nin9e",
  };

  // replace all numbers spelled as letters
  let inputCopy = input;

  for (let key in lettersNumberMap) {
    // line below looks weird
    let keyValue = lettersNumberMap[key as keyof typeof lettersNumberMap];
    inputCopy = inputCopy.replaceAll(key, keyValue);
  }

  inputCopy.split("\n").forEach((line) => {
    let firstLastDigits = extractFirstAndLastDigits(line);
    total += Number(firstLastDigits);
  });
  console.log("part 2:", { total });
};

part1();
part2();
