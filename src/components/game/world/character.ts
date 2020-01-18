import PhysicsComponent from './components/PhysicsComponent.js'
import InputComponent from './components/InputComponent.js'

/**
 * Character or unit that exists in the game. This should probably go through some inheritance type things at some point
 */
class Character {
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
    
    //position in world
    position: {
        x: number,
        y: number
    }
    
    constructor(name: string, code: string, height: number, width: number, position: {x: number, y: number}) {
        this.name = name
        this.code = code
        this.height = height
        this.width = width
        this.position = position

        this.physics = new PhysicsComponent()
        this.velocityX = 0
        this.velocityY = 0

        this.input = new InputComponent(this)
    }

    getColor = () => {
        return this
    }

    getName = () => {
        return this.name
    }
    
    getCode = () => {
        return this.code
    }

    getHeight = () => {
        return this.height
    }

    getWidth = () => {
        return this.width
    }

    getPosition = () => {
        return this.position
    }

    setPosition = ({position}: {position: { x: number, y: number }}) => {
        this.position = position
    }

    incrementXPos = (increment: number) => {
        let newPosition = {
            position: {
                x: this.getPosition().x + increment,
                y: this.getPosition().y
            }
        }
        this.setPosition(newPosition)
    }

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