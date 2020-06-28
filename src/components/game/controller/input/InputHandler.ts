import Commands from "./Commands"
import CharacterManager from "../../world/objects/character/CharacterManager"
import Character from '../../world/objects/character/Character'

import { KeyPressEvent } from "../../Types"

/**
 * Input handler
 */
class InputHandler {
    keys: object = {}   // record of keyboard keys and their corresponding state of pressed down or up
    previousKeysState: object = {} // 

    mouseRelativeToPlayerPosition: object = {}  // describes where user's mouse in relation to their character
    mouseCanvasPos: {x: number, y: number} = {
        x: 0,
        y: 0
    }

    characterManagerRef: CharacterManager
    foregroundContext: CanvasRenderingContext2D
    
    playerCharacter: Character

    jump: (delta: number) => void
    jetPack: (delta: number) => void
    moveDown: (delta: number) => void
    moveLeft: (delta: number) => void
    moveRight: (delta: number) => void
    
    constructor(characterManager: CharacterManager, foregroundContext: CanvasRenderingContext2D) {
        this.foregroundContext = foregroundContext
        this.characterManagerRef = characterManager
        this.playerCharacter = this.characterManagerRef.getCharacterByName("Adam")

        this.setupKeyDownListeners()
        this.setMousePositionListener()

        this.moveRight = Commands.makeMoveUnitCommand(this.playerCharacter, "Right")
        this.moveLeft = Commands.makeMoveUnitCommand(this.playerCharacter, "Left")
        this.jump = Commands.makeJumpCommand(this.playerCharacter)
        this.jetPack = Commands.makeJetPackCommand(this.playerCharacter)
        this.moveDown =  Commands.makeMoveUnitCommand(this.playerCharacter, "Down")
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

    setMousePositionListener = () => {
        let event: Event
        this.foregroundContext.canvas.addEventListener('mousemove', event => {
            let boundingRect = this.foregroundContext.canvas.getBoundingClientRect()
            // console.log("hello.")
            this.mouseCanvasPos = {// return {
                x: event.clientX - boundingRect.left,
                y: event.clientY - boundingRect.top
            }
        })
    }

    /**
     * Runs once a loop, detects user's raw input and handles it
     */
    handleInput = (delta: number): void => {
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
        this.setPlayerCharacterFocusAngle()
    }

    /**
     * Set the character's focus angle based on relative position of character and player's mouse
     */
    setPlayerCharacterFocusAngle = (): void => {
        // get character position... we want it to be the player's character hey
        // draw line from character and mouse
        let characterMidPoint = {
            x: this.playerCharacter.position.x + this.playerCharacter.width/2,
            y: this.playerCharacter.position.y + this.playerCharacter.height/2
        }

        let angle = Math.atan2(this.mouseCanvasPos.y - characterMidPoint.y, this.mouseCanvasPos.x - characterMidPoint.x)

        this.playerCharacter.input.setFocusAngle(angle)
    }

    /**
     * Check if given key is currently pressed down
     */
    private getKeyPressState = (key: string): KeyPressEvent => {
        return this.keys[key] ? this.keys[key] : {firstPress: false, heldDown: false}
    }
}

export default InputHandler