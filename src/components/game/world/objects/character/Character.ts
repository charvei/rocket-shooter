import WorldManager from '../../WorldManager.js'
import GameObject from '../GameObject.js'
import Reticule from './Reticule.js'

import PhysicsComponent from '../../components/PhysicsComponent.js'
import InputComponent from '../../components/InputComponent.js'
import GunComponent from '../../components/GunComponent.js'

/**
 * Character or unit that exists in the game. This should probably go through some inheritance type things at some point
 */
class Character extends GameObject {
    // components
    physics: PhysicsComponent
    input: InputComponent
    gun: GunComponent

    reticule: Reticule
    
    velocityX: number
    velocityY: number

    focusAngle: number

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
    
    constructor(name: string, code: string, height: number, width: number, position: {x: number, y: number}, colour: string) {
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

        this.focusAngle = 1
        this.reticule = new Reticule(5, 5, {x: 5, y: 5}, "ffffff")

        this.input = new InputComponent(this)
        this.gun = new GunComponent(this)
    }

    update = (worldManager: WorldManager): void => {
        this.physics.update(worldManager)
        this.setReticule()
        this.gun.update(worldManager)
       
        //generate projectile
        //this.gun.update(worldManager)
    }

    setReticule = () => {
        console.log("x pos: " + this.reticule.position.x)
        console.log("focus angle: " + this.focusAngle)
        this.reticule.position.x = this.position.x + (this.width/2) - this.reticule.width/2 + 25 * Math.cos(this.focusAngle)
        this.reticule.position.y = this.position.y + (this.height/2) - this.reticule.height/2 + 25 * Math.sin(this.focusAngle) 
        
        //console.log("Drawing crosshair at: {x: " + (this.playerCharacter.position.x + 10 * Math.cos(res)) + ", y: " + (this.playerCharacter.position.y + 10 * Math.sin(res)))
        //x1 + r * Math.cos(theta), y1 + r * Math.sin(theta)
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