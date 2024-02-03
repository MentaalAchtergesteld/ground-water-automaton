function createMaterial(name, maxSaturation, absorbEfficiency, color) {
  return (x = 0, y = 0, saturation = 0) => {
    return {
      name,
      saturation,
      skyAccess: false,
      absorbEfficiency,
      maxSaturation,
      color,
      position: {
        x,
        y,
      },
    };
  };
}

const grass = createMaterial("grass", 75, 0.7, [124, 38, 30]);
const dirt = createMaterial("dirt", 100, 0.8, [30, 39, 22]);
const air = createMaterial("air", 0, 1.0, [191, 93, 40]);
const stone = createMaterial("stone", 3, 0.2, [0, 0, 49]);
