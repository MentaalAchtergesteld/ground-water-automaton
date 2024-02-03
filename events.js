function keyPressed(event) {
  switch (event.key) {
    case " ":
      debug = !debug;
      break;
    case "ArrowRight":
      currentView++;
      if (currentView > views.length - 1) currentView = 0;
      break;
    case "ArrowLeft":
      currentView--;
      if (currentView < 0) currentView = views.length - 1;
      break;
  }
}

function mousePressed(event) {
  switch (event.button) {
    case 0:
      if (
        mouseGridPos.x >= 0 &&
        mouseGridPos.x < gridSize.w &&
        mouseGridPos.y >= 0 &&
        mouseGridPos.y < gridSize.h
      ) {
        setSaturation(
          mouseGridPos.x,
          mouseGridPos.y,
          grid[mouseGridPos.x][mouseGridPos.y].maxSaturation
        );
      }
      break;
  }
}
