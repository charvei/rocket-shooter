import PhysicsComponent from '../../components/PhysicsComponent.js'
import InputComponent from '../../components/InputComponent.js'
import WorldManager from '../../WorldManager.js'
import GameObject from '../GameObject.js'

/**
 * Character or unit that exists in the game. This should probably go through some inheritance type things at some point
 */
class Character extends GameObject {
    // components
    physics: PhysicsComponent
    input: InputComponent    
    
    velocityX: number
    velocityY: number

    name: string
    code: string

    //pixel dimensions
    height: number
    width: number
    colour: string
    
    //position in world
    position: {
        x: number,
        y: number
    }

    // position of sides of box
    prevPosition: {
        x: number,
        y: number
    }
    
    constructor(name: string, code: string, height: number, width: number, position: {x: number, y: number}, colour) {
        super({
            name: name,
            code: code,
            height: height,
            width: width,
            position: position,
            colour: colour
        })
        // this.name = name
        // this.code = code
        // this.height = height
        // this.width = width
        // this.position = position

        this.physics = new PhysicsComponent(this)
        this.velocityX = 0
        this.velocityY = 0

        this.input = new InputComponent(this)
    }

    update = (worldManager: WorldManager): void => {
        this.physics.update(worldManager)
    }


    /*REMOVE THIS WHEN GRAVITY / JUMPING IS FULLY IMPLEMENTED*/
    incrementYPos = (increment: number) => {
        let newPosition = {
            position: {
                x: this.getPosition().x,
                y: this.getPosition().y + increment
            }
        }
        this.setPosition(newPosition)
    }
    
}

export default Character