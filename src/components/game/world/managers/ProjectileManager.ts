import Projectile from "../objects/projectiles/Projectile"
import WorldManager from "../WorldManager"
import BaseEntityManager from "./BaseEntityManager"

/**
 * Store Projectiles and manage access and manipulation to Projectile resources
 */
class ProjectileManager extends BaseEntityManager {

    constructor() {
        super()
    }

    generateProjectile = (): Projectile => {
        return new Projectile(25, 25, {x: 60, y: 60}, "#ff54f")
    }

    getProjectileList = (): Projectile[] => {
        return this.getEntityList() as Projectile[]
    }

    addProjectile = (): void => {
        this.addEntity(this.generateProjectile())
    }

    tick = (delta: number, worldManager: WorldManager): void => {
        this.updateProjectiles(delta, worldManager)
    }

    updateProjectiles = (delta: number, worldManager: WorldManager) => {
        this.getProjectileList().forEach((projectile: Projectile): void => {
            projectile.update(worldManager)
        })
    }






    //TEMPORARY: FOR TESTING LOOP.
    //THIS MIGHT FIT UNDER A BROADER UPDATE OR TICK() FUNCTION FOR A Projectile. I.E. WHERE IT CHECKS IF ITS IN SOMETHINGS WAY, IF IT NEEDS TO MOVE POS ETC?
    // updateProjectiles = (delta: number, worldManager: WorldManager) => {
    //     this.getProjectileStoreAsArray().forEach((projectile: Projectile) => {
    //         //projectile.update(worldManager)
    //     })
    // }


}

export default ProjectileManager