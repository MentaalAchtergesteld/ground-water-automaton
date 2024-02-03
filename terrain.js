function flatTerrain(world, x, upY, downY) {
  let groundLevel = world.size.h / 3;

  if (upY > groundLevel) {
    return air(x, downY);
  } else if (y > groundLevel - 1) {
    return grass(x, downY);
  } else if (y > groundLevel - 6) {
    return dirt(x, downY);
  } else {
    return stone(x, downY);
  }
}

function basicHillyTerrain(world, x, upY, downY) {
  let baseLevel = world.size.h / 3;
  let noiseResolution = 24;
  let noiseMultiplication = 16;
  let groundLevel =
    baseLevel + noise(x / noiseResolution) * noiseMultiplication;

  if (upY > groundLevel) {
    return air(x, downY);
  } else if (upY > groundLevel - 1) {
    return grass(x, downY);
  } else if (upY > groundLevel - 6) {
    return dirt(x, downY);
  } else {
    return stone(x, downY);
  }
}
