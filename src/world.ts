import { Material, Position, Size, TerrainFunction } from "./types";

export class World {
  terrainFunction: TerrainFunction;
  size: Size = {
    w: 0,
    h: 0,
  };
  world: Material[][] = [];

  constructor(size: Size, terrainFunction: TerrainFunction) {
    this.size = structuredClone(size);

    this.terrainFunction = terrainFunction;
    this.initializeWorld();
  }

  private initializeWorld() {
    for (let x = 0; x < this.size.w; x++) {
      this.world.push([]);
      for (let y = 0; x < this.size.h; y++) {
        this.world[x]?.push(this.terrainFunction({ x, y }));
      }
    }
  }

  doesTileExist(position: Position): boolean {
    return !(
      position.x < 0 ||
      position.x > this.size.w - 1 ||
      position.y < 0 ||
      position.y > this.size.h - 1
    );
  }

  getTile(position: Position): Material | undefined {
    if (!this.doesTileExist(position)) return undefined;

    return this.world[position.x]![position.y];
  }

  setTile(position: Position, material: Material): boolean {
    if (!this.doesTileExist(position)) return false;

    this.world[position.x]![position.y] = material;

    return true;
  }

  setTileSaturation(position: Position, newSaturation: number): boolean {
    if (!this.doesTileExist(position)) return false;

    const tile = this.getTile(position)!;

    tile.saturation = constrain(newSaturation, 0, tile.maxSaturation);

    return true;
  }

  modifyTileSaturation(position: Position, modifyAmount: number): boolean {
    if (!this.doesTileExist(position)) return false;

    const tile = this.getTile(position)!;

    tile.saturation = constrain(
      tile.saturation + modifyAmount,
      0,
      tile.maxSaturation
    );

    return true;
  }
}
