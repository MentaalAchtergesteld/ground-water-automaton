import p5 from "p5";
import { flatTerrain } from "./terrain";
import { Size } from "./types";
import { World } from "./world";

const sketchDiv = document.getElementById("sketch") || undefined;

export const sketch = new p5((sketch: p5) => {
  const tileSize: Size = {
    w: 16,
    h: 16,
  };

  let world: World;
  const currentView = 1;

  sketch.setup = () => {
    sketch.createCanvas(1024, 512);
    sketch.colorMode(sketch.HSL);

    const worldSize: Size = {
      w: Math.floor(sketch.width / tileSize.w),
      h: Math.floor(sketch.height / tileSize.h),
    };

    world = new World(worldSize, flatTerrain);
  };

  sketch.draw = () => {
    sketch.background(191, 93, 40);

    // if (views[currentView] != null) views[currentView](sketch, world, tileSize);
  };
}, sketchDiv);
