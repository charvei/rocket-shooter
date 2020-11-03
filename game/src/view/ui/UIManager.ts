import { Renderable } from "../../Types"
import CanvasScreen from "./CanvasScreen"
import MainMenuScreen from "./mainmenu/MainMenuScreen"
//import UIScreen from "./UIScreen"


class UIManager {
    private activeUI: CanvasScreen | null = null
    uiCanvasContext: CanvasRenderingContext2D
    private canvasProps: { height: number, width: number }
    
    // Screens
    private mainMenuScreen: CanvasScreen

    constructor(uiCanvasContext: CanvasRenderingContext2D, canvasProps: { height: number, width: number }) {
        this.uiCanvasContext = uiCanvasContext
        this.canvasProps = canvasProps

        this.mainMenuScreen = new MainMenuScreen(uiCanvasContext, canvasProps)
        this.setActiveUI(this.mainMenuScreen)
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
        if (this.activeUI) {
            return this.activeUI.getRenderables()
        } else {
            return []
        }
        
        //this.activeUI ? return this.activeUI?.getRenderables() : return null
    }

    // getUIRenderables
    // getUIRenderables = (): Renderable[] | null => {
    //     //return this.activeUI?.getRenderables()
    // }
}

export default UIManager