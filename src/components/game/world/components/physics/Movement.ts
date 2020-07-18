import NewPhysicsComponent from './NewPhysicsComponent'


/**
 * Performs physics actions relating to moving character in space,
 */
class Movement {
    ownerPhysicsComponent: NewPhysicsComponent

    constructor(ownerPhysicsComponent: NewPhysicsComponent) {
        this.ownerPhysicsComponent = ownerPhysicsComponent    
    }

    update = (velocityX: number, velocityY: number): void => {
        if (Math.abs(velocityX) > 0) {
            this.moveX(velocityX)
        }
        if (Math.abs(velocityY) > 0) {
            this.moveY(velocityY)
        }
    }

    moveX = (increment: number): void => {
        this.move(increment, 0)
    }

    moveY = (increment: number): void => {
        this.move(0, increment)
    }

    move = (incrementX: number, incrementY: number): void => {
        let newPosition = {
            position: {
                x: this.ownerPhysicsComponent.componentOwner.getPosition().x + incrementX,
                y: this.ownerPhysicsComponent.componentOwner.getPosition().y + incrementY
            }
        }
        this.ownerPhysicsComponent.componentOwner.setPosition(newPosition)
    }

}

export default Movement