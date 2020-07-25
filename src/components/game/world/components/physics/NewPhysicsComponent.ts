import WorldManager from '../../WorldManager'
import Entity from '../../objects/base/Entity'

import Forces from './Forces'
import Collisions from './Collisions'
import Movement from './Movement'

import {
    PhysicsEntity,
    PositionState
} from "../../../Types"

interface PhysicsState {

}

class NewPhysicsComponent {
    componentOwner: PhysicsEntity
    forces: Forces = new Forces(this)
    collisions: Collisions = new Collisions(this)
    movement: Movement = new Movement(this)

    positionState: PositionState = PositionState.Flying

    firstTick: boolean = true

    velocityX = 0
    velocityY = 0

    constructor(componentOwner: PhysicsEntity, velocityX: number = 0, velocityY: number = 0) {
        this.componentOwner = componentOwner
        this.velocityX = velocityX
        this.velocityY = velocityY
    }

    update = (worldManager: WorldManager): void => {
        // Perform first update to set up -- this could be done in constructor but would require constructor to have worldmanager as parameter
        if (this.firstTick) {
            //
        }
        
        this.forces.applyForces()

        this.collisions.update(worldManager)
        

        //steps:
        //check for collisions before updating, register a 'will hit' event
        //'will hit' events are processed by a will hit event watcher that adjust the hit objects movements accordingly / sets their variables that will result in their movements being adjusted when 'this.movement.update' is called
        //plus other stuff like processing damage and things?

        this.movement.update(this.velocityX, this.velocityY)

    }

    



}

export default NewPhysicsComponent