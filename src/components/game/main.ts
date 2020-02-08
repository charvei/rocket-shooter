import WorldManager from './world/WorldManager'
import RenderingManager from './view/RenderingManager.js'
import ControllerManager from './controller/ControllerManager.js'

let context: CanvasRenderingContext2D
let worldManager: WorldManager
let renderingManager: RenderingManager
let controllerManager: ControllerManager
let canvas: {
    element: HTMLCanvasElement,
    props: {
        height: number,
        width: number
    }
}

const width: number = 800
const height: number = 480

const main = (): void => {
    loadStuff()
    doStuff()
}

const loadStuff = (): void => {
    loadCanvas()
    loadWorld()
    loadRendering()
    loadController()
}

const doStuff = (): void => {
    controllerManager.getLoop().start(0)    // could potentially load the code inline here
}

const loadCanvas = (): void => {
    let tempCanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('game-canvas')
    canvas = { 
        element: tempCanvas,
        props: {
            height: tempCanvas.height,
            width: tempCanvas.width
        }
    }
    context = getContext(canvas.element)
}

const loadWorld = (): void => {
    worldManager = new WorldManager(context)
}

const loadRendering = (): void => {
    renderingManager = new RenderingManager(context, canvas.props)
}

const loadController = (): void => {
    controllerManager = new ControllerManager(worldManager, renderingManager)
}

const getContext = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
    if (canvas.getContext) {
        console.log("Successfully got context")
        return canvas.getContext('2d')
    } else {
        console.log("Failed to get context")
    }
}

export { main }