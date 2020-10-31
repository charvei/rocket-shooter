import PhysicsComponent from './PhysicsComponent'

import {
    PositionState
} from "../../../Types"

/**
 * Contains logic for enacting forces for PhysicsComponent
 */
class Forces {
    ownerPhysicsComponent: PhysicsComponent

    constructor(ownerPhysicsComponent: PhysicsComponent) {
        this.ownerPhysicsComponent = ownerPhysicsComponent    
    }

    applyForces = (): void => {
        if (this.ownerPhysicsComponent.positionState == PositionState.Landed) {
            //Check if what it is resting on is still there
            //apply friction
            this.applyFriction()
            this.applyWindResistance()   
        }

        if (this.ownerPhysicsComponent.positionState == PositionState.Flying) {
            this.applyWindResistance()
        }

        this.applyGravity()
    }

    applyGravity = (): void => {
        this.ownerPhysicsComponent.velocityY += 0.2
    }

    applyFriction = (): void => {
        this.ownerPhysicsComponent.velocityX = this.ownerPhysicsComponent.velocityX * 0.9
    }

    applyWindResistance = (): void => {
        this.ownerPhysicsComponent.velocityX = this.ownerPhysicsComponent.velocityX * 0.99
    }


}

export default Forces