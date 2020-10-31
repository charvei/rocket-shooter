import Entity from './base/Entity'
import { HasPhysics } from '../../Interfaces'
import PhysicsComponent from '../components/physics/PhysicsComponent'
import WorldManager from '../WorldManager'

/**
 * Object in the game. Base class that more specific objects will inherit from.
 */
class Platform extends Entity implements HasPhysics {

    physics: PhysicsComponent = new PhysicsComponent(this)

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

    update = (worldManager: WorldManager): void => {
        this.physics.update(worldManager)
    }
    
}

export default Platform