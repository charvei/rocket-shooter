import CanvasScreen from "../CanvasScreen"
import { Renderable, TextDrawInstruction } from "../../../Types"


/**
 * UI Component for creating a menu and assigning it to a certain area on screen
 */
class MenuComponent {
    activeSelectionIndex: number = 0
    options: string[]
    height: number
    width: number
    xPos: number
    yPos: number
    optionDrawInstructions: TextDrawInstruction[]


    constructor(options: string[], height: number, width: number, xPos: number, yPos: number, canvas: CanvasRenderingContext2D) {
        this.options = options
        this.height = height
        this.width = width
        this.xPos = xPos
        this.yPos = yPos

        this.optionDrawInstructions = this.calculateOptionTextDrawInstructions()
    }

    incrementActiveSelection = (): void => {
        console.log("Up!")
        console.log(this.activeSelectionIndex)
        this.activeSelectionIndex = Math.abs((this.activeSelectionIndex + 1) % this.options.length)
    }

    decrementActiveSelection = (): void => {
        console.log("Down!")
        console.log(this.activeSelectionIndex)
        this.activeSelectionIndex = Math.abs((this.activeSelectionIndex - 1) % this.options.length)
    }

    getActiveSelectionIndex = (): number => {
        return this.activeSelectionIndex
    }

    selectActiveSelection = (): void => {
        this.options[this.activeSelectionIndex]//.performAction()
    }

    calculateOptionTextDrawInstructions = (): TextDrawInstruction[] => {
        let numberOfOptions: number = this.options.length
        return this.options.map((option, index) => {
            return {
                text: option,
                xPos: this.xPos,
                yPos: (index/numberOfOptions * this.height) + this.yPos,
                colour: "#ffffff",
                font: "24px serif"
            }
        })
    }

    calculateSelectionMarker = (): Renderable => {
        let numberOfOptions: number = this.options.length
        
        // Properties of selction marker. These properties could be defined elsewhere if I wanted to use different types, e.g., underline, arrow, blow, etc.
        let markerHeight: number = 10 
        let markerWidth: number = 10
        let markerXMargin: number = 10

        return {
            xPos: this.xPos - (markerWidth + markerXMargin),
            yPos: (this.activeSelectionIndex / numberOfOptions * this.height) + this.yPos  - (markerHeight / 2),
            width: markerWidth,
            height: markerHeight,
            colour: '#ffffff'
            
        }
    }

    // For placing Selection Marker -> calculate text bounding box and put it in middle to left.


    // incrementMenuSelection = () => {
    //     this.activeSelection += 1
    // }

    // decrementMenuSelection = () => {
    //     this.activeSelection -= 1
    // }

    // getRenderables = (): Renderable[] => {
    //     this.drawText()
    //     // return [
    //     //     this.createCenterBox(this.canvasProps.height/(1.618*2), (this.canvasProps.height/(1.618*2))*16/9)
    //     // ]
    //     return [
    //         this.createCenterBox(1, 1)
    //     ]
    // }

    // createCenterBox = (height: number, width: number): Renderable => {
    //     return {
    //         xPos: (this.canvasProps.width / 2) - (width / 2),
    //         yPos: (this.canvasProps.height / 2)  - (height / 2),
    //         width: width,
    //         height: height,
    //         colour: "#ffffff"
    //     }
    // }

    // drawText = () => {
    //     this.context.font = '48px serif'
    //     this.context.fillText('Hello World!', this.canvasProps.width / 2, this.canvasProps.height / 2)
    // }
}

export default MenuComponent