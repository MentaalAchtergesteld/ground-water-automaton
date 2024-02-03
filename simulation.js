let saturationMovePerLoop = 1;
let evaporationAmount = 0.01;
let evaporationChance = 0;

function evaporate(x, y) {
  if (random() < evaporationChance) modifySaturation(x, y, -evaporationAmount);
}

function moveSaturationDownwards(x, y) {
  let cell = getTile(x, y);
  let cellBeneath = getTile(x, y + 1);

  if (cellBeneath == undefined) return false;
  if (cellBeneath.saturation >= cellBeneath.maxSaturation) return false;
  let maxMovedSaturation = min(saturationMovePerLoop, cell.saturation);

  let cellBeneathSpaceLeft = cellBeneath.maxSaturation - cellBeneath.saturation;
  let maxMovedSaturationBeneath = min(
    saturationMovePerLoop * cellBeneath.absorbEfficiency,
    cellBeneathSpaceLeft
  );

  let movedSaturation = min(maxMovedSaturation, maxMovedSaturationBeneath);

  modifySaturation(x, y, -movedSaturation);
  modifySaturation(x, y + 1, movedSaturation);

  return true;
}

function moveSaturationSideways(x, y) {
  let cell = getTile(x, y);
  let neighbourOffset = 0;

  if (x == 0) {
    neighbourOffset = 1;
  } else if (x == gridSize.w - 1) {
    neighbourOffset = -1;
  } else {
    neighbourOffset = random([-1, 1]);
  }

  let neighbourCell = getTile(x + neighbourOffset, y);

  if (neighbourCell == undefined) return false;
  if (neighbourCell.saturation >= neighbourCell.maxSaturation) return false;
  if (neighbourCell.saturation >= cell.saturation) return false;

  let saturationDifference =
    abs(cell.saturation - neighbourCell.saturation) / 2;

  if (saturationDifference < 0.1) return false;

  let maxMovedSaturation = min(
    min(saturationDifference, saturationMovePerLoop),
    cell.saturation
  );

  let neighbourSpaceLeft =
    neighbourCell.maxSaturation - neighbourCell.saturation;

  let maxNeighbourMovedSaturation = min(
    min(
      saturationDifference,
      saturationMovePerLoop * neighbourCell.absorbEfficiency
    ),
    neighbourSpaceLeft
  );

  let movedSaturation = min(maxMovedSaturation, maxNeighbourMovedSaturation);

  modifySaturation(x, y, -movedSaturation);
  modifySaturation(x + neighbourOffset, y, movedSaturation);

  return true;
}

function simulateGroundWater() {
  for (let i = 0; i < gridSize.w; i++) {
    for (let j = gridSize.h - 1; j >= 0; j--) {
      if (getTile(i, j).saturation == 0) continue;

      evaporate(i, j);

      let moveDownSuccess = moveSaturationDownwards(i, j);
      if (moveDownSuccess) continue;

      moveSaturationSideways(i, j);
    }
  }
}
