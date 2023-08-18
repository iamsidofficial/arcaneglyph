import rough from 'roughjs'
import { RoughCanvas } from 'roughjs/bin/canvas'
import { Drawable} from 'roughjs/bin/core'
import { RoughGenerator } from 'roughjs/bin/generator'
import { getCircleDimensions } from '../utils'
import { defaultShapeOptions } from '../data/toolOptions'

const init = (canvas: HTMLCanvasElement) => {
  const roughCanvas =  rough.canvas(canvas)
  const roughGenerator = roughCanvas.generator

  return {roughCanvas, roughGenerator}
}

const getRectangleDimesions = (bounds: Bounds) : Bounds => {
  let [x1, y1, x2, y2] = bounds
  ;[x1, x2] = [x1 ,x2].sort()
  ;[y1, y2] = [y1, y2].sort()
  return [x1, y1, x2 - x1, y2 - y1]
}


const getShape = (roughGenerator: RoughGenerator, shapeType:string, bounds: Bounds, options=defaultShapeOptions) => {
  let shape;
  if(shapeType === 'line') {
    shape = roughGenerator.line(...bounds, options)
  } else {
    if(shapeType === 'rectangle') {
      const dimensions = getRectangleDimesions(bounds)
      shape = roughGenerator.rectangle(...dimensions, options)
    } else if(shapeType === 'circle') {
      const {x, y, diameter} = getCircleDimensions(bounds)
      shape = roughGenerator.circle(x, y, diameter, options)
    }
  }

  return shape
}

const drawShape = (roughCanvas: RoughCanvas, shape: Drawable) => {
  roughCanvas.draw(shape)
}

const ShapeTool = {
  init,
  getShape,
  drawShape
}

export default ShapeTool
