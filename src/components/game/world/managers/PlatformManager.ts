import BaseEntityManager from "./BaseEntityManager"
import Platform from "../objects/Platform"

/**
 * Store characters and manages access to and manipulation of character resources
 */
class PlatformManager extends BaseEntityManager {
    
    constructor() {
        super()

        let top = new Platform(
            "top", "top", 20, 1200, {x: 0, y: 0}, "#ffffff"
        )
        let left = new Platform(
            "left", "left", 720, 20, {x: 0, y: 0}, "rgba(255, 255, 255, 1)",
        )
        let bottom = new Platform(
            "bottom", "bottom", 20, 1200, { x: 0, y: 700 }, "rgba(255, 255, 255, 1)"
        )
        let right = new Platform(
            "right", "right", 720, 20, {x: 1180, y: 0}, "rgba(255, 255, 255, 1)"            
        )
        let testPlatform2 = new Platform(
            "test1", "12", 100, 100, { x: 450, y: 350  }, "rgba(255, 255, 255, 1)",
        )
          
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

export default PlatformManager