import { Drawable } from "roughjs/bin/core"

export type PathData = {
  type: 'path'
  points: Point[]
  path: Path2D
  color: string
}

export type ActiveDrawing = {
  type: 'path'
  points: Point[]
} | {
  type: 'shape'
  subtype: string
  bounds: Bounds}


export type ShapeData = {
  type: 'shape'
  name: string
  bounds: Bounds
  shape: Drawable
}

export type DrawingData = (PathData | ShapeData)