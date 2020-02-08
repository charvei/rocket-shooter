import Character from '../Character'
import WorldManager from '../WorldManager'
import GameObject from '../objects/GameObject'

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

type TouchingState = {
    top: boolean,
    bottom: boolean,
    left: boolean,
    right: boolean
}

/**
 * Physics component
 */
class PhysicsComponent {
    componentOwner: Character
    xCollisionDistance: number
    yCollisionDistance: number
    previousXCollisionDistance: number
    previousYCollisionDistance: number
    touchingState: TouchingState = {
        top: false,
        bottom: false,
        left: false,
        right: false
    }
    previousCollisions: CollisionResult[] = []

    touchingObjects: GameObject[] = []

    constructor(componentOwner: Character) {
        this.componentOwner = componentOwner
    }
    
    /**
     * Runs once per tick
     */
    update = (worldManager: WorldManager): void => {
        this.applyFriction()
        this.applyGravity()

        this.updateTouches(worldManager)
        this.resolveTouches()

        let collisions: CollisionResult[] = worldManager.getCollisions(this.componentOwner)

        collisions.forEach((collision, index) => {
            this.resolveCollisions(collision, this.previousCollisions[index])   // may create issues if these indices get out of sync
        })

        this.updateTouches(worldManager)
        this.resolveTouches()
        
        this.updateMovement()

        this.previousCollisions = collisions

    }

    private getFreshTouchingState = (): TouchingState => {
        return {
            top: false,
            bottom: false,
            left: false,
            right: false
        }
    }

    private updateMovement = () => {
        if (Math.abs(this.componentOwner.velocityX) > 0) {
            this.incrementXPos(this.componentOwner.velocityX)
        }
        if (Math.abs(this.componentOwner.velocityY) > 0) {
            this.incrementYPos(this.componentOwner.velocityY)
        }
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

    addTouchingObject = (object: GameObject) => {
        if (!this.touchingObjects.includes(object)) {
            this.touchingObjects.push(object)
        }
    }
    
    //TODO: think about what will happen with multiple touching relationships (i.e. address what to return and how to deal with it appropriately)
    private updateTouches = (worldManager: WorldManager): void => {
        this.touchingState = this.getFreshTouchingState()
        let touchingIndexRemovalQueue: number[] = []

        this.touchingObjects.forEach((object: GameObject, index: number) => {
            let collision: CollisionVectors = worldManager.getCollisionVectors(this.componentOwner.getBoxCoords(), object.getBoxCoords())
            let touch: CollisionResult = worldManager.getTouchRelationship(this.componentOwner, object)

            if (!touch.didCollide) { //rename didCollide to something more general
                touchingIndexRemovalQueue.push(index)
                return
            }

            this.setTouchingState(collision, touch.vectors)
        })

        touchingIndexRemovalQueue.forEach((objectToRemoveIndex: number) => {
            this.touchingObjects.splice(objectToRemoveIndex, 1)
            //probably should remove it in reverse order to account for changing index?
        })
    }

    private setTouchingState = (collision: CollisionVectors, touch: CollisionVectors): void => {
        if (collision.bottom == 0 && touch.bottom != 0) {
            this.touchingState.bottom = true
        }
        if (collision.top == 0 && touch.top != 0) {
            this.touchingState.top = true
        }
        if (collision.left == 0 && touch.left != 0) {
            this.touchingState.left = true
        }
        if (collision.right == 0 && touch.right != 0) {
            this.touchingState.right = true
        }
    }

    /**
     * Prevent velocity change if grinding against another object
     */
    private resolveTouches = (): void => {
        if (this.touchingState.bottom == true && this.componentOwner.velocityY > 0) {
            this.componentOwner.velocityY = 0
        }
        if (this.touchingState.top == true && this.componentOwner.velocityY < 0) {
            this.componentOwner.velocityY = 0
        }
        if (this.touchingState.right == true && this.componentOwner.velocityX > 0) {
            this.componentOwner.velocityX = 0
        }
        if (this.touchingState.left == true && this.componentOwner.velocityX < 0) {
            this.componentOwner.velocityX = 0
        }
    }

    private resolveCollisions = (collisions: CollisionResult, prevCollisions: CollisionResult): void => {
        if (!collisions.didCollide) {
            return
        }

        if (collisions.vectors.bottom != 0 && prevCollisions.vectors.bottom == 0) {
            this.incrementYPos(this.componentOwner.velocityY - collisions.vectors.bottom)
            this.componentOwner.velocityY = 0
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

    private applyFriction = (): void => {
        this.componentOwner.velocityX = this.componentOwner.velocityX * 0.9
    }

    private applyGravity = (): void => {
        this.componentOwner.velocityY += 0.2
        //this.componentOwner.velocityY = this.componentOwner.velocityY * 0.9 // Use friction instead of gravity to test collision
    }

    public isTouching = (direction: string): boolean => {
        return this.touchingState[direction]
    }

}

export default PhysicsComponent