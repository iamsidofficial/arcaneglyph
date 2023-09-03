import { useEffect, useRef, useState } from "react"
import { reDraw } from "../utils"
import { ActiveDrawing, DrawingData } from "../types/DrawingData.types"
import { PencilTool, ShapeTool } from "../elements"
import { RoughGenerator } from "roughjs/bin/generator"
import { tools } from "../data/tools"
import { erase } from "../utils"

type Draw = {
  activeToolName: string
  options: {
    strokeWidth: number
    stroke: string
  }
}

const useDraw = ({activeToolName, options} : Draw) => {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawingData, setDrawingData] = useState<DrawingData[]>([])
  const [activeDrawing, setActiveDrawing] = useState<ActiveDrawing>()
  const activeTool = tools.find(tool => tool.name === activeToolName)

  const getDrawingData = (roughGenerator: RoughGenerator) : DrawingData | undefined => {
    if(!activeDrawing) return
    if(activeDrawing.type === 'path'){
      const path = PencilTool.getPath(activeDrawing.points, 2 * options.strokeWidth)
      return {
        type: 'path',
        points: activeDrawing.points,
        path,
        color: options.stroke
      }
    } else if(activeDrawing.type === 'shape') {
      const shape = ShapeTool.getShape(roughGenerator, activeDrawing.subtype, activeDrawing.bounds, options)
      if(!shape) return
      return {
        type: 'shape',
        name: activeDrawing.subtype,
        bounds: activeDrawing.bounds,
        shape: shape
      }
    }
  }

  const handlePointerDown = (point: Point) => {
    setIsDrawing(true)
    const [x, y] = point
    if(activeTool?.type === 'pencil') {
      setActiveDrawing({
        type: 'path',
        points: [[x, y]]
      })
    } else if (activeTool?.type === 'shape') {
      setActiveDrawing({
        type: 'shape',
        subtype: activeToolName,
        bounds: [x, y, x, y]
      }) 
    } 
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touches = e.changedTouches
    if(touches.length > 1) return
    const {clientX: x, clientY: y} = touches[0]

    handlePointerDown([x, y])
  }
  
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    handlePointerDown([e.clientX, e.clientY])

  }

  const handlePointerMove = (point: Point) => {

    if(!isDrawing) return
    const [x, y] = point

    if(activeTool?.type === 'eraser') {
      erase([setDrawingData, [x, y], 20])
      
      return
    }

    setActiveDrawing(prevDrawing => {
      if(prevDrawing?.type === 'path') 
      {
        return {
          ...prevDrawing,
          points: [...prevDrawing.points, [x, y]]
        } 
      } else if(prevDrawing?.type === 'shape') {
        const [x1, y1] = prevDrawing.bounds
        return {
          ...prevDrawing,
          bounds: [x1, y1, x, y]
        }
      }
    })    

  }

  const handleTouchMove = (e: TouchEvent) => {
    const touches = e.changedTouches
    if(touches.length > 1) return
    const {clientX: x, clientY: y} = touches[0]

    handlePointerMove([x, y])

  }
  
  const handleMouseMove = (e: MouseEvent) => {
    handlePointerMove([e.clientX, e.clientY])
  }

  const handlePointerUp = () => {
    setIsDrawing(false)
  }



  useEffect(() => {
    if(!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if(!ctx) return
    const {roughCanvas, roughGenerator} = ShapeTool.init(canvasRef.current)

    const updatedDrawingData = [...drawingData]
    const activeDrawingData = getDrawingData(roughGenerator)
    if(activeDrawingData) {
      updatedDrawingData.push(activeDrawingData)
    }
    reDraw(ctx, roughCanvas, updatedDrawingData)
    if(!isDrawing && activeDrawing) {
      setDrawingData(updatedDrawingData)
      setActiveDrawing(undefined)
    }

  }, [activeDrawing, isDrawing, drawingData])


  useEffect(() => {
    if(isDrawing) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handlePointerUp)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handlePointerUp)
      const clearListeners = () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handlePointerUp)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handlePointerUp)
      }
  
      return clearListeners
    }


  }, [isDrawing])

  return {canvasRef, handleMouseDown, handleTouchStart}

}

export default useDraw