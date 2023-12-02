import fs from "fs";

let input = fs.readFileSync("./01.txt", "utf-8");
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
for (let key in lettersNumberMap) {
  input = input.replaceAll(key, lettersNumberMap[key]);
}

input.split("\n").forEach((line) => {
  let digits = line.replace(/[^0-9]/g, "");
  let firstDigit = digits[0] ?? "";
  let lastDigits = digits[digits.length - 1];
  let firstLastDigits = firstDigit.concat(lastDigits);
  total += Number(firstLastDigits);
});

console.log({ total });
