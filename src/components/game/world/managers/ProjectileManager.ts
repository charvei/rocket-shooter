import Projectile from "../objects/projectiles/Projectile"
import WorldManager from "../WorldManager"

/**
 * Store Projectiles and manage access and manipulation to Projectile resources
 */
class ProjectileManager {
    private projectileStore: Map<string, Projectile>
    
    constructor() {
        this.projectileStore = new Map<string, Projectile>()

    }

    //Remember we can create a destructor
    //We can also do other lifecycle functions

    private addProjectile = (projectile: Projectile) => { 
        //this.projectileStore.set(projectile.getName(), projectile)
    }

    getProjectile = (projectileName: string) => {
        return this.projectileStore.get(projectileName)
    }

    private removeProjectile = (projectileName: string) => {
        this.removeProjectileFromStore(projectileName)
    }

    addProjectileToStore = (projectileName: string) => {
        // this.projectileStore.set(
        //     projectileName, 
        //     new Projectile(5, 5, {x: 50, y: 50}, "#ff33ff")
        // )
    }

    removeProjectileFromStore = (projectileName: string) => {
        this.projectileStore.delete(projectileName)
    }

    getProjectileByName = (name: string) => {
        return this.projectileStore.get(name)
    }

    // Set of information about how to render Projectiles // maybe this is just ProjectileStore?
    // getProjectileRenderSet = () => {
    // }
    getProjectileStoreAsArray = () => {
        let projectileList: Projectile[] = Array.from(this.projectileStore.values())
        return projectileList
    }

    //TEMPORARY: FOR TESTING LOOP.
    //THIS MIGHT FIT UNDER A BROADER UPDATE OR TICK() FUNCTION FOR A Projectile. I.E. WHERE IT CHECKS IF ITS IN SOMETHINGS WAY, IF IT NEEDS TO MOVE POS ETC?
    updateProjectiles = (delta: number, worldManager: WorldManager) => {
        this.getProjectileStoreAsArray().forEach((projectile: Projectile) => {
            //projectile.update(worldManager)
        })
    }


}

export default ProjectileManager