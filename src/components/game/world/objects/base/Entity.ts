import WorldManager from "../../WorldManager"
import IsRenderable from "../../IsRenderable"
import { 
    BoxCoords, 
    EntityParams,
    Renderable
} from "../../../Types"


/**
 * Entity in the game. Base class that more specific entitys will inherit from.
 */
abstract class Entity implements IsRenderable {
    name: string
    code: string

    //pixel dimensions
    height: number
    width: number
    colour: string

    velocityX: number = 0
    velocityY: number = 0
    
    //position in world
    position: {
        x: number,
        y: number
    }
    
    constructor(params: EntityParams) {
        this.name = params.name
        this.code = params.code
        this.height = params.height
        this.width = params.width
        this.position = params.position
        this.colour = params.colour
    }

    update = (worldManager: WorldManager) => {
        
    }

    getBoxCoords = (topAdjustment: number = 0, bottomAdjustment: number = 0, leftAdjustment: number = 0, rightAdjustment: number = 0): BoxCoords => {
        return {
            top: this.getPosition().y + topAdjustment,
            bottom: this.getPosition().y + this.getHeight() + bottomAdjustment, 
            left: this.getPosition().x + leftAdjustment,
            right: this.getPosition().x + this.getWidth() + rightAdjustment
        }
    }

    getRenderable = (): Renderable => {
        return {
            xPos: this.position.x,
            yPos: this.position.y,
            width: this.width,
            height: this.height,
            colour: this.colour
        }
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

export default Entity