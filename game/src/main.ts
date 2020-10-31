import WorldManager from './world/WorldManager'
import RenderingManager from './view/RenderingManager.js'
import ControllerManager from './controller/ControllerManager.js'

let worldContext: CanvasRenderingContext2D
let foregroundContext: CanvasRenderingContext2D

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
    loadForegroundCanvas()
    loadWorldCanvas()
    
    loadWorld()

    loadRendering()
    loadController()
}

const doStuff = (): void => {
    controllerManager.getLoop().start(0)    // could potentially load the code inline here
}

const loadWorldCanvas = (): void => {
    let tempCanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('game-canvas')
    canvas = { 
        element: tempCanvas,
        props: {
            height: tempCanvas.height,
            width: tempCanvas.width
        }
    }
    worldContext = getContext(canvas.element)
}

const loadForegroundCanvas = (): void => {
    let tempCanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('foreground-canvas')
    canvas = {
        element: tempCanvas,
        props: {
            height: tempCanvas.height,
            width: tempCanvas.width
        }
    }
    foregroundContext = getContext(canvas.element)
}

const loadWorld = (): void => {
    worldManager = new WorldManager(worldContext, foregroundContext, canvas.props)
}

const loadRendering = (): void => {
    renderingManager = new RenderingManager(worldContext, foregroundContext, canvas.props)
}

const loadController = (): void => {
    controllerManager = new ControllerManager(worldManager, renderingManager)
}

const getContext = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
    let context: CanvasRenderingContext2D | null = canvas.getContext('2d')
    if (context != null) {
        console.log("Successfully got context")
        return context
    } else {
        throw Error("Couldn't retrieve context for canvas: " + canvas)
    }
}

export { main }