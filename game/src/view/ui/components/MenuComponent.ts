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
        // console.log("Up!")
        // this.activeSelectionIndex = (this.activeSelectionIndex + 1)
        // console.log(this.activeSelectionIndex)
        this.activeSelectionIndex++
        if (this.activeSelectionIndex > this.options.length - 1) {
            this.activeSelectionIndex = 0
        } 

    }

    decrementActiveSelection = (): void => {
        this.activeSelectionIndex--
        if (this.activeSelectionIndex < 0) {
            this.activeSelectionIndex = this.options.length - 1
        } 
        
        // console.log("Down!")
        // this.activeSelectionIndex = (this.activeSelectionIndex - 1)
        // console.log(this.activeSelectionIndex)
    }

    getActiveSelectionIndex = (): number => {
        return Math.abs((this.activeSelectionIndex) % this.options.length)
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
}

export default MenuComponent