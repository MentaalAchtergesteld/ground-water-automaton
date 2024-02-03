import p5 from "p5";
import { Position, Size, ViewFunction } from "./types";
import { World } from "./world";

export const views: ViewFunction[] = [
  function normalTerrainView(sketch: p5, world: World, tileSize: Size): void {
    sketch.noStroke();
    for (let x = 0; x < world.size.w; x++) {
      for (let y = 0; y < world.size.h; y++) {
        const tile = world.getTile({ x, y });
        if (tile == undefined) continue;

        sketch.fill(tile.color);
        sketch.rect(x * tileSize.w, y * tileSize.h, tileSize.w, tileSize.h);
      }
    }
  },

  function saturationLevelView(sketch: p5, world: World, tileSize: Size): void {
    for (let x = 0; x < world.size.w; x++) {
      for (let y = 0; y < world.size.h; y++) {
        const tile = world.getTile({ x, y });
        if (tile == undefined) continue;

        const saturationPercentage = tile.saturation / tile.maxSaturation;

        sketch.stroke(209, 96, 56);
        sketch.strokeWeight(2);
        sketch.noFill();
        sketch.rect(x * tileSize.w, y * tileSize.h, tileSize.w, tileSize.h);

        sketch.fill(209, 96, 56);
        sketch.rect(
          x * tileSize.w,
          y * tileSize.h + tileSize.h * (1 - saturationPercentage),
          tileSize.w,
          tileSize.h * saturationPercentage
        );

        sketch.noStroke();
        sketch.fill(tile.color);

        sketch.rect(
          x * tileSize.w + tileSize.w / 4,
          y * tileSize.h + tileSize.h / 4,
          tileSize.w - tileSize.w / 2,
          tileSize.h - tileSize.h / 2
        );
      }
    }
  },
];

function debugView(
  sketch: p5,
  world: World,
  tileSize: Size,
  mouseGridPos: Position
) {
  sketch.noFill();
  sketch.strokeWeight(1);
  sketch.stroke(0, 0, 16);

  for (let i = 0; i < world.size.w; i++) {
    for (let j = 0; j < world.size.h; j++) {
      sketch.rect(i * tileSize.w, j * tileSize.h, tileSize.w, tileSize.h);
    }
  }

  sketch.strokeWeight(2);
  sketch.line(
    0,
    mouseGridPos.y * tileSize.h + tileSize.h / 2,
    width,
    mouseGridPos.y * tileSize.h + tileSize.h / 2
  );
  sketch.line(
    mouseGridPos.x * tileSize.w + tileSize.w / 2,
    0,
    mouseGridPos.x * tileSize.w + tileSize.w / 2,
    height
  );
}
