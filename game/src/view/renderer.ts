import Character from '../world/objects/character/Character' //not sure if i should be importing character? i would like it to be even more decoupled right?
import { Renderable } from "../Types"

class Renderer {
    worldContext: CanvasRenderingContext2D
    backgroundContext: CanvasRenderingContext2D
    uiContext: CanvasRenderingContext2D
    canvasProps: {
        height:number
        width:number
    }

    constructor(worldContext: CanvasRenderingContext2D, backgroundContext: CanvasRenderingContext2D, uiContext: CanvasRenderingContext2D, canvasProps: {height: number, width: number}) {
        this.worldContext = worldContext
        this.backgroundContext = backgroundContext
        this.uiContext = uiContext
        this.canvasProps = canvasProps
    }

    // Maybe when this gets more complicated this can be made more intelligent?
    //drawWorld = (objectRenderables: Renderable[] = [], projectileRenderables: Renderable[] = [], characterRenderables: Renderable[] = []) => {
    drawWorld = (renderableListList: Renderable[][]) => {
        this.worldContext.clearRect(0, 0, this.canvasProps.width, this.canvasProps.height)
        renderableListList.forEach(renderableList => {
            this.drawRenderables(renderableList)
        })
    }

    drawBackground = (renderables: Renderable[]) => {
        this.backgroundContext.fillStyle = "#000000" 
        this.backgroundContext.fillRect(0, 0, this.canvasProps.width, this.canvasProps.height)

        this.drawBackgroundRenderables(renderables)
    }

    // drawUI = (renderables: Renderable[]) => {
    //     this.
    //     // Create a slightly opaque background over everything if i wish

    //     // Draw list of renderables... might need to adapt this for text and junk
    // }
    drawUI = (renderables: Renderable[]) => {
        renderables.forEach(renderable => {
            this.uiContext.fillStyle = renderable.colour
            this.uiContext.fillRect(renderable.xPos, renderable.yPos, renderable.width, renderable.height)
        })
    }

    drawRenderables = (renderables: Renderable[]) => {
        renderables.forEach(renderable => {
            this.worldContext.fillStyle = renderable.colour
            this.worldContext.fillRect(renderable.xPos, renderable.yPos, renderable.width, renderable.height)
        })
    }

    drawBackgroundRenderables = (renderables: Renderable[]) => {
        renderables.forEach(renderable => {
            this.backgroundContext.fillStyle = "rgba(255, 255, 255, 0.5)"
            this.backgroundContext.fillRect(renderable.xPos, renderable.yPos, renderable.width, renderable.height)
        })
    }

    clearUIContext = (): void => {
        this.uiContext.clearRect(0, 0, this.canvasProps.width, this.canvasProps.height)
    }

}

export default Renderer