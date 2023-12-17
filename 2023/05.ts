import fs from "fs";

let input = fs.readFileSync("./05.txt", "utf8");

// first parse input

let [
  seedsLine,
  seedToSoilMapBlock,
  soilToFertilizerMapBlock,
  fertirlizerToWaterMapBlock,
  waterToLightMapBlock,
  lightToTempMapBlock,
  temptoHumidityMapBlock,
  humidyToLocationMapBlock,
] = input.split("\n\n");

let seeds: number[] = [];

seedsLine
  .split(":")[1]
  .split(" ")
  .forEach((num) => {
    num = num.trim();
    if (num) {
      seeds.push(Number(num));
    }
  });

const blocksToMap = (block: string) => {
  return block
    .split("\n")
    .slice(1)
    .map((line) => {
      return line.split(" ").map((num) => Number(num.trim()));
    });
};

let seedToSoilMap = blocksToMap(seedToSoilMapBlock);
let soilToFertilizerMap = blocksToMap(soilToFertilizerMapBlock);
let fertirlizerToWaterMap = blocksToMap(fertirlizerToWaterMapBlock);
let waterToLightMap = blocksToMap(waterToLightMapBlock);
let lightToTempMap = blocksToMap(lightToTempMapBlock);
let tempToHumidityMap = blocksToMap(temptoHumidityMapBlock);
let humidyToLocationMap = blocksToMap(humidyToLocationMapBlock);

let searchOrder = [
  seedToSoilMap,
  soilToFertilizerMap,
  fertirlizerToWaterMap,
  waterToLightMap,
  lightToTempMap,
  tempToHumidityMap,
  humidyToLocationMap,
];

const getSeedLocation = (seed: number) => {
  const traverse = (a: number, index: number = 0): number => {
    let map = searchOrder[index];
    let found: number | undefined = undefined;
    for (let line of map) {
      let [destination, source, range] = line;
      if (a >= source && a <= source + range) {
        let diff = a - source;
        found = destination + diff;
        break;
      }
    }

    found = found ? found : a;
    if (index === searchOrder.length - 1) {
      return found;
    } else {
      return traverse(found, index + 1);
    }
  };
  return traverse(seed);
};

const part1 = () => {
  let seedLocations: Record<number, number> = {};

  let lowestLocation: number = 0;
  for (let seed of seeds) {
    let seedLocation = getSeedLocation(seed);
    seedLocations[seed] = seedLocation;
    if (!lowestLocation) {
      lowestLocation = seedLocation;
    } else if (seedLocation < lowestLocation) {
      lowestLocation = seedLocation;
    }
  }

  console.log({ lowestLocation });
};

part1();
