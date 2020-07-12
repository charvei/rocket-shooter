import WorldManager from "../../WorldManager"
import { IsRenderable } from "../../../Interfaces"
import { 
    BoxCoords, 
    EntityParams,
    Renderable,
    Position
} from "../../../Types"

import {
    HasPhysics
} from "../../../Interfaces"


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
    
    //position in world
    position: Position
    
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

    getName = (): string => {
        return this.name
    }
    
    getCode = (): string => {
        return this.code
    }

    getHeight = (): number => {
        return this.height
    }

    getWidth = (): number => {
        return this.width
    }

    getPosition = (): Position => {
        return this.position
    }

    setPosition = ({position}: {position: { x: number, y: number }}) => {
        this.position = position
    }
}

export default Entity