import Entity from "../objects/base/Entity"
import Platform from "../objects/Platform"
import WorldManager from "../WorldManager"
import { Renderable } from "../../Types"
import { Tickable } from "../../Interfaces"

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

    getEntity = (entityId: string): Entity | undefined => {
        return this.entityList.find((entity: Entity) => {
            return entity.name = entityId
        })
    }

    removeEntity = (entityId: string): void => {
        let entityIndex: number | null = this.getEntityIndex(entityId)
        if (entityIndex != null) {
            this.entityList.splice(entityIndex, 1)
        } else {
            //log -> couldn't remove requested entity
            console.log("Failed to remove entity of entityId: " + entityId)
        }
    }

    getEntityRenderables = (): Renderable[] => {
        return this.entityList.map((entity) => {
            return entity.getRenderable()
        })
    }

    /**
     * Return index of requested entity. If none found, returns null.
     * 
     * @param entityId id of requested entity
     */
    getEntityIndex = (entityId: string): number | null => {
        let entity: Entity | undefined = this.getEntity(entityId)
        if (entity) {
            return this.entityList.indexOf(entity)
        } else {
            return null
        }
    }
    
}

export default BaseEntityManager