import IsRenderable from '../../IsRenderable'
import { Renderable } from '../../../Types'
import Entity from '../base/Entity'
import PhysicsComponent from '../../components/PhysicsComponent'
import WorldManager from '../../WorldManager'

class Projectile extends Entity {
    physics: PhysicsComponent = new PhysicsComponent(this)

    velocityX: number = 10

    constructor(height: number, width: number, position: {x: number, y: number}, colour: string) {
        super({
            name: "projectileA",
            code: "projectileA",
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


export default Projectile