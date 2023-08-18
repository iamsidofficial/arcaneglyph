import { tools } from "../data/tools"
import { useAppContext } from "../pages/CanvasApp"

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
    <div className="absolute flex bg-white gap-2 shadow-xl w-fit p-1 top-8 left-0 right-0 mx-auto rounded-lg">
      {toolEls}
    </div>
  )
}

export default Tooltip
