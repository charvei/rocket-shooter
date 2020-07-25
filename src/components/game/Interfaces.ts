import PhysicsComponent from './world/components/PhysicsComponent'
import { 
    Renderable,
    GetRenderableFunc 
} from "./Types";
import NewPhysicsComponent from './world/components/physics/NewPhysicsComponent';

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
    velocityX: number
    velocityY: number

    physics: PhysicsComponent
}

export interface HasPhysics2 {
    physics: NewPhysicsComponent
}