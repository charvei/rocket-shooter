/**
 * Input handler
 */
class InputHandler {
    canvas: HTMLCanvasElement
    keys: object = {}   // record of keyboard keys and their corresponding state of pressed down or up
     
    constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById('game-canvas')
        this.setupKeyDownListeners()        
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
    handleInput = (): void => {

    }

    /**
     * Check if given key is pressed
     */
    private isPressed = (key: string): boolean => {
        return this.keys[key] ? true : false
    }

}

export default InputHandler