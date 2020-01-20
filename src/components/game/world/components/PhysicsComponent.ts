import Character from '../Character'

/**
 * Physics component
 */

class PhysicsComponent {
    //worldManager: WorldManager
    componentOwner: Character

    constructor(componentOwner: Character) {
        this.componentOwner = componentOwner
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
    
    update = (): void => {
        if (Math.abs(this.componentOwner.velocityX) > 0) {
            this.incrementXPos(this.componentOwner.velocityX)
        }
        if (Math.abs(this.componentOwner.velocityY) > 0) {
            this.incrementYPos(this.componentOwner.velocityY)
        }
        this.applyFriction()
        this.applyGravity()
        // CALL WORLD'S COLLISION CHECK HERE.
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