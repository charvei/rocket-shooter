import { Renderable, TextDrawInstruction } from "../../Types"
import CanvasScreen from "./CanvasScreen"
import MainMenuScreen from "./mainmenu/MainMenuScreen"
import MenuInputHandler from "../../controller/input/MenuInputHandler"


class UIManager {
    private activeUI: CanvasScreen | null = null
    uiCanvasContext: CanvasRenderingContext2D
    private canvasProps: { height: number, width: number }
    menuInputHandler: MenuInputHandler
    
    // Screens
    private mainMenuScreen: MainMenuScreen

    constructor(uiCanvasContext: CanvasRenderingContext2D, canvasProps: { height: number, width: number }) {
        this.uiCanvasContext = uiCanvasContext
        this.canvasProps = canvasProps

        this.mainMenuScreen = new MainMenuScreen(uiCanvasContext, canvasProps)
        this.setActiveUI(this.mainMenuScreen)
        this.menuInputHandler = new MenuInputHandler(this.mainMenuScreen)
    }

    getActiveUI = (): CanvasScreen | null => {
        return this.activeUI
    }

    setActiveUI = (uiScreen: CanvasScreen): void => {
        this.activeUI = uiScreen
    }

    deactivateUI = (): void => {
        this.activeUI = null
    }

    getUIRenderables = (): Renderable[] => {
        return this.activeUI != null ? this.activeUI.getRenderables() : []
    }

    getUITextDrawInstructions = (): TextDrawInstruction[] => {
        return this.activeUI != null ? this.activeUI.getTextDrawInstructions() : []
    } 

}

export default UIManager