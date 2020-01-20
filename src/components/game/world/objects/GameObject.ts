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

    update = () => {
        
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
    
}

export default GameObject