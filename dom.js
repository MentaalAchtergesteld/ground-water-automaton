function showCoordinatesInDOM(element, world) {
  element.innerText = `X: ${mouseGridPos.x}, Y: ${
    world.size.h - mouseGridPos.y - 1
  } ( ${mouseGridPos.y} )`;
}

function showSaturationInDOM(element, world) {
  let currentTile = world.getTile(mouseGridPos.x, mouseGridPos.y);

  let saturation = currentTile == null ? "N/A" : currentTile.saturation;

  element.innerText = `Current Saturation: ${saturation}`;
}

function showCurrentViewNameInDOM(element) {
  element.innerText = views[currentView].name;
}
