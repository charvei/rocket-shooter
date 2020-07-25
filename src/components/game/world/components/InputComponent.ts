import Character from '../objects/character/Character'

import {
    PositionState
} from "../../Types"

/**
 * Input component. Stuff that inputs (player / AI) can use.
 * 
 * This is _hard coupled_ with an entity having a PHYSICS component
 * 
 * Affects character's x & y velocity and probably more things later on.
 * 
 */
class InputComponent {
    private MOVE_ACCELERATION: number = 0.035
    private MAX_VELOCITY_X: number = 5

    private componentOwner: Character

    constructor(componentOwner: Character) {
        this.componentOwner = componentOwner
    }

    moveLeft = (delta: number): void => {
        this.limitVelocity(this.componentOwner.physics.velocityX -= this.MOVE_ACCELERATION * delta)
    }

    moveRight = (delta: number): void => {
        this.limitVelocity(this.componentOwner.physics.velocityX += this.MOVE_ACCELERATION * delta)
    }

    limitVelocity = (calculatedVelocity: number): void => {
        if ((Math.abs(calculatedVelocity) > this.MAX_VELOCITY_X)) {
            this.componentOwner.physics.velocityX = this.MAX_VELOCITY_X * Math.sign(calculatedVelocity)
        }
    }

    jump = (delta: number): void => {
        if (this.componentOwner.physics.positionState == PositionState.Landed) {
            this.componentOwner.physics.velocityY -= 0.12 * delta
        }
    }

    jetPack = (delta: number): void => {
        this.componentOwner.physics.velocityY -= 0.018 * delta
    }

    down = (delta: number): void => {
        this.componentOwner.physics.velocityY += this.MOVE_ACCELERATION * delta
    }

    clearVelocityX = (): void => {
        this.componentOwner.physics.velocityX = 0
    }

    clearVelocityY = (): void => {
        this.componentOwner.physics.velocityY = 0
    }

    setFocusAngle = (focusAngle: number): void => {
        this.componentOwner.focusAngle = focusAngle
    }

    makeProjectile = (delta: number): void => {
        this.componentOwner.gun.fireProjectile(delta)
    }

}

export default InputComponent