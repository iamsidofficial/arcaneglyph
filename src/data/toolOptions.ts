import { StrokeOptions } from "perfect-freehand";
import colors from 'tailwindcss/colors'

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

export const availableOptions = {
  stroke: {
    "red": {
      hex: colors.red[500],
      class: "text-red-500"
    },
    "amber": {
      hex: colors.amber[500],
      class: "text-amber-500"
    },
    "lime": {
      hex: colors.lime[500],
      class: "text-lime-500"
    },
    "blue": {
      hex: colors.blue[500],
      class: "text-blue-500"
    },
    "black": {
      hex: colors.gray[900],
      class: "text-gray-900"
    },
  },
  strokeWidth: {
    "sm": {
      value: 2,
      class: "h-0.5" 
    },
    "md": {
      value: 4,
      class: "h-1" 
    },
    "lg": {
      value: 6,
      class: "h-1.5" 
    },
  }
}