import WorldManager from '../../WorldManager'
import Entity from '../../objects/base/Entity'

import Forces from './Forces'
import Collisions from './Collisions'
import Movement from './Movement'

import {
    PhysicsEntity
} from "../../../Types"

// enum PositionState {
//     Flying = "FLYING",
//     Touching = "TOUCHING",
//     Colliding = "COLLIDING"
// }

// interface PhysicsState {

// }

class NewPhysicsComponent {
    componentOwner: PhysicsEntity
    forces: Forces = new Forces(this)
    collisions: Collisions = new Collisions(this)
    movement: Movement = new Movement(this)

    firstUpdate: boolean = true

    velocityX = 0
    velocityY = 0

    constructor(componentOwner: PhysicsEntity) {
        this.componentOwner = componentOwner
    }

    update = (worldManager: WorldManager): void => {
        // Perform first update setting up
        if (this.firstUpdate) {
            //
        }
        
        this.forces.applyForces()

        //this.collisions.update()

        this.movement.update(this.velocityX, this.velocityY)

    }



}

export default NewPhysicsComponent