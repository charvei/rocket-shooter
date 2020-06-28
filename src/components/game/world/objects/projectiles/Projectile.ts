import IsRenderable from '../../IsRenderable'
import { Renderable } from '../../../Types'

class Projectile implements IsRenderable {
    height: number
    width: number
    colour: string
    
    //position in world
    position: {
        x: number,
        y: number
    }

    velocity: number = 0.5
    
    constructor() {

    }

    getRenderable() {
        let renderable: Renderable = {
            xPos: this.position.x,
            yPos: this.position.y,
            height: this.height,
            width: this.width,
            colour: this.colour
        }
        return renderable
    }
}


export default Projectile