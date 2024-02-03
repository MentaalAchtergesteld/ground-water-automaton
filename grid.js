function buildGrid(width, height, terrainFunction) {
  const grid = [];

  for (let i = 0; i < width; i++) {
    grid.push([]);
    for (let j = 0; j < height; j++) {
      grid[i].push(terrainFunction(i, height - j - 1, j));
    }
  }

  return grid;
}

function doesTileExist(x, y) {
  return !(
    x < 0 ||
    x > gridSize.w - 1 ||
    y < 0 ||
    y > gridSize.h - 1 ||
    grid[x][y] == undefined
  );
}

function getTile(x, y) {
  if (!doesTileExist(x, y)) return undefined;

  return grid[x][y];
}

function setTile(x, y, material) {
  if (!doesTileExist(x, y)) return false;

  grid[x][y] = material;
  grid[x][y].position = {
    x,
    y,
  };

  return true;
}

function setSaturation(x, y, newSaturation) {
  if (!doesTileExist(x, y)) return false;

  grid[x][y].saturation = constrain(newSaturation, 0, grid[x][y].maxSaturation);

  return true;
}

function modifySaturation(x, y, modifyAmount) {
  if (!doesTileExist(x, y)) return false;

  grid[x][y].saturation = constrain(
    grid[x][y].saturation + modifyAmount,
    0,
    grid[x][y].maxSaturation
  );

  return true;
}
