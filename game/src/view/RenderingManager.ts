import Renderer from './Renderer.js'

class RenderingManager {
    renderer: Renderer

    constructor(worldContext: CanvasRenderingContext2D, backgroundContext: CanvasRenderingContext2D, uiContext: CanvasRenderingContext2D, canvasProps: {height: number, width: number} ) {
        this.renderer = new Renderer(worldContext, backgroundContext, uiContext, canvasProps)
    }

    getRenderer = () => {
        return this.renderer
    }
}

export default RenderingManager