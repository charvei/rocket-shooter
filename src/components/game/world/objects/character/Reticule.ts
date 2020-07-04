import Entity from '../base/Entity'

class Reticule extends Entity {
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