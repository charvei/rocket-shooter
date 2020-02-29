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
        let testPlatform1 = new Platform({
            name: "test",
            code: "1",
            height: 100,
            width: 100,
            colour: "rgba(255, 255, 255, 1)",
            position: {x: 300, y: 150},
            
        })
        let testPlatform2 = new Platform({
            name: "test1",
            code: "12",
            height: 100,
            width: 100,
            colour: "rgba(255, 255, 255, 1)",
            position: { x: 450, y: 350  }
        })
        let base = new Platform({
            name: "base",
            code: "base",
            height: 20,
            width: 800,
            colour: "rgba(255, 255, 255, 1)",
            position: { x: 0, y: 460 }
        })
        this.addGameObject(testPlatform1)
        this.addGameObject(testPlatform2)
        this.addGameObject(base)
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