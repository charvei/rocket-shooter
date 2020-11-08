import Character from '../world/objects/character/Character' //not sure if i should be importing character? i would like it to be even more decoupled right?
import { Renderable, TextDrawInstruction } from "../Types"

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

        this.uiContext.textBaseline = 'middle'
    }

    // Maybe when this gets more complicated this can be made more intelligent?
    //drawWorld = (objectRenderables: Renderable[] = [], projectileRenderables: Renderable[] = [], characterRenderables: Renderable[] = []) => {
    drawWorld = (renderableListList: Renderable[][]) => {
        this.worldContext.clearRect(0, 0, this.canvasProps.width, this.canvasProps.height)
        renderableListList.forEach(renderableList => {
            this.drawRenderables(renderableList, this.worldContext)
        })
    }

    drawBackground = (renderables: Renderable[]) => {
        this.backgroundContext.fillStyle = "#000000" 
        this.backgroundContext.fillRect(0, 0, this.canvasProps.width, this.canvasProps.height)

        this.drawRenderables(renderables, this.backgroundContext)
    }

    // Create a slightly opaque background over everything if i wish
    // Draw list of renderables... might need to adapt this for text and junk
    drawUI = (renderables: Renderable[]) => {
        this.uiContext.clearRect(0, 0, this.canvasProps.width, this.canvasProps.height)
        this.drawRenderables(renderables, this.uiContext)
    }

    drawText = (textDrawInstructions: TextDrawInstruction[]) => {
        // Assumption: will always draw text to UI context
        textDrawInstructions.forEach(instruction => {
            this.uiContext.fillStyle = instruction.colour
            this.uiContext.font = instruction.font
            this.uiContext.fillText(instruction.text, instruction.xPos, instruction.yPos)
        })
    }

    drawRenderables = (renderables: Renderable[], context: CanvasRenderingContext2D) => {
        renderables.forEach(renderable => {
            context.fillStyle = renderable.colour
            context.fillRect(renderable.xPos, renderable.yPos, renderable.width, renderable.height)
        })
    }

    clearUIContext = (): void => {
        this.uiContext.clearRect(0, 0, this.canvasProps.width, this.canvasProps.height)
    }

}

export default Renderer