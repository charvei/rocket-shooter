import WorldManager from '../world/WorldManager.js'
import RenderingManager from '../view/RenderingManager.js'
import { GameState } from '../Types.js'
import StateManager from './StateManager.js'
import UIManager from '../view/ui/UIManager.js'
/**
 * Store controller managers
 */
class ControllerManager {
    stateManager: StateManager 

    constructor(worldManager: WorldManager, renderingManager: RenderingManager, uiManager: UIManager) {
        this.stateManager = new StateManager(worldManager, renderingManager, uiManager)
        this.stateManager.loop.start(0)
        //this.stateManager.changeState(GameState.Menu)

        // Testing out switching game states
        this.stateManager.changeState(GameState.Menu)
        setTimeout(() => {
            this.stateManager.changeState(GameState.Game)
            setTimeout(() => {
                this.stateManager.changeState(GameState.Pause)
                setTimeout(() => {
                    this.stateManager.changeState(GameState.Game)
                }, 5000)
            }, 5000)
        }, 25000)
    }

    startMenu = () => {
        
    }

}

export default ControllerManager