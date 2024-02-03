const saturationMovePerLoop = 1;
const evaporationAmount = 0.01;
const evaporationChance = 0;
const minimumSaturationDifferenceToMoveSideways = 0.2;

function evaporate(world, x, y) {
  if (random() < evaporationChance)
    world.modifyTileSaturation(x, y, -evaporationAmount);
}

function moveSaturationDownwards(world, x, y) {
  let cell = world.getTile(x, y);
  let cellBeneath = world.getTile(x, y + 1);

  if (cellBeneath == undefined) return false;
  if (cellBeneath.saturation >= cellBeneath.maxSaturation) return false;
  let maxMovedSaturation = min(saturationMovePerLoop, cell.saturation);

  let cellBeneathSpaceLeft = cellBeneath.maxSaturation - cellBeneath.saturation;
  let maxMovedSaturationBeneath = min(
    saturationMovePerLoop * cellBeneath.absorbEfficiency,
    cellBeneathSpaceLeft
  );

  let movedSaturation = min(maxMovedSaturation, maxMovedSaturationBeneath);

  world.modifyTileSaturation(x, y, -movedSaturation);
  world.modifyTileSaturation(x, y + 1, movedSaturation);

  return true;
}

function moveSaturationSideways(world, x, y) {
  let cell = world.getTile(x, y);
  let neighbourOffset = 0;

  if (x == 0) {
    neighbourOffset = 1;
  } else if (x == world.size.w - 1) {
    neighbourOffset = -1;
  } else {
    neighbourOffset = random([-1, 1]);
  }

  let neighbourCell = world.getTile(x + neighbourOffset, y);

  if (neighbourCell == undefined) return false;
  if (neighbourCell.saturation >= neighbourCell.maxSaturation) return false;
  if (neighbourCell.saturation >= cell.saturation) return false;

  let saturationDifference =
    abs(cell.saturation - neighbourCell.saturation) / 2;

  if (saturationDifference < minimumSaturationDifferenceToMoveSideways)
    return false;

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

  world.modifyTileSaturation(x, y, -movedSaturation);
  world.modifyTileSaturation(x + neighbourOffset, y, movedSaturation);

  return true;
}

function simulateGroundWater(world) {
  for (let i = 0; i < world.size.w; i++) {
    for (let j = world.size.h - 1; j >= 0; j--) {
      if (world.getTile(i, j).saturation == 0) continue;

      evaporate(world, i, j);

      let moveDownSuccess = moveSaturationDownwards(world, i, j);
      if (moveDownSuccess) continue;

      moveSaturationSideways(world, i, j);
    }
  }
}
