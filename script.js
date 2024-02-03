const coordinatesSpan = document.getElementById("coordinates");
const saturationSpan = document.getElementById("saturation");
const viewSpan = document.getElementById("view");

let debug = false;

const cellSize = {
  w: 16,
  h: 16,
};

let mouseGridPos = {
  x: 0,
  y: 0,
};

function setup() {
  createCanvas(1024, 512);
  colorMode(HSL, 360, 100, 100);

  gridSize = {
    w: floor(width / cellSize.w),
    h: floor(height / cellSize.h),
  };

  grid = buildGrid(gridSize.w, gridSize.h, basicHillyTerrain);
}

function draw() {
  background(0, 100, 100);

  mouseGridPos.x = floor(norm(mouseX, 0, width) * gridSize.w);
  mouseGridPos.y = floor(norm(mouseY, 0, height) * gridSize.h);

  showCoordinatesInDOM(coordinatesSpan);
  showSaturationInDOM(saturationSpan);
  showCurrentViewNameInDOM(viewSpan);

  simulateGroundWater();

  views[currentView](grid);

  if (debug) debugView();
}
