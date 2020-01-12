/**
 * Store controller managers
 */

type updateFunc = (delta: number) => void
type drawFunc = () => void

class Loop {
    // characterManager: CharacterManager
    lastRender: number
    
    update: updateFunc
    draw: drawFunc

    delta: number = 0
    lastFrameTimeMs: number = 0
    timestep: number = 1000 / 59     // timeSimulatedPerFrame

    constructor(update: (delta: number) => void, draw: () => void) {
        this.update = update
        this.draw = draw
    }

    run = () => {
        
    }

    stop = () => {

    }

    start = (timestamp: number) => {

        // Track accumulated time that hasn't been spent yet
        this.delta += timestamp - this.lastFrameTimeMs
        this.lastFrameTimeMs = timestamp

        while (this.delta >= this.timestep) {
            this.update(this.timestep)
            this.delta -= this.timestep
        }
        console.log(this.delta)

        this.draw()

        window.requestAnimationFrame(this.start)
    }

}

export default Loop

/*
work left on loop:
    -Panic / loop of death handling
    -FPS monitoring

*/

/* when loop is done:
    - work on user input / movement
    - then rendering (using canvas's efficiently) and timing of drawing etc
*/