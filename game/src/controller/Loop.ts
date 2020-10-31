type updateFunc = (delta: number) => void
type drawFunc = () => void

/**
 * Game loop class
 * 
 * Written largely from: https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
 */
class Loop {    
    update: updateFunc
    draw: drawFunc

    delta: number = 0
    lastFrameTimeMs: number = 0
    timestep: number = 1000 / 60     // timeSimulatedPerFrame

    fps: number = 60
    framesThisSecond: number = 0
    lastFpsUpdate: number = 0
    fpsDecayWeight: number = 0.25

    fpsDisplay: HTMLElement | null = document.getElementById("fps-display")

    constructor(update: (delta: number) => void, draw: () => void) {
        this.update = update
        this.draw = draw
    }

    start = (timestamp: number) => {
        // Track Fps
        if (timestamp > this.lastFpsUpdate + 1000) {
            this.fps = this.fpsDecayWeight * this.framesThisSecond + (1 - this.fpsDecayWeight) * this.fps

            this.lastFpsUpdate = timestamp
            this.framesThisSecond = 0
        }
        this.framesThisSecond++

        // Track accumulated time that hasn't been spent yet
        this.delta += timestamp - this.lastFrameTimeMs
        this.lastFrameTimeMs = timestamp

        // Update word for every timestep that comprises delta time
        let numberOfSequentialUpdates: number = 0
        while (this.delta >= this.timestep) {
            this.update(this.timestep)
            this.delta -= this.timestep
            if (++numberOfSequentialUpdates >= 240) {   // detect spiral of death
                this.panic()    // fix things
                break;          // break out
            }
        }

        this.draw()

        if (this.fpsDisplay) {
            this.fpsDisplay.textContent = Math.round(this.fps) + ' FPS'
        }

        window.requestAnimationFrame(this.start)
    }

    
    run = () => {
    }

    stop = () => {
    }

    panic = () => {
        console.log("<PANIC>")
        this.stop()
    }

}

export default Loop

/* when loop is done:
    - work on user input / movement
    - then rendering (using canvas's efficiently) and timing of drawing etc
*/