import WorldManager from "../../WorldManager"
import { IsRenderable } from "../../../Interfaces"
import { 
    BoxCoords, 
    EntityParams,
    Renderable,
    Position,
    Corner,
    BoxCorners,
    BoxSides
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

    getBoxSides = (): BoxSides => {
        return {
            top: this.getPosition().y,
            bottom: this.getPosition().y + this.getHeight(), 
            left: this.getPosition().x,
            right: this.getPosition().x + this.getWidth()
        }
    }

    /** REFACTOR: SHOULD ENTITY HAVE A 'BOX' OR BODY COMPONENT WHICH HOLDS THESE? */
    // getCorners = (): BoxCorners => {
    //     let boxSides: BoxSides = this.getBoxSides()
    //     return {
    //         topLeft: {
    //             x: this.getPosition().x,
    //             y: this.getPosition().y
    //         },
    //         topRight: {
    //             x: this.getPosition().x + this.getWidth(),
    //             y: this.getPosition().y
    //         },
    //         bottomLeft: {
    //             x: this.getPosition().x,
    //             y: this.getPosition().y + this.getHeight()
    //         },
    //         bottomRight: {
    //             x: this.getPosition().x + this.getWidth(),
    //             y: this.getPosition().y + this.getHeight()
    //         }
    //     }
    // }

    getCorners = (sides?: BoxSides): BoxCorners => {
        if (sides == null) {
            sides = this.getBoxSides()
        }
        return {
            topLeft: {
                x: sides.left,
                y: sides.top
            },
            topRight: {
                x: sides.right,
                y: sides.top
            },
            bottomLeft: {
                x: sides.left,
                y: sides.bottom
            },
            bottomRight: {
                x: sides.right,
                y: sides.bottom
            }
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