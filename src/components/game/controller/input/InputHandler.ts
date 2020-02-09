import Commands from "./Commands"
import CharacterManager from "../../world/CharacterManager"

type KeyPressEvent = {
    heldDown: boolean,
    firstPress: boolean
}

/**
 * Input handler
 */
class InputHandler {
    keys: object = {}   // record of keyboard keys and their corresponding state of pressed down or up
    previousKeysState: object = {} // 

    characterManagerRef: CharacterManager
    
    jump: (delta: number) => void
    jetPack: (delta: number) => void
    moveDown: (delta: number) => void
    moveLeft: (delta: number) => void
    moveRight: (delta: number) => void
    
    constructor(characterManager: CharacterManager) {
        this.setupKeyDownListeners()

        this.characterManagerRef = characterManager
        this.moveRight = Commands.makeMoveUnitCommand(this.characterManagerRef.getCharacterByName("Adam"), "Right")
        this.moveLeft = Commands.makeMoveUnitCommand(this.characterManagerRef.getCharacterByName("Adam"), "Left")
        
        this.jump = Commands.makeJumpCommand(this.characterManagerRef.getCharacterByName("Adam"))
        this.jetPack = Commands.makeJetPackCommand(this.characterManagerRef.getCharacterByName("Adam"))
        this.moveDown =  Commands.makeMoveUnitCommand(this.characterManagerRef.getCharacterByName("Adam"), "Down")
    }

    public savePreviousKeyState = (): void => {
        this.previousKeysState = this.keys
    }
    
    /**
     * Set up keydown listeners to detect when keys are pressed down and lifted up
     */
    private setupKeyDownListeners = (): void => {
        let keysUsed: string[] = ["w", "a", "s", "d"] 
        keysUsed.forEach((key) => {
            this.keys[key] = {
                heldDown: false,
                firstPress: false
            }
        }) 

        window.onkeyup = (e: KeyboardEvent) => {
            this.keys[e.key] = {
                heldDown: false,
                firstPress: false
            }            
        }

        window.onkeydown = (e: KeyboardEvent): void => {
            let firstPress: boolean = !this.keys[e.key].heldDown
            console.log("keys before stuff happens in onkeydown: " + this.keys[e.key].heldDown)
            this.keys[e.key] = {
                heldDown: true,
                firstPress: firstPress
            }
            console.log(this.keys[e.key].firstPress)
        }
    }

    /**
     * Runs once a loop, detects user's raw input and handles it
     */
    handleInput = (delta: number): void => {
        console.log("handle input w key: " + this.keys["w"])
        if (this.getKeyPressState('w').firstPress) {
            this.jump(delta)
        } if (this.getKeyPressState('w').heldDown) {
            this.jetPack(delta)
        } if (this.getKeyPressState('a').heldDown) {
            this.moveLeft(delta)
        } if (this.getKeyPressState('s').heldDown) {
            this.moveDown(delta)
        } if (this.getKeyPressState('d').heldDown) {
            this.moveRight(delta)
        }
    }

    /**
     * Check if given key is currently pressed down
     */
    private getKeyPressState = (key: string): KeyPressEvent => {
        return this.keys[key] ? this.keys[key] : {firstPress: false, heldDown: false}
    }
}

export default InputHandler