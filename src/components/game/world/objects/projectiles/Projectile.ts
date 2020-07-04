import IsRenderable from '../../IsRenderable'
import { Renderable } from '../../../Types'
import Entity from '../base/Entity'

class Projectile extends Entity {
    velocity: number = 0.5
    
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

}


export default Projectile