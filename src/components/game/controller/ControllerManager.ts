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
        this.inputHandler = new InputHandler(this.worldManager.getCharacterManager(), this.worldManager.foregroundManager.getForegroundContext())
        this.loop = new Loop(this.update, this.draw)
    }

    getLoop = (): Loop => {
        return this.loop
    }

    update = (delta: number): void => {
        this.inputHandler.handleInput(delta)
        
        this.worldManager.updateWorld(delta)

        this.worldManager.updateForeground(delta)
        
        this.inputHandler.savePreviousKeyState()
        
        this.inputHandler.setPlayerCharacterFocusAngle()

        //this.inputHandler.calculateAngleFromPlayerCharacter()
    }

    draw = (): void => {
        this.renderingManager.getRenderer().drawWorld(
            //this.worldManager.getCharacterManager().getCharacterList(),
            this.worldManager.getCharacterManager().getCharacterRenderables(),
            this.worldManager.getPlatformManager().getEntityRenderables(),
            this.worldManager.getForegroundManager().getActiveForeground().getRenderables(),
            this.worldManager.getProjectileManager().getEntityRenderables()

            //Probably this is an indicater that says world manager should collate all this?
        )

        //this.renderingManager.getRenderer().drawRenderables
    }

    startLooping = (): void => {
       window.requestAnimationFrame(this.getLoop().start)
    }

}

export default ControllerManager