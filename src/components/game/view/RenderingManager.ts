import GameGrid from './grid.js'
import Renderer from './renderer.js'
import Colours from '../world/colours.js'

//Should change this into a RenderingManager class. This guy can hold the gameGrid and manage passing data between
class RenderingManager {
    renderer: Renderer
    gameGrid: GameGrid
    context: CanvasRenderingContext2D
    colours: Colours

    constructor(context: CanvasRenderingContext2D, canvasProps: {height: number, width: number} ) {
        //load grid and colours
        this.colours = new Colours(context)
        this.gameGrid = new GameGrid(canvasProps, this.colours)

        // colours and gamegrid need to be passed to renderer... is this a sign that i need to refactor renderer?
        this.renderer = new Renderer(context, canvasProps, this.gameGrid, this.colours)
    }

    getRenderer = () => {
        return this.renderer
    }



}

export default RenderingManager