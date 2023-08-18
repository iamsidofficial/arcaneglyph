import { DrawingData } from "../types/DrawingData.types";
import { isDrawingNearPosition } from "./";

type EraseParams = [
   setDrawingData:  React.Dispatch<React.SetStateAction<DrawingData[]>>,
   position: Point,
   radius: number
]

export const erase = ([setDrawingData, position, radius] : EraseParams) => {

   setDrawingData(prevDrawingData => {
    return prevDrawingData.filter(
      drawing => 
      !isDrawingNearPosition(drawing, position, radius))
   })
}