import fs from "fs";

let input = fs.readFileSync("./02.txt", "utf8");

let parseLine = (line: string) => {
  let lineParts = line.split(":").map((each) => each.trim());
  let game = lineParts[1];
  let gameId = Number(lineParts[0].split(" ")[1]);

  type colorsStats = {
    red: number;
    green: number;
    blue: number;
  };

  let sets: colorsStats[] = [];

  game.split("; ").forEach((set) => {
    set = set.trim();
    let totalColors = {
      red: 0,
      green: 0,
      blue: 0,
    };
    set.split(", ").forEach((ballDrawn) => {
      let ballsDrawnParts = ballDrawn.split(" ");
      let timesDrawn = Number(ballsDrawnParts[0]);
      let color = ballsDrawnParts[1] as keyof colorsStats;
      totalColors[color] += timesDrawn;
    });
    sets.push(totalColors);
  });

  return { gameId, sets };
};

const part1 = () => {
  let totalGameIds = 0;
  let max = {
    red: 12,
    green: 13,
    blue: 14,
  };
  input.split("\n").forEach((line) => {
    let { gameId, sets } = parseLine(line);
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
    let { sets } = parseLine(line);
    let minimumSet = { red: 0, green: 0, blue: 0 };
    sets.forEach((set) => {
      minimumSet.red = Math.max(set.red, minimumSet.red);
      minimumSet.green = Math.max(set.green, minimumSet.green);
      minimumSet.blue = Math.max(set.blue, minimumSet.blue);
    });
    let power = minimumSet.red * minimumSet.green * minimumSet.blue;

    sumOfPower += power;
  });
  console.log("part 2:", { sumOfPower });
};

part1();
part2();
