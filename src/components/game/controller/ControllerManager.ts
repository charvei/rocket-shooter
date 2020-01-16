import Loop from './Loop.js'
import InputHandler from './InputHandler.js'
import WorldManager from '../world/WorldManager.js'
import RenderingManager from '../view/RenderingManager.js'

/**
 * Store controller managers
 */
class ControllerManager {
    worldManager: WorldManager
    renderingManager: RenderingManager
    inputHandler: InputHandler // this may end up just being a function?
    loop: Loop


    constructor(worldManager: WorldManager, renderingManager: RenderingManager) {
        this.worldManager = worldManager
        this.renderingManager = renderingManager

        this.inputHandler = new InputHandler()
        this.loop = new Loop(this.update, this.draw)
    }

    getLoop = (): Loop => {
        return this.loop
    }

    update = (delta: number): void => {
        this.worldManager.updateWorld(delta)
    }

    draw = (): void => {
        this.renderingManager.getRenderer().drawWorld(
            this.worldManager.getCharacterManager().getCharacterStoreAsArray()
        )
    }

    startLooping = (): void => {
       window.requestAnimationFrame(this.getLoop().start)
    }

}

export default ControllerManager