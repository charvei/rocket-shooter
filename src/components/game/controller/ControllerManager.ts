import Loop from './Loop.js'
import WorldManager from '../world/WorldManager.js'
import RenderingManager from '../view/RenderingManager.js'

/**
 * Store controller managers
 */
class ControllerManager {
    worldManager: WorldManager
    renderingManager: RenderingManager
    loop: Loop

    constructor(worldManager: WorldManager, renderingManager: RenderingManager) {
        this.worldManager = worldManager
        this.renderingManager = renderingManager
        this.loop = new Loop(this.update, this.draw)
    }

    getLoop = () => {
        return this.loop
    }

    update = (delta: number) => {
        this.worldManager.updateWorld(delta)
    }

    draw = () => {
        this.renderingManager.getRenderer().drawWorld(
            this.worldManager.getCharacterManager().getCharacterStoreAsArray()
        )
    }

    startLooping = () => {
       window.requestAnimationFrame(this.getLoop().start)
    }

}

export default ControllerManager