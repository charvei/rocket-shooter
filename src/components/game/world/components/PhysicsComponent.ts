import Character from '../Character'
import WorldManager from '../WorldManager'

type XCollisionLocation = {
    didCollide: boolean,
    leftCollision: boolean,
    rightCollision: boolean
}

type YCollisionLocation = {
    didCollide: boolean,
    topCollision: boolean,
    bottomCollision: boolean,
}

type CollisionLocation = {
    xCollision: XCollisionLocation,
    yCollision: YCollisionLocation
}

type CollisionResult = {
    didCollide: boolean,
    collisionLocation: CollisionLocation
}

/**
 * Physics component
 */
class PhysicsComponent {
    //worldManager: WorldManager
    componentOwner: Character
    xCollisionFlag: XCollisionLocation
    yCollisionFlag: YCollisionLocation
    previousXCollisionFlag: XCollisionLocation
    previousYCollisionFlag: YCollisionLocation

    constructor(componentOwner: Character) {
        this.componentOwner = componentOwner
        // this.xCollisionFlag = false
        // this.yCollisionFlag = false
        // this.previousXCollisionFlag = false
        // this.previousYCollisionFlag = false
        
    }

    // setPosition = ({position}: {position: { x: number, y: number }}): void => {
    //     this.componentOwner.position = position
    // }

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
        this.applyGravity()

        worldManager.detectCollision()

        /**
         * once final velocity is calculated (friction / gravity applies)
         * calculate the future amount of x/y movement from velocity and 
         * limit it according to how far away a colliding object is
         */


        if (Math.abs(this.componentOwner.velocityX) > 0) {
            this.incrementXPos(this.componentOwner.velocityX)
        }
        if (Math.abs(this.componentOwner.velocityY) > 0) {
            this.incrementYPos(this.componentOwner.velocityY)
        }

        this.setPrevPosition()
    }

    private setPrevPosition = (): void => {
        this.componentOwner.prevPosition = this.componentOwner.position
    }

    private applyFriction = (): void => {
        this.componentOwner.velocityX = this.componentOwner.velocityX * 0.9
    }

    private applyGravity = (): void => {
        //this.componentOwner.velocityY += 0.1
        this.componentOwner.velocityY = this.componentOwner.velocityY * 0.9 // Using friction instead of gravity to test collision
    }

}

export default PhysicsComponent