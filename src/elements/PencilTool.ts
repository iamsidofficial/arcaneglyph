import { getStroke } from "perfect-freehand"
import { getPathFromStroke } from "../utils"

const getPath = (points: Point[], size: number) : Path2D => {
  const outlinePoints = getStroke(points, {size}) as Point[]
  const pathData = getPathFromStroke(outlinePoints)
  const path = new Path2D(pathData)
  return path
}

const drawPath = (ctx: CanvasRenderingContext2D, path: Path2D, color: string="#000") => {
  ctx.fillStyle = color
  ctx.fill(path)
  return
}

const PencilTool = {
  getPath,
  drawPath
}

export default PencilTool