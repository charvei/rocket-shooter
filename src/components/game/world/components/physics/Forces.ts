import PhysicsComponent from './NewPhysicsComponent'

/**
 * Contains logic for enacting forces for PhysicsComponent
 */
class Forces {
    ownerPhysicsComponent: PhysicsComponent

    constructor(ownerPhysicsComponent: PhysicsComponent) {
        this.ownerPhysicsComponent = ownerPhysicsComponent    
    }

    applyForces = (): void => {
        this.applyGravity()
        this.applyWindResistance()
        //if (true) {    // if owner.state == touching bottom
            this.applyFriction()
       // }
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