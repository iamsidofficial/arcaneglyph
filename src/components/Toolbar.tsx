import { tools } from "../data/tools"
import { useAppContext } from "../pages/CanvasApp"
import { availableOptions } from "../data/toolOptions"
import { PiCircleFill } from "react-icons/pi"
import { useState } from "react"

type ToolProps = {
  name: string
  isActive: boolean
  setActiveTool: React.Dispatch<React.SetStateAction<string>>
  icon: JSX.Element
}

const Tool = ({ name, isActive, setActiveTool, icon }: ToolProps) => {
  return (
    <div
      className={`p-3 rounded-lg transition-all ${
        isActive
          ? "bg-blue-200 text-blue-500"
          : "hover:bg-blue-100 hover:text-blue-400"
      }`}
      onClick={() => setActiveTool(name)}
    >
      {icon}
    </div>
  )
}

const StrokeOptionsModal = () => {
  const { options, setOptions } = useAppContext()

  const strokeColorEls = Object.values(availableOptions.stroke).map(
    (stroke) => (
      <div
        key={stroke.hex}
        className={`rounded-full border transition ${stroke.class} ${
          options.stroke === stroke.hex ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
        onClick={() => setOptions((prev) => ({ ...prev, stroke: stroke.hex }))}
      >
        <PiCircleFill className="m-2" />
      </div>
    )
  )

  const strokeWidthEls = Object.values(availableOptions.strokeWidth).map(
    (strokeWidth) => (
      <div
        key={strokeWidth.value}
        className={`rounded-lg border w-6 h-6 flex items-center justify-center ${
          strokeWidth.value === options.strokeWidth
            ? "bg-gray-200"
            : "hover:bg-gray-100"
        }`}
        onClick={() =>
          setOptions((prev) => ({ ...prev, strokeWidth: strokeWidth.value }))
        }
      >
        <div
          className={`w-3 rounded-sm ${strokeWidth.class} bg-gray-700`}
        ></div>
      </div>
    )
  )

  return (
    <div className="absolute right-0 mt-3 sm:right-auto bg-white p-4 rounded-lg flex flex-col gap-2 shadow-xl">
      <div>
        <div className="text-xs mb-2 text-gray-800">Stroke</div>
        <div className="flex gap-1 mt-1">{strokeColorEls}</div>
      </div>
      <div>
        <div className="text-xs mb-2 text-gray-800">Stroke Width</div>
        <div className="flex gap-2 items-center">{strokeWidthEls}</div>
      </div>
    </div>
  )
}

const StrokeOptions = () => {
  const { options } = useAppContext()
  const [modalActive, setModalActive] = useState(false)

  return (
    <div
      className="absolute left-[100%] ml-2 sm:ml-5 bg-white  rounded-full border"
      onClick={() => setModalActive((prev) => !prev)}
    >
      <div
        className={`${
          Object.values(availableOptions.stroke).find(
            (obj) => obj.hex === options.stroke
          )?.class
        } rounded-full m-3`}
      >
        <PiCircleFill />
      </div>
      {modalActive && <StrokeOptionsModal />}
    </div>
  )
}

const Tooltip = () => {
  const { activeToolName, setActiveToolName } = useAppContext()

  const toolEls = tools.map((tool) => (
    <Tool
      key={tool.name}
      name={tool.name}
      isActive={tool.name === activeToolName}
      setActiveTool={setActiveToolName}
      icon={tool.icon}
    />
  ))

  return (
    <div className="absolute top-4 left-0 right-0 w-fit mx-auto">
      <div className="flex mb-2 items-center bg-white gap-2 border w-fit p-1 rounded-lg">
        {toolEls}
        {activeToolName !== "eraser" && <StrokeOptions />}
      </div>
    </div>
  )
}

export default Tooltip
