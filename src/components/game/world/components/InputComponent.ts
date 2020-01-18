import Character from '../character'

/**
 * Input component
 * 
 * Affects character's x & y velocity and probably more things later on.
 * 
 */
class InputComponent {
    // private WALK_ACCELERATION = 1
    // private RUN_ACCELERATION = 2
    private MOVE_ACCELERATION: number = 1
    private componentOwner: Character

    constructor(componentOwner: Character) {
        this.componentOwner = componentOwner
    }

    moveLeft = () => {
        this.componentOwner.velocityX -= this.MOVE_ACCELERATION
    }

    moveRight = () => {
        this.componentOwner.velocityX += this.MOVE_ACCELERATION
    }

}

export default InputComponent