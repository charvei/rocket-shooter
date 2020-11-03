import CanvasScreen from "../CanvasScreen"
import { Renderable } from "../../../Types"

class MainMenuScreen extends CanvasScreen {

    constructor(canvasContext: CanvasRenderingContext2D, canvasProps: { height: number, width: number }) {
        super(canvasContext, canvasProps)
    }

    getRenderables = (): Renderable[] => {
        this.drawText()
        // return [
        //     this.createCenterBox(this.canvasProps.height/(1.618*2), (this.canvasProps.height/(1.618*2))*16/9)
        // ]
        return [
            this.createCenterBox(1, 1)
        ]
    }

    createCenterBox = (height: number, width: number): Renderable => {
        return {
            xPos: (this.canvasProps.width / 2) - (width / 2),
            yPos: (this.canvasProps.height / 2)  - (height / 2),
            width: width,
            height: height,
            colour: "#ffffff"
        }
    }

    drawText = () => {
        this.context.font = '48px serif'
        this.context.fillText('Hello World!', this.canvasProps.width / 2, this.canvasProps.height / 2)
    }
}

export default MainMenuScreen