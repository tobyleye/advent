import fs from "fs";

let input = fs.readFileSync("./04.txt", "utf8").trim();

const trim = (string: string) => string.trim();

const getMatchingNumbers = (line: string) => {
  let [card, numbers] = line.split(": ");
  let numbersPart = numbers.split(" | ");
  let winningNumbers = trim(numbersPart[0]).split(/\s+/).map(trim);
  let pickedNumbers = trim(numbersPart[1]).split(/\s+/).map(trim);
  let winningNumbersMap: Record<string, 1 | 0> = {};
  winningNumbers.forEach((num) => {
    winningNumbersMap[num] = 1;
  });

  let matchingNumbers = 0;
  pickedNumbers.forEach((num) => {
    if (winningNumbersMap[num] === 1) {
      matchingNumbers += 1;
    }
  });
  return { card, matchingNumbers };
};

const part1 = () => {
  let totalPoints = 0;
  input.split("\n").forEach((line) => {
    let { matchingNumbers } = getMatchingNumbers(line);
    let cardPoints =
      matchingNumbers > 1 ? 2 ** (matchingNumbers - 1) : matchingNumbers;
    totalPoints += cardPoints;
  });

  console.log("part 1:", { totalPoints });
};

const part2 = () => {
  let cardInstances: Record<number, number> = {};

  let inputLines = input.split("\n");
  let total = 0;
  inputLines.forEach((line, index) => {
    // cards are arranged serially so we can just use index
    let cardNo = index + 1;
    cardInstances[cardNo] = (cardInstances[cardNo] ?? 0) + 1;

    let { matchingNumbers } = getMatchingNumbers(line);

    let lastWinningCardNo = Math.min(
      cardNo + matchingNumbers,
      inputLines.length
    );
    for (let j = 0; j < cardInstances[cardNo]; j++) {
      for (let i = cardNo + 1; i <= lastWinningCardNo; i++) {
        cardInstances[i] = (cardInstances[i] ?? 0) + 1;
      }
    }
    total += cardInstances[cardNo];
  });
  console.log("part 2", { total });
};

part1();
part2();
