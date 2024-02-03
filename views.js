let currentView = 1;

let views = [
  function normalTerrainView(world) {
    noStroke();
    for (let i = 0; i < world.size.w; i++) {
      for (let j = 0; j < world.size.h; j++) {
        let color = world.getTile(i, j).color;
        fill(color[0], color[1], color[2]);
        rect(i * cellSize.w, j * cellSize.h, cellSize.w, cellSize.h);
      }
    }
  },

  function saturationLevelView(world) {
    for (let i = 0; i < world.size.w; i++) {
      for (let j = 0; j < world.size.h; j++) {
        let tile = world.getTile(i, j);
        let saturationPercentage = tile.saturation / tile.maxSaturation;

        stroke(209, 96, 56);
        strokeWeight(2);
        noFill();
        rect(i * cellSize.w, j * cellSize.h, cellSize.w, cellSize.h);

        fill(209, 96, 56);
        rect(
          i * cellSize.w,
          j * cellSize.h + cellSize.h * (1 - saturationPercentage),
          cellSize.w,
          cellSize.h * saturationPercentage
        );

        let color = tile.color;
        noStroke();
        fill(color[0], color[1], color[2]);

        rect(
          i * cellSize.w + cellSize.w / 4,
          j * cellSize.h + cellSize.h / 4,
          cellSize.w - cellSize.w / 2,
          cellSize.h - cellSize.h / 2
        );
      }
    }
  },
];

function debugView(world) {
  noFill();
  strokeWeight(1);
  stroke(0, 0, 16);

  for (let i = 0; i < world.size.w; i++) {
    for (let j = 0; j < world.size.h; j++) {
      rect(i * cellSize.w, j * cellSize.h, cellSize.w, cellSize.h);
    }
  }

  strokeWeight(2);
  line(
    0,
    mouseGridPos.y * cellSize.h + cellSize.h / 2,
    width,
    mouseGridPos.y * cellSize.h + cellSize.h / 2
  );
  line(
    mouseGridPos.x * cellSize.w + cellSize.w / 2,
    0,
    mouseGridPos.x * cellSize.w + cellSize.w / 2,
    height
  );
}
