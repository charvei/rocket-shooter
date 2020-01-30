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
    private MOVE_ACCELERATION: number = 0.04
    private MAX_VELOCITY_X: number = 50

    private componentOwner: Character

    constructor(componentOwner: Character) {
        this.componentOwner = componentOwner
    }

    moveLeft = (delta: number): void => {
        this.limitVelocity(this.componentOwner.velocityX -= this.MOVE_ACCELERATION * delta)
    }

    moveRight = (delta: number): void => {
        this.limitVelocity(this.componentOwner.velocityX += this.MOVE_ACCELERATION * delta)
    }

    limitVelocity = (calculatedVelocity: number): void => {
        if ((Math.abs(calculatedVelocity) > this.MAX_VELOCITY_X)) {
            this.componentOwner.velocityX = this.MAX_VELOCITY_X * Math.sign(calculatedVelocity)
        }
    }

    jump = (delta: number): void => {
        this.componentOwner.velocityY -= this.MOVE_ACCELERATION * delta
    }

    down = (delta: number): void => {
        this.componentOwner.velocityY += this.MOVE_ACCELERATION * delta
    }

    clearVelocityX = (): void => {
        this.componentOwner.velocityX = 0
    }

    clearVelocityY = (): void => {
        this.componentOwner.velocityY = 0
    }

}

export default InputComponent