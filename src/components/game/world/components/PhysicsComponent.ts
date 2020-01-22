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
    axis: string,
    distance: number
}

/**
 * Physics component
 */
class PhysicsComponent {
    //worldManager: WorldManager
    componentOwner: Character
    xCollisionFlag: number
    yCollisionFlag: number
    previousXCollisionFlag: number
    previousYCollisionFlag: number

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

        let collision: CollisionResult = worldManager.detectCollision()

        /**
         * once final velocity is calculated (friction / gravity applies)
         * calculate the future amount of x/y movement from velocity and 
         * limit it according to how far away a colliding object is
         */
        
        // adjust velocity if we calculate that we're going to hit
        if (collision.axis == "x") {
            this.componentOwner.velocityX = collision.distance
        }
        if (collision.axis == "y") {
            //this.componentOwner.velocityY = collision.distance
            this.componentOwner.velocityY = 0
            this.componentOwner.incrementYPos(-collision.distance)  
            // TODO: implement this better (currently just a quick hack), don't forget to add x axis (figuring out how to do x which is missing the incrementypos function will give solution)
            // TODO: figure out why box is rendering inside box still, then getting kicked out
        }

        if (Math.abs(this.componentOwner.velocityX) > 0) {
            this.incrementXPos(this.componentOwner.velocityX)
        }
        if (Math.abs(this.componentOwner.velocityY) > 0) {
            console.log(this.componentOwner.velocityY)
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