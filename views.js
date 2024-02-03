let currentView = 1;

let views = [
  function normalTerrainView(grid) {
    noStroke();
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        let color = grid[i][j].color;
        fill(color[0], color[1], color[2]);
        rect(i * cellSize.w, j * cellSize.h, cellSize.w, cellSize.h);
      }
    }
  },

  function saturationLevelView(grid) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        let saturationPercentage =
          grid[i][j].saturation / grid[i][j].maxSaturation;

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

        let color = grid[i][j].color;
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

function debugView() {
  noFill();
  strokeWeight(1);
  stroke(0, 0, 16);

  for (let i = 0; i < gridSize.w; i++) {
    for (let j = 0; j < gridSize.h; j++) {
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
