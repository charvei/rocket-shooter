import Entity from '../base/Entity'
import PhysicsComponent from '../../components/physics/PhysicsComponent'
import WorldManager from '../../WorldManager'

import { HasPhysics } from '../../../Interfaces'

class Projectile extends Entity implements HasPhysics {
    physics: PhysicsComponent //= new NewPhysicsComponent(this)    // we've lost functinoality to initiate projectile with a given velocity

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
        this.physics = new PhysicsComponent(this, velocityX, velocityY)
    }

    update = (worldManager: WorldManager): void => {
        this.physics.update(worldManager)
    }
}


export default Projectile