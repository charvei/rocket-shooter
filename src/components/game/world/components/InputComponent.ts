import Character from '../objects/character/Character'

/**
 * Input component. Stuff that inputs (player / AI) can use.
 * 
 * Affects character's x & y velocity and probably more things later on.
 * 
 */
class InputComponent {
    // private WALK_ACCELERATION = 1
    // private RUN_ACCELERATION = 2
    private MOVE_ACCELERATION: number = 0.035
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
        if (this.componentOwner.physics.isTouching("bottom")) {
            this.componentOwner.velocityY -= 0.12 * delta
        }
        console.log("my isTouching(bot) result:" + this.componentOwner.physics.isTouching("bottom"))

        //this.componentOwner.velocityY -= this.MOVE_ACCELERATION * delta
    }

    jetPack = (delta: number): void => {
        if (!this.componentOwner.physics.isTouching("bottom")) {
            console.log(delta)
            this.componentOwner.velocityY -= 0.018 * delta
        }
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

    setFocusAngle = (focusAngle: number): void => {
        this.componentOwner.focusAngle = focusAngle
    }

    makeProjectile = (delta: number): void => {
        
    }

}

export default InputComponent