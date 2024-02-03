import { air, dirt, grass, stone } from "./materials";
import { Position, TerrainFunction } from "./types";

export const flatTerrain: TerrainFunction = (tilePosition: Position) => {
  const grassLevel = 10;
  const dirtLevel = grassLevel - 1;
  const stoneLevel = dirtLevel - 4;

  if (tilePosition.y > grassLevel) {
    return air();
  } else if (tilePosition.y > dirtLevel) {
    return grass();
  } else if (tilePosition.y > stoneLevel) {
    return dirt();
  } else {
    return stone();
  }
};

export const basicHillyTerrain: TerrainFunction = (tilePosition: Position) => {
  const baseLevel = 10;
  const noiseResolution = 24;
  const noiseMultiplication = 16;
  const grassLevel =
    baseLevel + noise(tilePosition.x / noiseResolution) * noiseMultiplication;
  const dirtLevel = grassLevel - 1;
  const stoneLevel = dirtLevel - 4;

  if (tilePosition.y > grassLevel) {
    return air();
  } else if (tilePosition.y > dirtLevel) {
    return grass();
  } else if (tilePosition.y > stoneLevel) {
    return dirt();
  } else {
    return stone();
  }
};
