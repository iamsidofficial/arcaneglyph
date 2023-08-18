import { RoughCanvas } from "roughjs/bin/canvas"
import PencilTool from "../elements/PencilTool"
import { DrawingData } from "../types/DrawingData.types"
import { ShapeTool } from "../elements"

type ReDraw = [
  CanvasRenderingContext2D, 
  RoughCanvas, 
  DrawingData[]]

export const clear = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
}

const reDraw = (...params: ReDraw) => {
  const [ctx, roughCanvas, drawingData] = params
  clear(ctx)

  for(let drawing of drawingData) {
      if(drawing.type === 'path'){
        PencilTool.drawPath(ctx, drawing.path, drawing.color)
      } else if(drawing.type === 'shape') {
        ShapeTool.drawShape(roughCanvas, drawing.shape)
      }
  }
}

export default reDraw