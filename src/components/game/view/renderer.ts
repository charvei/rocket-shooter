import GameGrid from './grid.js'
import Colours from '../world/colours.js'
import Character from '../world/character.js' //not sure if i should be importing character? i would like it to be even more decoupled right?

//Should change this into a RenderingManager class. This guy can hold the gameGrid and manage passing data between
class Renderer {
    context: CanvasRenderingContext2D
    canvasProps: {
        height:number
        width:number
    }
    gameGrid: GameGrid
    colours: Colours

    constructor(context:CanvasRenderingContext2D, canvasProps: {height: number, width: number}, gameGrid:GameGrid, colours:Colours) {
        this.context = context
        this.canvasProps = canvasProps
        this.gameGrid = gameGrid
        this.colours = colours
    }

    // Maybe when this gets more complicated this can be made more intelligent?
    drawWorld = (characterList: Character[]) => {
        //background
        this.context.fillStyle = "#000000" 
        this.context.fillRect(0, 0, this.canvasProps.width, this.canvasProps.height)
    
        //characters
        this.drawCharacters(characterList)
    }

    testDraw = () => {
        this.context.fillStyle = "#000000" 
        this.context.fillRect(0, 0, this.canvasProps.height, this.canvasProps.width)
    }

    drawPixels = () => {
        for (let x:number = 0; x<this.canvasProps.width; x++) {
            for (let y:number = 0; y<this.canvasProps.height; y++) {
                try {
                    this.context.putImageData(this.gameGrid.getCoord(x, y).getImageData(), x, y)
                } catch (error) {
                    throw error
                }
            }
        }
    }

    // So at some point may want to consider having multiple canvas or something right? buffer screens and stuff
    drawCharacters = (characterList: Character[]) => {
        characterList.forEach(character => {
            this.context.fillStyle = "#ffffff"
            this.context.fillRect(character.getPosition().x, character.getPosition().y, character.getWidth(), character.getHeight())
        })
    }

}

export default Renderer