import Commands from "./Commands"
import CharacterManager from "../../world/managers/CharacterManager"
import Character from '../../world/objects/character/Character'

import { KeyPressEvent } from "../../Types"

/**
 * Input handler
 * 
 * This class is very ambiguous and deserves refactoring. Probably should be called UserInputHandler.
 * 
 * Perhaps could separate out the general set up of key presses and stuff from the binding to a character. Have the InputHandler / InputController have a list of ElementInputHandlers (e.g. characterInputHandler, UIInputHandler?) 
 * 
 * Core functionality at the moment:
 *  - Store a specific character's actions (e.g. jump)
 *  - Associate them with User's keys
 */
class InputHandler {
    keys: { [key: string]: KeyPressEvent } = {} // record of keyboard keys and their corresponding state of pressed down or up
    previousKeysState: { [key: string]: KeyPressEvent } = {} 

    mouseRelativeToPlayerPosition: object = {}  // describes where user's mouse in relation to their character
    mouseCanvasPos: {x: number, y: number} = {
        x: 0,
        y: 0
    }

    characterManagerRef: CharacterManager
    mouseListenerContext: CanvasRenderingContext2D
    
    playerCharacter: Character | null = null

    jump: (delta: number) => void  = () => { return }
    jetPack: (delta: number) => void = () => { return }
    moveDown: (delta: number) => void = () => { return }
    moveLeft: (delta: number) => void = () => { return }
    moveRight: (delta: number) => void = () => { return }

    shoot: (delta: number) => void = () => { return }
    
    constructor(characterManager: CharacterManager, mouseListenerContext: CanvasRenderingContext2D) {
        this.mouseListenerContext = mouseListenerContext
        this.characterManagerRef = characterManager
        
        // //this.playerCharacter = this.characterManagerRef.getCharacterByName("Adam")
        // this.playerCharacter = this.characterManagerRef.getEntityList().find(character => character.name == "Adam") as Character

        // this.setupKeyDownListeners()
        // this.setMousePositionListener()

        // this.moveRight = Commands.makeMoveUnitCommand(this.playerCharacter, "Right")
        // this.moveLeft = Commands.makeMoveUnitCommand(this.playerCharacter, "Left")
        // this.jump = Commands.makeJumpCommand(this.playerCharacter)
        // this.jetPack = Commands.makeJetPackCommand(this.playerCharacter)
        // this.moveDown = Commands.makeMoveUnitCommand(this.playerCharacter, "Down")

        // // shooting
        // this.shoot = Commands.makeShootCommand(this.playerCharacter)
    }

    bindCommandsToCharacter = (characterRef: string) => {
        this.playerCharacter = this.characterManagerRef.getEntityList().find(character => character.name == characterRef) as Character

        this.setupKeyDownListeners()
        this.setMousePositionListener()

        this.moveRight = Commands.makeMoveUnitCommand(this.playerCharacter, "Right")
        this.moveLeft = Commands.makeMoveUnitCommand(this.playerCharacter, "Left")
        this.jump = Commands.makeJumpCommand(this.playerCharacter)
        this.jetPack = Commands.makeJetPackCommand(this.playerCharacter)
        this.moveDown = Commands.makeMoveUnitCommand(this.playerCharacter, "Down")

        // shooting
        this.shoot = Commands.makeShootCommand(this.playerCharacter)

    }

    public savePreviousKeyState = (): void => {
        this.previousKeysState = this.keys
    }
    
    /**
     * Set up keydown listeners to detect when keys are pressed down and lifted up
     */
    private setupKeyDownListeners = (): void => {
        let keysUsed: string[] = ["w", "a", "s", "d", " "] 
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
            this.keys[e.key] = {
                heldDown: true,
                firstPress: firstPress
            }
        }
    }

    setMousePositionListener = () => {
        let event: Event
        this.mouseListenerContext.canvas.addEventListener('mousemove', event => {
            let boundingRect = this.mouseListenerContext.canvas.getBoundingClientRect()
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
        } if (this.getKeyPressState(' ').heldDown) {
            this.shoot(delta)
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