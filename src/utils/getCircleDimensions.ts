export const getCircleDimensions = (bounds: Bounds) => {
  const [x1, y1, x2, y2] = bounds
  const diameter = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1))
  const radius = diameter / 2
  const x = x1 < x2 ? x1 + radius : x1 - radius
  const y = y1 < y2 ? y1 + radius : y1 - radius


  return {x, y, radius, diameter}
}
