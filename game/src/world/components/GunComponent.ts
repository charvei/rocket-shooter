import Character from '../objects/character/Character'
import WorldManager from '../WorldManager'
import Platform from '../objects/Platform'

import {
    Position
} from "../../Types"
import Reticule from '../objects/character/Reticule'

/**
 * Gun component
 */
class GunComponent {
    willFireOnUpdate: boolean = false
    rateOfFire: number = 10
    ticker: number = 0
    componentOwner: Character

    constructor(componentOwner: Character) {
        this.componentOwner = componentOwner
    }
    
    /**
     * Runs once per tick
     */
    update = (worldManager: WorldManager): void => {
        this.tickGun()
        if (this.willFireOnUpdate && (this.ticker > this.rateOfFire)) {
            //worldManager.getProjectileManager().addProjectile()
            worldManager.getProjectileManager().addProjectile(this.componentOwner.reticule.getPosition(), this.componentOwner.focusAngle, this.componentOwner.colour, 15)

            // Reset checks
            this.ticker = 0 
            this.willFireOnUpdate = false
        } else {
            this.willFireOnUpdate = false   // so... willFireOnUpdate is set by fireProjectile when player presses the fire key. But for some reason one press will register as two, so willFireOnUpdate will go true, fire, then false, then true again as the fire key still thinks its pressed and wait for next fire
        }
    }

    /** if projectiles are to be larger or smaller than the reticule then this code will need to be modified to center projectile at center of reticule */
    // getEndOfGunPosition = (): Position => {
    //     const gunPos: Position = this.componentOwner.reticule.getPosition()
    //     return {
    //         x: gunPos.x,
    //         y: gunPos.y
    //     }
    // }

    fireProjectile = (delta: number): void => {
        this.willFireOnUpdate = true   
    }

    tickGun = (): void => {
        this.ticker++
    }

}

export default GunComponent