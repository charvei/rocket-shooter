import Character from '../objects/character/Character'
import WorldManager from '../WorldManager'
import Entity from '../objects/base/Entity'
import Projectile from '../objects/projectiles/Projectile'

import {
    CollisionVectors,
    CollisionResult,
    TouchingState,
    PhysicsEntity
} from "../../Types"

/**
 * Physics component
 */
class PhysicsComponent {
    // //componentOwner: Character | Projectile  // Basically any component that implements HasPhysics. The issue using this is as I add more entities with HasPhysics, this would grow to include more |'s of the different types. Ideally I could somehow have the type be 'Entity that implements HasPhysics' but I'm not sure if that is possible yet. Alternatively I can just have a Type that keeps track of all these classes but feels annoying to have to manage all that manually.
    // componentOwner: PhysicsEntity
    // touchingState: TouchingState = {
    //     top: false,
    //     bottom: false,
    //     left: false,
    //     right: false
    // }

    // firstUpdate: boolean = true

    // previousCollisions: CollisionResult[] = []

    // touchingObjects: Entity[] = []

    // constructor(componentOwner: PhysicsEntity) {
    //     this.componentOwner = componentOwner
    // }
    
    // /**
    //  * Runs once per tick
    //  */
    // update = (worldManager: WorldManager): void => {
    //     if (this.firstUpdate) {
    //         this.previousCollisions = this.previousCollisions = worldManager.worldPhysics.getCollisions(this.componentOwner)
    //         this.firstUpdate = false
    //     }
        
    //     if (this.touchingObjects.length < 1) {
    //         this.applyWindResistance()
    //     } else {
    //         this.applyFriction()
    //     }
        
    //     //this.applyFriction() // TODO: add a wind resistance and use that when the entity is in the air
        
    //     this.applyGravity()

    //     this.updateTouches(worldManager)
    //     this.resolveTouches()

    //     let collisions: CollisionResult[] = worldManager.worldPhysics.getCollisions(this.componentOwner)

    //     collisions.forEach((collision, index) => {
    //         this.resolveCollisions(collision, this.previousCollisions[index])   // may create issues if these indices get out of sync
    //     })

    //     // this.updateTouches(worldManager)
    //     // this.resolveTouches()
        
    //     this.updateMovement()

    //     this.previousCollisions = collisions

    // }

    // private getFreshTouchingState = (): TouchingState => {
    //     return {
    //         top: false,
    //         bottom: false,
    //         left: false,
    //         right: false
    //     }
    // }

    // private updateMovement = () => {
    //     if (Math.abs(this.componentOwner.physics.velocityX) > 0) {
    //         this.incrementXPos(this.componentOwner.physics.velocityX)
    //     }
    //     if (Math.abs(this.componentOwner.physics.velocityY) > 0) {
    //         this.incrementYPos(this.componentOwner.physics.velocityY)
    //     }
    // }

    // incrementXPos = (increment: number): void => {
    //     let newPosition = {
    //         position: {
    //             x: this.componentOwner.getPosition().x + increment,
    //             y: this.componentOwner.getPosition().y
    //         }
    //     }
    //     this.componentOwner.setPosition(newPosition)
    // }

    // incrementYPos = (increment: number): void => {
    //     let newPosition = {
    //         position: {
    //             x: this.componentOwner.getPosition().x,
    //             y: this.componentOwner.getPosition().y + increment
    //         }
    //     }
    //     this.componentOwner.setPosition(newPosition)
    // }

    // addTouchingEntity = (entity: Entity) => {
    //     if (!this.touchingObjects.includes(entity)) {
    //         this.touchingObjects.push(entity)
    //     }
    // }
    
    // //TODO: think about what will happen with multiple touching relationships (i.e. address what to return and how to deal with it appropriately)
    // private updateTouches = (worldManager: WorldManager): void => {
    //     this.touchingState = this.getFreshTouchingState()
    //     let touchingIndexRemovalQueue: number[] = []

