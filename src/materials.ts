import { HSLColor, Material } from "./types";

function createMaterial(
  name: string,
  maxSaturation: number,
  absorbAmount: number,
  color: HSLColor
): () => Material {
  return (saturation = 0): Material => {
    return {
      name,
      saturation,
      skyAccess: false,
      absorbAmount,
      maxSaturation,
      color,
    };
  };
}

export const grass = createMaterial("grass", 92, 16, [124, 38, 30]);
export const dirt = createMaterial("dirt", 128, 12, [30, 39, 22]);
export const air = createMaterial("air", 0, 0, [191, 93, 40]);
export const stone = createMaterial("stone", 16, 4, [0, 0, 49]);
