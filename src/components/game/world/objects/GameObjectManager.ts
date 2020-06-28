import GameObject from "./GameObject"
import Platform from "./Platform"
import WorldManager from "../WorldManager"
import { Renderable } from "../../Types"

/**
 * Store characters and manages access to and manipulation of character resources
 */
class GameObjectManager {
    private objectStore: Map<string, GameObject>
    
    constructor() {
        this.objectStore = new Map<string, GameObject>()
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
        this.addGameObject(top)
        this.addGameObject(bottom)
        this.addGameObject(left)
        this.addGameObject(right)
        this.addGameObject(testPlatform2)
    }

    addGameObject = (object: GameObject) => { 
        this.objectStore.set(object.getName(), object)
    }

    // make a class that has ALL REFERENCES to all objects than rather having to use in class constructor a param for colour, and grid and shit.
    getGameObject = (objectName: string) => {
        return this.objectStore.get(objectName)
    }

    removeGameObject = (objectName: string) => {
        this.removeObjectFromStore(objectName)
        // do error handling here
    }

    removeObjectFromStore = (objectName: string) => {
        this.objectStore.delete(objectName)
    }

    getObjectByName = (name: string) => {
        return this.objectStore.get(name)
    }

    // Set of information about how to render characters // maybe this is just characterStore?
    // getCharacterRenderSet = () => {
    // }
    getObjectStoreAsArray = () => {
        let objectList: GameObject[] = Array.from(this.objectStore.values())
        return objectList
    }

    getObjectRenderables = (): Renderable[] => {
        return Array.from(this.objectStore.values()).map((object) => {
            return object.getRenderable()
        })
    }

    //TEMPORARY: FOR TESTING LOOP.
    //THIS MIGHT FIT UNDER A BROADER UPDATE OR TICK() FUNCTION FOR A CHARACTER. I.E. WHERE IT CHECKS IF ITS IN SOMETHINGS WAY, IF IT NEEDS TO MOVE POS ETC?
    updateCharacters = (delta: number, worldManager: WorldManager) => {
        this.getObjectStoreAsArray().forEach((object: GameObject) => {
            object.update(worldManager)
        })
    }

}

export default GameObjectManager