import Character from '../objects/character/Character'
import WorldManager from '../WorldManager'

/**
 * Gun component
 */
class GunComponent {

    constructor(componentOwner: Character) {
        //this.componentOwner = componentOwner
    }
    
    /**
     * Runs once per tick
     */
    update = (worldManager: WorldManager): void => {

        //worldManager.getProjectileManager().makeProjectile

    }

    fireProjectile = (worldManager: WorldManager): void => {
        //worldManager.getProjectileManager().newProjectile()
    }

}

export default GunComponent