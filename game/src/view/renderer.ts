import Character from '../world/objects/character/Character' //not sure if i should be importing character? i would like it to be even more decoupled right?
import { Renderable } from "../Types"

class Renderer {
    worldContext: CanvasRenderingContext2D
    foregroundContext: CanvasRenderingContext2D
    canvasProps: {
        height:number
        width:number
    }

    constructor(worldContext: CanvasRenderingContext2D, foregroundContext: CanvasRenderingContext2D, canvasProps: {height: number, width: number}) {
        this.worldContext = worldContext
        this.foregroundContext = foregroundContext
        this.canvasProps = canvasProps
    }

    // Maybe when this gets more complicated this can be made more intelligent?
    drawWorld = (objectRenderables: Renderable[] = [], foregroundRenderables: Renderable[] = [], projectileRenderables: Renderable[] = [], characterRenderables: Renderable[] = []) => {
        this.worldContext.clearRect(0, 0, this.canvasProps.width, this.canvasProps.height)

        //background
        this.worldContext.fillStyle = "#000000" 
        this.worldContext.fillRect(0, 0, this.canvasProps.width, this.canvasProps.height)
        
        //foreground
        this.drawForeground(foregroundRenderables)

        //objects
        this.drawRenderables(objectRenderables)
        
        //characters
        this.drawRenderables(characterRenderables)

        //projectiles
        this.drawRenderables(projectileRenderables)

    }

    // So at some point may want to consider having multiple canvas or something right? buffer screens and stuff
    drawCharacters = (characterList: Character[]) => {
        characterList.forEach(character => {
            this.worldContext.fillStyle = character.colour
            this.worldContext.fillRect(character.getPosition().x, character.getPosition().y, character.getWidth(), character.getHeight())

            this.worldContext.fillStyle = character.reticule.colour
            this.worldContext.fillRect(character.reticule.getPosition().x, character.reticule.getPosition().y, character.reticule.getWidth(), character.reticule.getHeight())
        })
    }

    drawRenderables = (renderables: Renderable[]) => {
        renderables.forEach(renderable => {
            this.worldContext.fillStyle = renderable.colour
            this.worldContext.fillRect(renderable.xPos, renderable.yPos, renderable.width, renderable.height)
        })
    }

    drawForeground = (renderables: Renderable[]) => {
        renderables.forEach(renderable => {
            this.worldContext.fillStyle = "rgba(255, 255, 255, 0.5)"
            this.worldContext.fillRect(renderable.xPos, renderable.yPos, renderable.width, renderable.height)
        })

        // this.foregroundContext.clearRect(0, 0, this.canvasProps.width, this.canvasProps.height)
        // this.foregroundContext.fillStyle = "rgba(255, 255, 255, 0.5)"
        // this.foregroundContext.fillRect(0, 0, this.canvasProps.width, this.canvasProps.height)
    }

}

export default Renderer