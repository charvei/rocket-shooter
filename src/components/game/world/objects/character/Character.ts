import WorldManager from '../../WorldManager.js'
import Entity from '../base/Entity'
import Reticule from './Reticule.js'

//import PhysicsComponent from '../../components/PhysicsComponent.js'
//import NewPhysicsComponent from '../../components/physics/NewPhysicsComponent.js'
import NewPhysicsComponent from '../../components/physics/NewPhysicsComponent'
import InputComponent from '../../components/InputComponent.js'
import GunComponent from '../../components/GunComponent.js'

import { HasPhysics2 } from '../../../Interfaces'

/**
 * Character or unit that exists in the game. This should probably go through some inheritance type things at some point
 */
class Character extends Entity implements HasPhysics2 {
    // components
    // velocityX: number = 0
    // velocityY: number = 0
    // physics: PhysicsComponent = new PhysicsComponent(this)
    physics: NewPhysicsComponent = new NewPhysicsComponent(this)

    input: InputComponent = new InputComponent(this)
    gun: GunComponent = new GunComponent(this)

    reticule: Reticule

    focusAngle: number
    
    constructor(name: string, code: string, height: number, width: number, position: {x: number, y: number}, colour: string) {
        super({
            name: name,
            code: code,
            height: height,
            width: width,
            position: position,
            colour: colour
        })

        this.focusAngle = 1
        this.reticule = new Reticule(5, 5, {x: 50, y: 50}, "ffffff")      //reticule probably actually is more fitting as a COMPONENT 
    }

    update = (worldManager: WorldManager): void => {
        this.physics.update(worldManager)
        this.setReticule()
        this.gun.update(worldManager)
       
        //generate projectile
        //this.gun.update(worldManager)
    }

    setReticule = () => {
        this.reticule.position.x = this.position.x + (this.width/2) - this.reticule.width/2 + 25 * Math.cos(this.focusAngle)
        this.reticule.position.y = this.position.y + (this.height/2) - this.reticule.height/2 + 25 * Math.sin(this.focusAngle) 
    }
   
}

export default Character