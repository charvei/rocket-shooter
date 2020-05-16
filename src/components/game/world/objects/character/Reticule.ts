import GameObject from '../GameObject.js'

class Reticule extends GameObject {
    height: number
    width: number
    colour: string
    
    position: {
        x: number,
        y: number
    }

    constructor(height: number, width: number, position: {x: number, y: number}, colour: string) {
        super({
            name: "reticule",
            code: "code",
            height: height,
            width: width,
            position: position,
            colour: colour
        })
    }


}

export default Reticule