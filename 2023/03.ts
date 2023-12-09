import fs from "fs";

let input = fs.readFileSync("./03.txt", "utf8");
let inputLines = input.split("\n");

const isAdjacentToSymbol = (
  numberStartIndex: number,
  numberEndIndex: number,
  currentLine: String,
  prevLine: string | undefined,
  nextLine: string | undefined
) => {
  let lines = [currentLine, prevLine, nextLine];
  for (let line of lines) {
    if (line) {
      let startSearch = Math.max(0, numberStartIndex - 1);
      let endSearch = numberEndIndex + 2;
      let numberSearchArea = line.slice(startSearch, endSearch);
      if (numberSearchArea.search(/[^\d\.]/) > -1) {
        return true;
      }
    }
  }
  return false;
};

let total = 0;

for (let lineIndex = 0; lineIndex < inputLines.length; lineIndex++) {
  let line = inputLines[lineIndex];
  let startSearchIndex = 0;
  while (startSearchIndex < line.length) {
    let numStartIndex = line.slice(startSearchIndex).search(/\d+/);
    if (numStartIndex > -1) {
      // number found
      numStartIndex = numStartIndex + startSearchIndex;
      let num = line[numStartIndex];
      let numEndIndex;
      let i = numStartIndex + 1;
      for (; i < line.length; i++) {
        if (line[i].search(/\d+/) > -1) {
          num = num.concat(line[i]);
        } else {
          break;
        }
      }
      numEndIndex = i - 1;

      let previousLine = inputLines[lineIndex - 1];
      let nextLine = inputLines[lineIndex + 1];
      if (
        isAdjacentToSymbol(
          numStartIndex,
          numEndIndex,
          line,
          previousLine,
          nextLine
        )
      ) {
        total += Number(num);
      }
      startSearchIndex = i;
    } else {
      startSearchIndex++;
    }
  }
}
console.log({ total });
