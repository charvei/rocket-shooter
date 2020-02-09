import Renderer from './renderer.js'
import Colours from '../world/colours.js'

class RenderingManager {
    renderer: Renderer
    context: CanvasRenderingContext2D
    colours: Colours

    constructor(context: CanvasRenderingContext2D, canvasProps: {height: number, width: number} ) {
        //load grid and colours
        this.colours = new Colours(context)

        // colours and gamegrid need to be passed to renderer... is this a sign that i need to refactor renderer?
        this.renderer = new Renderer(context, canvasProps, this.colours)
    }

    getRenderer = () => {
        return this.renderer
    }

}

export default RenderingManager