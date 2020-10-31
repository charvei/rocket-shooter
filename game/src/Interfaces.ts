import PhysicsComponent from './world/components/physics/PhysicsComponent';
import WorldManager from './world/WorldManager'

import { 
    Renderable,
    GetRenderableFunc,

} from "./Types";


export interface Tickable {
    tick(delta: number, ...args: any[]): void
}

export interface IsRenderable {
    getRenderable: GetRenderableFunc
    
    height: number
    width: number
    colour: string
    
    //position in world
    position: {
        x: number,
        y: number
    }
    
}

export interface HasPhysics {
    physics: PhysicsComponent
    update: (worldManager: WorldManager) => void
}