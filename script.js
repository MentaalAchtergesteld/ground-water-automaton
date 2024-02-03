const coordinatesSpan = document.getElementById("coordinates");
const saturationSpan = document.getElementById("saturation");
const viewSpan = document.getElementById("view");

let debug = false;

let world;
let worldTerrainFunction = basicHillyTerrain;

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

  const worldSize = {
    w: floor(width / cellSize.w),
    h: floor(height / cellSize.h),
  };

  world = new World(worldSize.w, worldSize.h, worldTerrainFunction);
}

function draw() {
  background(0, 100, 100);

  mouseGridPos.x = floor(norm(mouseX, 0, width) * world.size.w);
  mouseGridPos.y = floor(norm(mouseY, 0, height) * world.size.h);

  showCoordinatesInDOM(coordinatesSpan, world);
  showSaturationInDOM(saturationSpan, world);
  showCurrentViewNameInDOM(viewSpan);

  simulateGroundWater(world);

  views[currentView](world);

  if (debug) debugView(world);
}
