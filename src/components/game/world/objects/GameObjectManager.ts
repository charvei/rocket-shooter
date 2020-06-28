import BaseEntityManager from "./base/BaseEntityManager"
import GameObject from "./GameObject"
import Platform from "./Platform"
import WorldManager from "../WorldManager"
import { Renderable } from "../../Types"

/**
 * Store characters and manages access to and manipulation of character resources
 */
class GameObjectManager extends BaseEntityManager {
    private objectStore: Map<string, GameObject>
    
    constructor() {
        super()
        let top = new Platform({
            name: "top",
            code: "top",
            height: 20,
            width: 1200,
            colour: "rgba(255, 255, 255, 1)",
            position: {x: 0, y: 0},
            
        })
        let left = new Platform({
            name: "left",
            code: "left",
            height: 720,
            width: 20,
            colour: "rgba(255, 255, 255, 1)",
            position: {x: 0, y: 0},
            
        })
        let bottom = new Platform({
            name: "bottom",
            code: "bottom",
            height: 20,
            width: 1200,
            colour: "rgba(255, 255, 255, 1)",
            position: { x: 0, y: 700 }
        })
        let right = new Platform({
            name: "right",
            code: "right",
            height: 720,
            width: 20,
            colour: "rgba(255, 255, 255, 1)",
            position: {x: 1180, y: 0},
            
        })

        let testPlatform2 = new Platform({
            name: "test1",
            code: "12",
            height: 100,
            width: 100,
            colour: "rgba(255, 255, 255, 1)",
            position: { x: 450, y: 350  }
        })
        this.addEntity(top)
        this.addEntity(bottom)
        this.addEntity(left)
        this.addEntity(right)
        this.addEntity(testPlatform2)
    }

    tick = (delta: number): void => {
        //tick game objects
    }

}

export default GameObjectManager