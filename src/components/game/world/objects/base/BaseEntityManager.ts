import Entity from "./Entity"
import Platform from "../Platform"
import WorldManager from "../../WorldManager"
import { Renderable } from "../../../Types"
import { Tickable } from "../../../Interfaces"

/**
 * Store characters and manages access to and manipulation of character resources
 */
abstract class BaseEntityManager implements Tickable {
    private entityList: Entity[]

    abstract tick(delta: number, ...args: any[]): void
    
    constructor() {
        this.entityList = []
    }

    getEntityList = (): Entity[] => {
        return this.entityList
    }

    addEntity = (entity: Entity): void => { 
        this.entityList.push(entity)
    }

    getEntity = (entityId: string): Entity => {
        return this.entityList.find((entity: Entity) => {
            return entity.name = entityId
        })
    }

    removeEntity = (entityId: string): void => {
        this.entityList.splice(this.getEntityIndex(entityId), 1)
    }

    getEntityRenderables = (): Renderable[] => {
        return this.entityList.map((entity) => {
            return entity.getRenderable()
        })
    }

    getEntityIndex = (entityId: string): number => {
        return this.entityList.indexOf(this.getEntity(entityId))
    }
    
}

export default BaseEntityManager