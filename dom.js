function showCoordinatesInDOM(element) {
  element.innerText = `X: ${mouseGridPos.x}, Y: ${
    gridSize.h - mouseGridPos.y - 1
  } ( ${mouseGridPos.y} )`;
}

function showSaturationInDOM(element) {
  let currentTile = getTile(mouseGridPos.x, mouseGridPos.y);

  let saturation = currentTile == null ? "N/A" : currentTile.saturation;

  element.innerText = `Current Saturation: ${saturation}`;
}

function showCurrentViewNameInDOM(element) {
  element.innerText = views[currentView].name;
}
