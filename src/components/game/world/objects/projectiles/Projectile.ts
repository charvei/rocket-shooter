import Entity from '../base/Entity'
import PhysicsComponent from '../../components/PhysicsComponent'
import WorldManager from '../../WorldManager'

import { HasPhysics } from '../../../Interfaces'

class Projectile extends Entity implements HasPhysics {
    physics: PhysicsComponent = new PhysicsComponent(this)

    velocityX: number
    velocityY: number

    constructor(height: number, width: number, position: {x: number, y: number}, colour: string, 
            velocityX: number, velocityY: number) {
        super({
            name: "projectileA",
            code: "projectileA",
            height: height,
            width: width,
            position: position,
            colour: colour
        })
        this.velocityX = velocityX
        this.velocityY = velocityY

    }

    update = (worldManager: WorldManager): void => {
        this.physics.update(worldManager)
    }
}


export default Projectile