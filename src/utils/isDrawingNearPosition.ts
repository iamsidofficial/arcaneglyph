import { DrawingData } from "../types/DrawingData.types"
import { getCircleDimensions } from "./"

const getDistance = (point1: Point, point2: Point) => {
  const [x1, y1] = point1
  const [x2, y2] = point2

  const dx = x2 - x1
  const dy = y2 - y1

  return Math.sqrt(dx * dx + dy * dy)
}

const isLineNearPosition = (point1: Point, point2: Point, position: Point, radius: number) => {
  const [x1, y1] = point1
  const [x2, y2] = point2
  const [x, y] = position
  const dx = x2 - x1
  const dy = y2 - y1
  const length = Math.sqrt(dx * dx + dy * dy)

  const normalizedDx = dx / length
  const normalizedDy = dy / length

  const projection = (normalizedDx * (x - x1)) + (normalizedDy * (y - y1))

  const closestX = x1 + (projection * normalizedDx)
  const closestY = y1 + (projection * normalizedDy)

  const distance = getDistance([closestX, closestY], position)

  return distance <= radius && projection >= 0 && projection <= length
}

const isPathNearPosition = (points: Point[], position: Point, radius: number) => {
  for(let point of points){
    if(getDistance(point, position) <= radius) return true
  }

  return false
}

const isRectangleNearPosition = (bounds: Bounds, position: Point, radius: number) => {
  const [x1, y1, x2, y2] = bounds
  const point1: Point = [x1, y1]
  const point2: Point = [x1, y2]
  const point3: Point = [x2, y1]
  const point4: Point = [x2, y2]

  const lines = [[point1, point2], [point1, point3], [point2, point4], [point3, point4]]

  for(let line of lines){
    if(isLineNearPosition(line[0], line[1], position, radius)) return true
  }

  return false

}

const isCircleNearPosition = (circleCenter: Point, circleRadius: number, position: Point, radius: number) => {
  const distance = getDistance(circleCenter, position)

  return distance <= radius + circleRadius
}

export const isDrawingNearPosition = (drawingData: DrawingData, position: Point, radius: number) => {
  if(drawingData.type === 'path'){
    return isPathNearPosition(drawingData.points, position, radius)

  } else {
    if(drawingData.name === 'line') {
      const [x1, y1, x2, y2] = drawingData.bounds
      return isLineNearPosition([x1, y1], [x2, y2], position, radius)

    } else if(drawingData.name === 'rectangle') {
      return isRectangleNearPosition(drawingData.bounds, position, radius)
    } else if(drawingData.name === 'circle') {
      const {x, y, radius: circleRadius} = getCircleDimensions(drawingData.bounds)
      return isCircleNearPosition([x, y], circleRadius, position,radius)
    }
  }
}