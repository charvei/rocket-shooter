import CanvasScreen from "../CanvasScreen"
import { Renderable } from "../../../Types"

class MainMenuScreen extends CanvasScreen {

    constructor(canvasContext: CanvasRenderingContext2D, canvasProps: { height: number, width: number }) {
        super(canvasContext, canvasProps)
    }

    getRenderables = (): Renderable[] => {
        return [
            {
                xPos: 200,
                yPos: 200,
                width: 200,
                height: 200,
                colour: "#00ff00"
            }
        ]
    }
}

export default MainMenuScreen