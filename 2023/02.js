import fs from "fs";

let input = fs.readFileSync("./02.txt", "utf8");

let parseLine = (line) => {
  let [gameId, game] = line.split(":").map((each) => each.trim());
  gameId = +gameId.split(" ")[1];

  let sets = [];

  game.split("; ").forEach((set) => {
    set = set.trim();
    let totalColors = {
      red: 0,
      green: 0,
      blue: 0,
    };
    set.split(", ").forEach((ballDrawn) => {
      let [timesDrawn, color] = ballDrawn.split(" ");
      timesDrawn = Number(timesDrawn);
      totalColors[color] += timesDrawn;
    });
    sets.push(totalColors);
  });

  return [gameId, sets];
};

const part1 = () => {
  let totalGameIds = 0;
  let max = {
    red: 12,
    green: 13,
    blue: 14,
  };
  input.split("\n").forEach((line) => {
    let [gameId, sets] = parseLine(line);
    for (let set of sets) {
      if (set.red > max.red || set.green > max.green || set.blue > max.blue) {
        return;
      }
    }
    totalGameIds += gameId;
  });
  console.log("part 1:", { totalGameIds });
};

const part2 = () => {
  let sumOfPower = 0;
  input.split("\n").forEach((line) => {
    let [, sets] = parseLine(line);
    let minimumSet = { red: 0, green: 0, blue: 0 };
    sets.forEach((set) => {
      for (let color of Object.keys(minimumSet)) {
        if (set[color] > minimumSet[color]) {
          minimumSet[color] = set[color];
        }
      }
    });
    let power = minimumSet.red * minimumSet.green * minimumSet.blue;

    sumOfPower += power;
  });
  console.log("part 2:", { sumOfPower });
};

part1();
part2();
