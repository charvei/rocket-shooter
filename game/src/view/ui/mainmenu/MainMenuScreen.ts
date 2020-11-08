import CanvasScreen from "../CanvasScreen"
import MenuComponent from "../components/MenuComponent"
import ScreenInputComponent from "./ScreenInput"
import { Renderable, TextDrawInstruction } from "../../../Types"

// enum MainMenuOptions {
//     STARTGAME = "Start Game",
//     SETTINGS = "Settings",
//     ABOUT = "About",
// }

// enum MainMenuOptionsId {
//     STARTGAME = 1,
//     SETTINGS = 2,
//     ABOUT = 3
// }

/**
 * 
 * 
 * User input functions: 
 *  - increment/decrement active selection
 *  - select => perform action associated with option
 */
class MainMenuScreen extends CanvasScreen {
    // activeSelection: MainMenuOptionsId = 1
    activeMenuIndex: number = 0
    menus: MenuComponent[]
    input: ScreenInputComponent
    //menu: MenuComponent

    constructor(canvasContext: CanvasRenderingContext2D, canvasProps: { height: number, width: number }) {
        super(canvasContext, canvasProps)
        this.input = new ScreenInputComponent(this)
        this.menus = [new MenuComponent(["Start Game", "Settings", "About"], 150, 400, 150, 150, canvasContext)]
        //this.menu = new MenuComponent(["Start Game", "Settings", "About"], 150, 400, 150, 150, canvasContext)

    }

    getActiveMenu = (): MenuComponent => {
        return this.menus[this.activeMenuIndex]
    }

    getRenderables = (): Renderable[] => {
        return this.menus.map(menu => {
            return menu.calculateSelectionMarker()
        })
    }

    getTextDrawInstructions = (): TextDrawInstruction[] => {
        let drawInstructions: TextDrawInstruction[] = []
        this.menus.forEach(menu => {
            menu.calculateOptionTextDrawInstructions().forEach(instruction => {
                drawInstructions.push(instruction)
            })
        })

        return drawInstructions
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
}

export default MainMenuScreen