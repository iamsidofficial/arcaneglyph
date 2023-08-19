import Canvas from "./Canvas"
import Tooltip from "../components/Tooltip"
import { createContext, useContext, useState } from "react"
import { availableOptions } from "../data/toolOptions"

const defaultOptions = {
  strokeWidth: availableOptions.strokeWidth.sm.value,
  stroke: availableOptions.stroke.black.hex as string,
}

type AppContextType = {
  activeToolName: string
  setActiveToolName: React.Dispatch<React.SetStateAction<string>>
  options: typeof defaultOptions
  setOptions: React.Dispatch<React.SetStateAction<typeof defaultOptions>>
}

const AppContext = createContext<AppContextType | null>(null)

const CanvasApp = () => {
  const [activeToolName, setActiveToolName] = useState("pencil")
  const [options, setOptions] = useState(defaultOptions)

  return (
    <AppContext.Provider
      value={{ activeToolName, setActiveToolName, options, setOptions }}
    >
      <Canvas />
      <Tooltip />
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider")
  }
  return context
}

export default CanvasApp
