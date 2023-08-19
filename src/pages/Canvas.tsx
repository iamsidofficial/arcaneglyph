import useDraw from "../hooks/useDraw"
import { useAppContext } from "./CanvasApp"

const Canvas = () => {
  const { activeToolName, options } = useAppContext()
  const { canvasRef, handleMouseDown } = useDraw({ activeToolName, options })

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={(e) => handleMouseDown(e)}
      ></canvas>
    </div>
  )
}

export default Canvas
