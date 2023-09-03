import useDraw from "../hooks/useDraw"
import { useAppContext } from "./CanvasApp"

const Canvas = () => {
  const { activeToolName, options } = useAppContext()
  const { canvasRef, handleMouseDown, handleTouchStart } = useDraw({ activeToolName, options })

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={(e) => handleMouseDown(e)}
        onTouchStart={(e) => handleTouchStart(e)}
      ></canvas>
    </div>
  )
}

export default Canvas
