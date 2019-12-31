/**
 * Store controller managers
 */
type LoopCode = () => void

class Loop {
    // characterManager: CharacterManager
    lastRender: number
    loopCode: LoopCode

    constructor(loopCode: LoopCode) {
        this.loopCode = loopCode
    }

    run = () => {
        
    }

    stop = () => {

    }

    start = (timestamp: number /** not sure if this is the correct type// loopCode: LoopCode */) => {
        let progress: number = timestamp - this.lastRender

        this.loopCode()
        console.log(timestamp)

        this.lastRender = timestamp
        window.requestAnimationFrame(this.start)
    }

}

export default Loop

/* when loop is done:
    - work on user input / movement
    - then rendering (using canvas's efficiently) and timing of drawing etc
*/