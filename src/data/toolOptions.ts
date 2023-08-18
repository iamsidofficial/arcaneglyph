import { StrokeOptions } from "perfect-freehand";

export const defaultStrokeOptions : StrokeOptions = {
  smoothing: 0.5,
  thinning: 0.5,
  streamline: 0.5,
  easing: (t) => t,
  start: {
    taper: 0,
    cap: true,
  },
  end: {
    taper: 0,
    cap: true,
  },
}

export const defaultShapeOptions = {
  strokeWidth: 1,
  seed: 10,
  preserveVertices: true,
  fill: "transparent",
  fillStyle: "solid",
}

export const defaultEraserOptions = {
  radius: 2,
}