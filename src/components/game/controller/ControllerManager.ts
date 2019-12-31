import Loop from './Loop.js'

/**
 * Store controller managers
 */
class ControllerManager {
    loop: Loop

    constructor(loopCode: () => void) {
        this.loop = new Loop(loopCode)
    }

    getLoop = () => {
        return this.loop
    }

    startLooping = () => {
       window.requestAnimationFrame(this.getLoop().start)
    }

}

export default ControllerManager