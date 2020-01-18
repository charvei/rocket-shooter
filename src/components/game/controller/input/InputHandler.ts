import Commands from "./Commands"
import CharacterManager from "../../world/CharacterManager"

/**
 * Input handler
 */
class InputHandler {
    canvas: HTMLCanvasElement
    keys: object = {}   // record of keyboard keys and their corresponding state of pressed down or up
    
    characterManagerRef: CharacterManager
    
    moveUp: (delta: number) => void
    moveDown: (delta: number) => void
    moveLeft: (delta: number) => void
    moveRight: (delta: number) => void
    
    constructor(characterManager: CharacterManager) {
        this.canvas = <HTMLCanvasElement> document.getElementById('game-canvas')
        this.setupKeyDownListeners()

        this.characterManagerRef = characterManager
        this.moveRight = Commands.makeMoveUnitCommand(this.characterManagerRef.getCharacterByName("Adam"), "Right")
        this.moveLeft =  Commands.makeMoveUnitCommand(this.characterManagerRef.getCharacterByName("Adam"), "Left")
        this.moveUp = Commands.makeMoveUnitCommand(this.characterManagerRef.getCharacterByName("Adam"), "Up")
        this.moveDown =  Commands.makeMoveUnitCommand(this.characterManagerRef.getCharacterByName("Adam"), "Down")
    }

    /**
     * Set up keydown listeners to detect when keys are pressed down and lifted up
     */
    private setupKeyDownListeners = (): void => {
        window.onkeyup = (e: KeyboardEvent) => {
            this.keys[e.key] = false            
        }

        window.onkeydown = (e: KeyboardEvent): void => {
            this.keys[e.key] = true
        }
    }

    /**
     * Runs once a loop, detects user's raw input and handles it
     */
    handleInput = (delta: number): void => {
        if (this.isPressed('w')) {
            this.moveUp(delta)
        } if (this.isPressed('a')) {
            this.moveLeft(delta)
        } if (this.isPressed('s')) {
            this.moveDown(delta)
        } if (this.isPressed('d')) {
            this.moveRight(delta)
        }
    }

    /**
     * Check if given key is pressed
     */
    private isPressed = (key: string): boolean => {
        return this.keys[key] ? true : false
    }

}

export default InputHandler