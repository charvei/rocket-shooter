import Character from '../objects/character/Character'
import WorldManager from '../WorldManager'

/**
 * Gun component
 */
class GunComponent {
    willFireOnUpdate: boolean = false

    constructor(componentOwner: Character) {
        //this.componentOwner = componentOwner
    }
    
    /**
     * Runs once per tick
     */
    update = (worldManager: WorldManager): void => {
        if (this.willFireOnUpdate) {
            worldManager.getProjectileManager().addProjectile()

            this.willFireOnUpdate = false
        }
        //worldManager.getProjectileManager().makeProjectile

    }

    fireProjectile = (): void => {
        this.willFireOnUpdate = true
    }

}

export default GunComponent