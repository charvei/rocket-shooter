// import Commands from "./commands/Commands"
// import CharacterManager from "../../world/managers/CharacterManager"

// import { KeyPressEvent } from "../../Types"

// // interface InputHandlerInterface {
// //     keys: { [key: string]: KeyPressEvent }
// //     setupKeyDownListeners: () => void
// //     handleInput: (delta: number) => void
    
// // }

// /**
//  * Base Input handler
//  *
//  */
// class BaseInputHandler {
//     keys: { [key: string]: KeyPressEvent } = {} // record of keyboard keys and their corresponding state of pressed down or up
//     previousKeysState: { [key: string]: KeyPressEvent } = {} 

//     mouseRelativeToPlayerPosition: object = {}  // describes where user's mouse in relation to their character
//     mouseCanvasPos: {x: number, y: number} = {
//         x: 0,
//         y: 0
//     }

//     mouseListenerContext: CanvasRenderingContext2D

//     constructor(mouseListenerContext: CanvasRenderingContext2D) {
//         this.mouseListenerContext = mouseListenerContext
//         this.setupKeyDownListeners()
//     }

//     savePreviousKeyState = (): void => {
//         this.previousKeysState = this.keys
//     }
    
//     /**
//      * Set up keydown listeners to detect when keys are pressed down and lifted up
//      */
//     setupKeyDownListeners = (): void => {
//         let keysUsed: string[] = ["w", "a", "s", "d", " "] 
//         keysUsed.forEach((key) => {
//             this.keys[key] = {
//                 heldDown: false,
//                 firstPress: false
//             }
//         }) 

//         window.onkeyup = (e: KeyboardEvent) => {
//             this.keys[e.key] = {
//                 heldDown: false,
//                 firstPress: false
//             }            
//         }

//         window.onkeydown = (e: KeyboardEvent): void => {
//             let firstPress: boolean = !this.keys[e.key].heldDown
//             this.keys[e.key] = {
//                 heldDown: true,
//                 firstPress: firstPress
//             }
//         }
//     }

//     setMousePositionListener = () => {
//         this.mouseListenerContext.canvas.addEventListener('mousemove', event => {
//             let boundingRect = this.mouseListenerContext.canvas.getBoundingClientRect()
//             this.mouseCanvasPos = {// return {
//                 x: event.clientX - boundingRect.left,
//                 y: event.clientY - boundingRect.top
//             }
//         })
//     }

//     /**
//      * Runs once a loop, detects user's raw input and handles it
//      */
//     handleInput = (delta: number): void => {
//         if (this.getKeyPressState('w').firstPress) {
//             this.jump(delta)
//         } if (this.getKeyPressState('w').heldDown) {
//             this.jetPack(delta)
//         } if (this.getKeyPressState('a').heldDown) {
//             this.moveLeft(delta)
//         } if (this.getKeyPressState('s').heldDown) {
//             this.moveDown(delta)
//         } if (this.getKeyPressState('d').heldDown) {
//             this.moveRight(delta)
//         } if (this.getKeyPressState(' ').heldDown) {
//             this.shoot(delta)
//         }
//         this.setPlayerCharacterFocusAngle()
//     }

//     /**
//      * Check if given key is currently pressed down
//      */
//     private getKeyPressState = (key: string): KeyPressEvent => {
//         return this.keys[key] ? this.keys[key] : {firstPress: false, heldDown: false}
//     }
// }

// export default BaseInputHandler