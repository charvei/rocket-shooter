import Entity from './base/Entity'

/**
 * Object in the game. Base class that more specific objects will inherit from.
 */
class Platform extends Entity {

    constructor(name: string, code: string, height: number, width: number, position: {x: number, y: number}, colour: string) {
        super({
            name: "platformA",
            code: "projectileB",
            height: height,
            width: width,
            position: position,
            colour: colour
        })
    }
    
}

export default Platform