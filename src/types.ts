import p5 from "p5";
import { World } from "./world";

export type Size = {
  w: number;
  h: number;
};

export type Position = {
  x: number;
  y: number;
};

export type HSLColor = [number, number, number];

export type Material = {
  name: string;
  saturation: number;
  skyAccess: boolean;
  absorbAmount: number;
  maxSaturation: number;
  color: HSLColor;
};

export type TerrainFunction = (tilePosition: Position) => Material;
export type ViewFunction = (sketch: p5, world: World, tileSize: Size) => void;
