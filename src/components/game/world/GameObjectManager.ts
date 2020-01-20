import GameObject from "./objects/GameObject"
import Platform from "./objects/Platform"

/**
 * Store characters and manages access to and manipulation of character resources
 */
class GameObjectManager {
    private objectStore: Map<string, GameObject>
    
    constructor() {
        this.objectStore = new Map<string, GameObject>()


        let testPlatform = new Platform("test", "1", 100, 100, { x: 300, y: 150  })
        this.addGameObject(testPlatform)
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

    // createAndAddGameObjectToStore = (objectName: string, height: number, width: number, position: { x: number, y: number }) => {
    //     this.objectStore.set(
    //         objectName, 
    //         new GameObject(objectName, "x", height, width, position)
    //     )
    // }

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

    //TEMPORARY: FOR TESTING LOOP.
    //THIS MIGHT FIT UNDER A BROADER UPDATE OR TICK() FUNCTION FOR A CHARACTER. I.E. WHERE IT CHECKS IF ITS IN SOMETHINGS WAY, IF IT NEEDS TO MOVE POS ETC?
    updateCharacters = (delta: number) => {
        this.getObjectStoreAsArray().forEach((object: GameObject) => {
            object.update()
        })
    }

}

export default GameObjectManager