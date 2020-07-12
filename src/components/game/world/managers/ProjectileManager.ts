import Projectile from "../objects/projectiles/Projectile"
import WorldManager from "../WorldManager"
import BaseEntityManager from "./BaseEntityManager"

import {
    Position
} from "../../Types"

/**
 * Store Projectiles and manage access and manipulation to Projectile resources
 */
class ProjectileManager extends BaseEntityManager {

    constructor() {
        super()
    }

    generateProjectile = (position: Position, angle: number, velocity: number): Projectile => {
        console.log("projectile angle: " + Math.sin(angle))
        //cos: -1 = left, 1 = right
        //sin: -1 = top, 1 = bottom
        let velocityX = velocity * Math.cos(angle)
        let velocityY = velocity * Math.sin(angle)

        return new Projectile(5, 5, {x: position.x, y: position.y}, "#ff54f", velocityX, velocityY)
    }

    getProjectileList = (): Projectile[] => {
        return this.getEntityList() as Projectile[]
    }

    addProjectile = (location: Position, angle: number, velocity: number): void => {
        this.addEntity(this.generateProjectile(location, angle, velocity))
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