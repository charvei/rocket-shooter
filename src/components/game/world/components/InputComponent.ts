import Character from '../Character'

/**
 * Input component. Stuff that inputs (player / AI) can change.
 * 
 * Affects character's x & y velocity and probably more things later on.
 * 
 */
class InputComponent {
    // private WALK_ACCELERATION = 1
    // private RUN_ACCELERATION = 2
    private MOVE_ACCELERATION: number = 1
    private MAX_VELOCITY_X: number = 50

    private componentOwner: Character

    constructor(componentOwner: Character) {
        this.componentOwner = componentOwner
    }

    moveLeft = (): void => {
        this.limitVelocity(this.componentOwner.velocityX -= this.MOVE_ACCELERATION)
    }

    moveRight = (): void => {
        this.limitVelocity(this.componentOwner.velocityX += this.MOVE_ACCELERATION)
    }

    limitVelocity = (calculatedVelocity: number): void => {
        if ((Math.abs(calculatedVelocity) > this.MAX_VELOCITY_X)) {
            this.componentOwner.velocityX = this.MAX_VELOCITY_X * Math.sign(calculatedVelocity)
        }
    }

    jump = (): void => {
        this.componentOwner.velocityY -= this.MOVE_ACCELERATION
    }

    clearVelocityX = (): void => {
        this.componentOwner.velocityX = 0
    }

    clearVelocityY = (): void => {
        this.componentOwner.velocityY = 0
    }

}

export default InputComponent