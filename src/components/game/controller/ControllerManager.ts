import Loop from './Loop.js'
import InputHandler from './input/InputHandler.js'
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
        this.inputHandler = new InputHandler(this.worldManager.getCharacterManager())
        this.loop = new Loop(this.update, this.draw)
    }

    getLoop = (): Loop => {
        return this.loop
    }

    update = (delta: number): void => {
        this.inputHandler.handleInput(delta)
        this.worldManager.updateWorld(delta)
    }

    draw = (): void => {
        this.renderingManager.getRenderer().drawWorld(
            this.worldManager.getCharacterManager().getCharacterStoreAsArray(),
            this.worldManager.getGameObjectManager().getObjectStoreAsArray()
        )
    }

    startLooping = (): void => {
       window.requestAnimationFrame(this.getLoop().start)
    }

}

export default ControllerManager