    //     this.touchingObjects.forEach((entity: Entity, index: number) => {
    //         let collision: CollisionVectors = worldManager.worldPhysics.getCollisionVectors(this.componentOwner.getBoxCoords(), entity.getBoxCoords())
    //         let touch: CollisionResult = worldManager.worldPhysics.getTouchRelationship(this.componentOwner, entity)

    //         if (!touch.didCollide) { //rename didCollide to something more general
    //             touchingIndexRemovalQueue.push(index)
    //             return
    //         }

    //         this.setTouchingState(collision, touch.vectors)
    //     })

    //     touchingIndexRemovalQueue.forEach((objectToRemoveIndex: number) => {
    //         this.touchingObjects.splice(objectToRemoveIndex, 1)
    //         //probably should remove it in reverse order to account for changing index?
    //     })
    // }

    // private setTouchingState = (collision: CollisionVectors, touch: CollisionVectors): void => {
    //     if (collision.bottom == 0 && touch.bottom != 0) {
    //         this.touchingState.bottom = true
    //     }
    //     if (collision.top == 0 && touch.top != 0) {
    //         this.touchingState.top = true
    //     }
    //     if (collision.left == 0 && touch.left != 0) {
    //         this.touchingState.left = true
    //     }
    //     if (collision.right == 0 && touch.right != 0) {
    //         this.touchingState.right = true
    //     }
    // }

    // /**
    //  * Prevent velocity change if grinding against another object
    //  */
    // private resolveTouches = (): void => {
    //     if (this.touchingState.bottom == true && this.componentOwner.physics.velocityY > 0) {
    //         this.componentOwner.physics.velocityY = 0
    //     }
    //     if (this.touchingState.top == true && this.componentOwner.physics.velocityY < 0) {
    //         this.componentOwner.physics.velocityY = 0
    //     }
    //     if (this.touchingState.right == true && this.componentOwner.physics.velocityX > 0) {
    //         this.componentOwner.physics.velocityX = 0
    //     }
    //     if (this.touchingState.left == true && this.componentOwner.physics.velocityX < 0) {
    //         this.componentOwner.physics.velocityX = 0
    //     }
    // }

    // private resolveCollisions = (collisions: CollisionResult, prevCollisions: CollisionResult): void => {
    //     if (!collisions.didCollide) {
    //         return
    //     }

    //     if (collisions.vectors.bottom != 0 && prevCollisions.vectors.bottom == 0) {
    //         this.incrementYPos(this.componentOwner.physics.velocityY - collisions.vectors.bottom)
    //         this.componentOwner.physics.velocityY = 0
    //     }
    //     if (collisions.vectors.top != 0 && prevCollisions.vectors.top == 0) {
    //         this.incrementYPos(this.componentOwner.physics.velocityY - collisions.vectors.top)
    //         this.componentOwner.physics.velocityY = 0
    //     }
    //     if (collisions.vectors.left != 0 && prevCollisions.vectors.left == 0) {
    //         this.incrementXPos(this.componentOwner.physics.velocityX - collisions.vectors.left)
    //         this.componentOwner.physics.velocityX = 0
    //     }
    //     if (collisions.vectors.right != 0 && prevCollisions.vectors.right == 0) {
    //         this.incrementXPos(this.componentOwner.physics.velocityX - collisions.vectors.right)
    //         this.componentOwner.physics.velocityX = 0
    //     }

    // }

    // private applyFriction = (): void => {
    //     this.componentOwner.physics.velocityX = this.componentOwner.physics.velocityX * 0.9
    // }

    // private applyWindResistance = (): void => {
    //     this.componentOwner.physics.velocityX = this.componentOwner.physics.velocityX * 1
    // }

    // private applyGravity = (): void => {
    //     this.componentOwner.physics.velocityY += 0.2
    //     //this.componentOwner.physics.velocityY = this.componentOwner.physics.velocityY * 0.9 // Use friction instead of gravity to test collision
    // }

    // public isTouching = (direction: string): boolean => {
    //     return this.touchingState[direction]
    // }

}

export default PhysicsComponent