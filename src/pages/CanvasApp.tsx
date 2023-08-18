import Canvas from "./Canvas"
import Tooltip from "../components/Tooltip"
import { createContext, useContext, useState } from "react"

type AppContextType = {
  activeToolName: string
  setActiveToolName: React.Dispatch<React.SetStateAction<string>>
}

const AppContext = createContext<AppContextType | null>(null)

const CanvasApp = () => {
  const [activeToolName, setActiveToolName] = useState("pencil")

  return (
    <AppContext.Provider value={{ activeToolName, setActiveToolName }}>
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
