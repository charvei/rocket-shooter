import Colours from '../world/colours.js'
import Character from '../world/Character.js' //not sure if i should be importing character? i would like it to be even more decoupled right?
import GameObject from '../world/objects/GameObject.js'

//Should change this into a RenderingManager class?
class Renderer {
    context: CanvasRenderingContext2D
    canvasProps: {
        height:number
        width:number
    }
    colours: Colours

    constructor(context:CanvasRenderingContext2D, canvasProps: {height: number, width: number}, colours:Colours) {
        this.context = context
        this.canvasProps = canvasProps
        this.colours = colours
    }

    // Maybe when this gets more complicated this can be made more intelligent?
    drawWorld = (characterList: Character[], objectList: GameObject[]) => {
        //background
        this.context.fillStyle = "#000000" 
        this.context.fillRect(0, 0, this.canvasProps.width, this.canvasProps.height)
        
        //objects
        this.drawObjects(objectList)
        
        //characters
        this.drawCharacters(characterList)


    }

    testDraw = () => {
        this.context.fillStyle = "#000000" 
        this.context.fillRect(0, 0, this.canvasProps.height, this.canvasProps.width)
    }

    // So at some point may want to consider having multiple canvas or something right? buffer screens and stuff
    drawCharacters = (characterList: Character[]) => {
        characterList.forEach(character => {
            this.context.fillStyle = "#0000ff"
            this.context.fillRect(character.getPosition().x, character.getPosition().y, character.getWidth(), character.getHeight())
        })
    }

    drawObjects = (objectList: GameObject[]) => {
        objectList.forEach(object => {
            this.context.fillStyle = "#ffffff"
            this.context.fillRect(object.getPosition().x, object.getPosition().y, object.getWidth(), object.getHeight())
        })
    }

}

export default Renderer