import { Renderable, TextDrawInstruction } from "../../Types"
import { throwNotImplementedError } from "../../Errors"

class CanvasScreen {
    context: CanvasRenderingContext2D
    canvasProps: { height: number, width: number }

    constructor(canvasContext: CanvasRenderingContext2D, canvasProps: {height: number, width: number} ) {
        this.context = canvasContext
        this.canvasProps = canvasProps
    }

    getRenderables = (): Renderable[] => {
        return []
    }

    getTextDrawInstructions = (): TextDrawInstruction[] => {
        return []
    }
}

export default CanvasScreen