
import { KeyPressEvent } from "../../Types"
import MainMenuScreen from "../../view/ui/mainmenu/MainMenuScreen"
import UICommands from "./commands/UICommands"

/**
 * Menu Input handler
 */
class MenuInputHandler {
    keys: { [key: string]: KeyPressEvent } = {} // record of keyboard keys and their corresponding state of pressed down or up
    previousKeysState: { [key: string]: KeyPressEvent } = {}     

    moveUp: () => void = () => { return }
    moveDown: () => void = () => { return }
    select: () => void = () => { return }

    constructor(menu: MainMenuScreen) {
        this.setupKeyDownListeners()
        this.bindCommands(menu)
    }

    bindCommands = (menu: MainMenuScreen) => {
        this.moveUp = UICommands.makeIncrementMenuSelectionCommand(menu)
        this.moveDown = UICommands.makeDecrementMenuSelectionCommand(menu)
        this.select = UICommands.makeSelectOptionCommand(menu)

    }

    savePreviousKeyState = (): void => {
        this.previousKeysState = this.keys
    }
    
    /**
     * Set up keydown listeners to detect when keys are pressed down and lifted up
     */
    setupKeyDownListeners = (): void => {
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

    /**
     * Runs once a loop, detects user's raw input and handles it
     */
    handleInput = (): void => {
        if (this.getKeyPressState('s').firstPress) {
            this.moveUp()
            this.keys['s'] = {firstPress: false, heldDown: true}
        } if (this.getKeyPressState('w').firstPress) {
            this.moveDown()
            this.keys['w'] = {firstPress: false, heldDown: true}
        } if (this.getKeyPressState('d').heldDown) {
            // this.select()
        } if (this.getKeyPressState(' ').heldDown) {
            // this.shoot(delta)
        }
    }

    /**
     * Check if given key is currently pressed down
     */
    getKeyPressState = (key: string): KeyPressEvent => {
        return this.keys[key] ? this.keys[key] : {firstPress: false, heldDown: false}
    }
}

export default MenuInputHandler