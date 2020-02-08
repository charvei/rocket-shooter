import WorldManager from "../WorldManager"

type BoxCoords = {
    top: number,
    bottom: number,
    left: number,
    right: number
}

/**
 * Object in the game. Base class that more specific objects will inherit from.
 */
class GameObject {
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
    }

    update = (worldManager: WorldManager) => {
        
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

    getBoxCoords = (topAdjustment: number = 0, bottomAdjustment: number = 0, leftAdjustment: number = 0, rightAdjustment: number = 0): BoxCoords => {
        return {
            top: this.getPosition().y + topAdjustment,
            bottom: this.getPosition().y + this.getHeight() + bottomAdjustment, 
            left: this.getPosition().x + leftAdjustment,
            right: this.getPosition().x + this.getWidth() + rightAdjustment
        }
    }  
    
}

export default GameObject