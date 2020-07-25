import Entity from '../base/Entity'
//import NewPhysicsComponent from '../../components/physics/NewPhysicsComponent'
import NewPhysicsComponent from '../../components/physics/NewPhysicsComponent'
import WorldManager from '../../WorldManager'

import { HasPhysics2 } from '../../../Interfaces'

class Projectile extends Entity implements HasPhysics2 {
    physics: NewPhysicsComponent //= new NewPhysicsComponent(this)    // we've lost functinoality to initiate projectile with a given velocity

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
        this.physics = new NewPhysicsComponent(this, velocityX, velocityY)
    }

    update = (worldManager: WorldManager): void => {
        this.physics.update(worldManager)
    }
}


export default Projectile