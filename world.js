class World {
  constructor(width, height, terrainFunction) {
    this.size = {
      w: width,
      h: height,
    };

    this.world = [];

    for (let i = 0; i < this.size.w; i++) {
      this.world.push([]);
      for (let j = 0; j < this.size.h; j++) {
        this.world[i].push(terrainFunction(this, i, this.size.h - j - 1, j));
      }
    }
  }

  doesTileExist(x, y) {
    return !(
      x < 0 ||
      x > this.size.w - 1 ||
      y < 0 ||
      y > this.size.h - 1 ||
      this.world[x][y] == undefined
    );
  }

  getTile(x, y) {
    if (!this.doesTileExist(x, y)) return undefined;

    return this.world[x][y];
  }

  setTile(x, y, material) {
    if (!this.doesTileExist(x, y)) return false;

    this.world[x][y] = material;
    this.world[x][y].position = {
      x,
      y,
    };

    return true;
  }

  setTileSaturation(x, y, newSaturation) {
    if (!this.doesTileExist(x, y)) return false;

    this.world[x][y].saturation = constrain(
      newSaturation,
      0,
      this.world[x][y].maxSaturation
    );

    return true;
  }

  modifyTileSaturation(x, y, modifyAmount) {
    if (!this.doesTileExist(x, y)) return false;

    this.world[x][y].saturation = constrain(
      this.world[x][y].saturation + modifyAmount,
      0,
      this.world[x][y].maxSaturation
    );

    return true;
  }
}

let gridSize = {
  w: 0,
  h: 0,
};

let grid = [];

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
