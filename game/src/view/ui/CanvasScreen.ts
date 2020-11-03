import { Renderable } from "../../Types"
import { throwNotImplementedError } from "../../Errors"

class CanvasScreen {
    context: CanvasRenderingContext2D
    canvasProps: { height: number, width: number }

    constructor(canvasContext: CanvasRenderingContext2D, canvasProps: {height: number, width: number} ) {
        this.context = canvasContext
        this.canvasProps = canvasProps
    }

    getRenderables = (): Renderable[] => {
        throwNotImplementedError()
        return []
    }
}

export default CanvasScreen