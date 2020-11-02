import { GameState } from "../Types"
import RenderingManager from "../view/RenderingManager"
import WorldManager from "../world/WorldManager"
import InputHandler from "./input/InputHandler"
import Loop from "./Loop"
import { v4 as uuidv4 } from 'uuid'

class StateManager {
    gameState: GameState = GameState.Menu
    worldManager: WorldManager
    renderingManager: RenderingManager
    inputHandler: InputHandler
    loop: Loop = new Loop(() => { return }, () => { return })
    //loop: Loop

    userRef: string = uuidv4()

    constructor(worldManager: WorldManager, renderingManager: RenderingManager) {
        this.worldManager = worldManager
        this.renderingManager = renderingManager
        this.inputHandler = new InputHandler(this.worldManager.characterManager, this.worldManager.foregroundManager.getForegroundContext())
        //this.loop = this.createMenuLoop()
        this.loop.start(0)
        // setTimeout(() => {
        //     this.startGame()
        // }, 5000)
    }

    throwError = (gameState: GameState, destinationState: GameState) => {
        throw new Error("Not valid to go from " + gameState + " to " + destinationState)
    }

    changeState = (destinationState: GameState): void => {
        switch (this.gameState) {
            case GameState.Menu:
                if (destinationState === GameState.Game) {
                    // Menu -> Game; Start new game
                    this.gameState = destinationState
                    this.startGame()
                }
                if (destinationState === GameState.Menu) {
                    // Menu -> Menu; ???
                    this.gameState = destinationState
                    this.loop.setInnerFunctions(
                        this.menuUpdate, 
                        this.menuDraw
                    )
                }
                if (destinationState === GameState.Pause) {
                    // Menu -> Pause; Invalid
                    this.throwError(this.gameState, destinationState)
                }
                break
            
            case GameState.Game:
                if (destinationState === GameState.Pause) {
                    // Game -> Pause; Pause game and show pause screen
                    this.gameState = destinationState
                    this.loop.setInnerFunctions(
                        this.pauseUpdate,
                        this.gameDraw
                    )
                } else {
                    // Game -> Game; Invalid
                    this.throwError(this.gameState, destinationState)
                }
                break

            case GameState.Pause:
                if (destinationState === GameState.Game) {
                    // Pause -> Game; Resume game
                    this.gameState = destinationState
                    //this.resumeGame()
                    this.loop.setUpdate(this.gameUpdate)
                    this.loop.setDraw(this.gameDraw)
                }
                if (destinationState === GameState.Menu) {
                    // Pause -> Menu; Close game and go to menu
                    this.gameState = destinationState
                }
                break
                
            default:
                break
        }
    }

    startGame = (): void => {
        this.worldManager.characterManager.addCharacter(this.userRef, {x: 620, y: 150}, "#c12395")
        this.inputHandler.bindCommandsToCharacter(this.userRef)
        
        this.loop.setUpdate(this.gameUpdate)
        this.loop.setDraw(this.gameDraw)
    }

    gameUpdate = (delta: number): void => {
        console.log("2: i'm updating")
        this.inputHandler.handleInput(delta)
        this.worldManager.updateWorld(delta)
        this.worldManager.updateForeground(delta)
        this.inputHandler.savePreviousKeyState()
    }

    gameDraw = (): void => {
        this.renderingManager.getRenderer().drawWorld(
            this.worldManager.getPlatformManager().getEntityRenderables(),
            this.worldManager.getForegroundManager().getActiveForeground().getRenderables(),
            this.worldManager.getProjectileManager().getEntityRenderables(),
            this.worldManager.characterManager.getCharacterRenderables()
            //Probably this is an indicater that says world manager should collate all this?
        )

        //this.renderingManager.getRenderer().drawRenderables
    }

    menuUpdate = (delta: number): void => {
        console.log("1: i'm updating")
        this.worldManager.updateWorld(delta)
        this.worldManager.updateForeground(delta)
    }

    menuDraw = (): void => {
        this.renderingManager.renderer.drawWorld(
            this.worldManager.platformManager.getEntityRenderables(),
            this.worldManager.foregroundManager.getActiveForeground().getRenderables()
        )
    }

    pauseUpdate = (delta: number): void => {
        console.log("pause: i'm updating")
        this.worldManager.updateForeground(delta)
    }

    pauseDraw = (): void => {
        this.renderingManager.renderer.drawWorld(
            this.worldManager.foregroundManager.getActiveForeground().getRenderables()
        )
    }

}

export default StateManager