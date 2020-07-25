import PhysicsComponent from './NewPhysicsComponent'

import {
    PhysicsEntity,
    BoxCorners,
    BoxCoords,
    CollisionResult,
    PositionState,
    CollisionVectors
} from "../../../Types"
import WorldManager from '../../WorldManager'

/**
 * Contains logic relating to detected collisions for PhysicsComponent
 */
class Collisions {
    ownerPhysicsComponent: PhysicsComponent

    constructor(ownerPhysicsComponent: PhysicsComponent) {
        this.ownerPhysicsComponent = ownerPhysicsComponent
    }

    update = (worldManager: WorldManager): void => {
        // for this entity loop through all entities that can be collided with
        let trajectoryBox: BoxCoords = this.calculateTrajectoryBox()

        let collisions: CollisionVectors[] = worldManager.worldPhysics.getCollisions(trajectoryBox)
        
        if (collisions.length == 0) {
            this.ownerPhysicsComponent.positionState = PositionState.Flying
        }

        collisions.forEach((collision) => {
            this.resolveCollisions(collision)   // may create issues if these indices get out of sync
        })       

    }

    /**  Better strategy to handle different polygons:
     * 
     * - use velocity to calculate the actual angle in which entity is moving
     * - get the perpendicular bisector, use that as an axis
     * - for this axis, get the points representing the:
     *      - lowest / most negative number
     *      - highest / most positive number
     * 
     * 
     * ... but i think i'll have bigger problems when converting away from boxes; might want to 'connect the sides in the case of polygons'
    */
    calculateTrajectoryBox = (): BoxCoords => {      
        let trajectoryBox: BoxCoords = this.ownerPhysicsComponent.componentOwner.getBoxCoords()
        
        if (this.ownerPhysicsComponent.velocityX > 0) {
            trajectoryBox.right += this.ownerPhysicsComponent.velocityX
        } else {
            trajectoryBox.left += this.ownerPhysicsComponent.velocityX
        }

        if (this.ownerPhysicsComponent.velocityY > 0) {
            trajectoryBox.bottom += this.ownerPhysicsComponent.velocityY
        } else {
            trajectoryBox.top += this.ownerPhysicsComponent.velocityY
        }

        return trajectoryBox
    }

    detectCollisions = (): void => {

    }

    private resolveCollisions = (collisions: CollisionVectors): void => {

        // Landed on the top of something
        if ((collisions.bottom != 0 && collisions.top == 0) && (collisions.left != 0 || collisions.right != 0)) { //or means that if it lands on the corner it behaves this way as well!!! we're expecting this to look janky for now
            
            if (Math.abs(collisions.bottom) >= Math.abs(collisions.left)) {
                this.ownerPhysicsComponent.movement.moveX(this.ownerPhysicsComponent.velocityX - collisions.left)
                this.ownerPhysicsComponent.velocityX = 0
            } else {
                this.ownerPhysicsComponent.movement.moveY(this.ownerPhysicsComponent.velocityY - collisions.bottom)
                this.ownerPhysicsComponent.velocityY = 0
                this.ownerPhysicsComponent.positionState = PositionState.Landed
            }
            // this.ownerPhysicsComponent.movement.moveY(this.ownerPhysicsComponent.velocityY - collisions.bottom)
            // this.ownerPhysicsComponent.velocityY = 0
            // this.ownerPhysicsComponent.positionState = PositionState.Landed
        } else {
            this.ownerPhysicsComponent.positionState = PositionState.Flying
        }

        // Hit head on bottom of something
        if ((collisions.top != 0 && collisions.bottom == 0) && (collisions.left != 0 || collisions.right != 0)) {
            this.ownerPhysicsComponent.movement.moveY(this.ownerPhysicsComponent.velocityY - collisions.top)
            this.ownerPhysicsComponent.velocityY = 0
        }

        // Ran into right side of something
        if (collisions.left != 0 && (collisions.top != 0 && collisions.bottom != 0)) {
            this.ownerPhysicsComponent.movement.moveX(this.ownerPhysicsComponent.velocityX - collisions.left)
            this.ownerPhysicsComponent.velocityX = 0
        }

        // Ran into the left side of something
        if (collisions.right != 0 && (collisions.top != 0 && collisions.bottom != 0)) {
            this.ownerPhysicsComponent.movement.moveX(this.ownerPhysicsComponent.velocityX - collisions.right)
            this.ownerPhysicsComponent.velocityX = 0
        }



    }

}

export default Collisions