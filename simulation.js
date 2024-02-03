let saturationMovePerLoop = 1;
let evaporationAmount = 0.01;
let evaporationChance = 0.01;

function evaporate(x, y) {
  if (random() < 0.5) modifySaturation(x, y, -evaporationAmount);
}

function moveSaturationDownwards(x, y) {
  let cell = getTile(x, y);
  let cellBeneath = getTile(x, y + 1);

  if (cellBeneath.saturation >= cellBeneath.maxSaturation) return false;
  let maxMovedSaturation = min(saturationMovePerLoop, cell.saturation);

  let cellBeneathSpaceLeft = cellBeneath.maxSaturation - cellBeneath.saturation;
  let maxMovedSaturationBeneath = min(1, cellBeneathSpaceLeft);

  let movedSaturation =
    min(maxMovedSaturation, maxMovedSaturationBeneath) *
    cellBeneath.absorbEfficiency;

  modifySaturation(cell.position.x, cell.position.y, -movedSaturation);
  modifySaturation(
    cellBeneath.position.x,
    cellBeneath.position.y,
    movedSaturation
  );
  return true;
}

function moveSaturationSideways() {}

function simulateGroundWater() {
  for (let i = 0; i < gridSize.w; i++) {
    for (let j = gridSize.h - 1; j >= 0; j--) {
      if (getTile(i, j).saturation == 0) continue;

      evaporate(i, j);

      if (getTile(i, j + 1) == undefined) continue;

      let moveDownSuccess = moveSaturationDownwards(i, j);
    }
  }
}
