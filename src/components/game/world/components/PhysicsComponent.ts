import Character from '../Character'
import WorldManager from '../WorldManager'
import GameObject from '../objects/GameObject'

// type CollisionResult = {
//     x: {
//         didCollide: boolean,
//         distance: number
//     },
//     y: {
//         didCollide: boolean,
//         distance: number
//     } 
// }

type CollisionVectors = {
    top: number,
    bottom: number,
    left: number,
    right: number
}

type CollisionResult = {
    didCollide: boolean,
    vectors: CollisionVectors
}

/**
 * Physics component
 */
class PhysicsComponent {
    //worldManager: WorldManager
    componentOwner: Character
    xCollisionDistance: number
    yCollisionDistance: number
    previousXCollisionDistance: number
    previousYCollisionDistance: number
    landed: boolean
    previousCollisions: CollisionResult

    touchingObjects: GameObject[] = []

    constructor(componentOwner: Character) {
        this.componentOwner = componentOwner
    }

    incrementXPos = (increment: number): void => {
        let newPosition = {
            position: {
                x: this.componentOwner.getPosition().x + increment,
                y: this.componentOwner.getPosition().y
            }
        }
        this.componentOwner.setPosition(newPosition)
    }

    incrementYPos = (increment: number): void => {
        let newPosition = {
            position: {
                x: this.componentOwner.getPosition().x,
                y: this.componentOwner.getPosition().y + increment
            }
        }
        this.componentOwner.setPosition(newPosition)
    }
    
    update = (worldManager: WorldManager): void => {
        this.applyFriction()
        
        if (!this.landed) {
            this.applyGravity()
        }

        let collisions: CollisionResult = worldManager.getCollisions(this.componentOwner)

        this.resolveCollisions(collisions, this.previousCollisions)

        this.resolveTouchingRelationships(worldManager)
        
        this.updateMovement()

        this.previousCollisions = collisions

    }

    addTouchingObject = (object: GameObject) => {
        if (!this.touchingObjects.includes(object)) {
            this.touchingObjects.push(object)
        }
    }
    
    //TODO: clean up this, think about what will happen with multiple touching relationships (i.e. address what to return and how to deal with it appropriately)
    private resolveTouchingRelationships = (worldManager: WorldManager): void => {
        this.touchingObjects.forEach((object) => {
            let objectIndex: number = this.touchingObjects.indexOf(object)
            let collisioning: CollisionVectors = worldManager.getCollisionVectors(this.componentOwner.getBoxCoords(), object.getBoxCoords())
            let touchRelationship: CollisionResult = worldManager.getTouchRelationship(this.componentOwner, object)

            if (!touchRelationship.didCollide) {
                this.landed = false
                console.log("in air")
                if (objectIndex >= 0) {
                    this.touchingObjects.splice(objectIndex, 1)
                }
                return
            }

            if (collisioning.bottom == 0 && touchRelationship.vectors.bottom != 0) {
                this.landed = true
                console.log("landed")
                return
            }

        })

        return
    }

    private updateMovement = () => {
        if (Math.abs(this.componentOwner.velocityX) > 0) {
            this.incrementXPos(this.componentOwner.velocityX)
        }
        if (Math.abs(this.componentOwner.velocityY) > 0) {
            this.incrementYPos(this.componentOwner.velocityY)
        }
    }

    private resolveCollisions = (collisions: CollisionResult, prevCollisions: CollisionResult): void => {
        console.log(collisions.didCollide)
        if (!collisions.didCollide) {
            return
        }

        if (collisions.vectors.bottom != 0 && prevCollisions.vectors.bottom == 0) {
            this.incrementYPos(this.componentOwner.velocityY - collisions.vectors.bottom)
            this.componentOwner.velocityY = 0
            this.landed = true
        }
        if (collisions.vectors.top != 0 && prevCollisions.vectors.top == 0) {
            this.incrementYPos(this.componentOwner.velocityY - collisions.vectors.top)
            this.componentOwner.velocityY = 0
        }
        if (collisions.vectors.left != 0 && prevCollisions.vectors.left == 0) {
            this.incrementXPos(this.componentOwner.velocityX - collisions.vectors.left)
            this.componentOwner.velocityX = 0
        }
        if (collisions.vectors.right != 0 && prevCollisions.vectors.right == 0) {
            this.incrementXPos(this.componentOwner.velocityX - collisions.vectors.right)
            this.componentOwner.velocityX = 0
        }

    }

    private hasLanded = (collisionVectors: CollisionResult): void => {
        //collisionVectors.
    }

    private setPrevPosition = (): void => {
        this.componentOwner.prevPosition = this.componentOwner.position
    }

    private applyFriction = (): void => {
        this.componentOwner.velocityX = this.componentOwner.velocityX * 0.9
    }

    private applyGravity = (): void => {
        this.componentOwner.velocityY += 0.1
        //this.componentOwner.velocityY = this.componentOwner.velocityY * 0.9 // Using friction instead of gravity to test collision
    }

    private stopGravity = (): void => {
        
    }

    private max = (first: number, second: number): number => {
        if (Math.abs(first) > Math.abs(second)) {
            return first
        } else {
            return second
        }
    }

}

export default PhysicsComponent