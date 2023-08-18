import {
  PiCircleDuotone,
  PiEraserDuotone,
  PiLineSegmentDuotone,
  PiPencilSimpleDuotone,
  PiRectangleDuotone,
} from "react-icons/pi"

export const tools = [
  {
    name: "pencil",
    type: "pencil",
    icon: <PiPencilSimpleDuotone />,
  },
  {
    name: "line",
    type: "shape",
    icon: <PiLineSegmentDuotone />,
  },
  {
    name: "rectangle",
    type: "shape",
    icon: <PiRectangleDuotone />,
  },
  {
    name: "circle",
    type: "shape",
    icon: <PiCircleDuotone />,
  },
  {
    name: "eraser",
    type: "eraser",
    icon: <PiEraserDuotone />,
  },
]
