import Projectile from "./Projectile"
import WorldManager from "../../WorldManager"
import GameObjectManager from "../GameObjectManager"
import GameObject from "../GameObject"

/**
 * Store characters and manage access and manipulation to character resources
 */
class CharacterManager {
    private projectileStore: Map<string, Projectile>
    projectile: Projectile
    
    constructor() {
        this.projectileStore = new Map<string, Projectile>()

    }

    //Remember we can create a destructor
    //We can also do other lifecycle functions

    private addProjectile = (project: Projectile) => { 
        this.projectileStore.set(projectile.getName(), projectile)
    }

    // make a class that has ALL REFERENCES to all objects than rather having to use in class constructor a param for colour, and grid and shit.
    getCharacter = (projectileName: string) => {
        return this.projectileStore.get(projectileName)
    }

    private removeCharacter = (characterName: string) => {
        this.removeCharacterFromStore(characterName)
        // do error handling here
    }

    addCharacterToStore = (projectileName: string) => {
        this.projectileStore.set(
            projectileName, 
            new Projectile()
        )
    }

    //NOT SURE ABOUT THIS AT ALL. SO I WANT TO ADD THE RETICULE AS A COMPONENT OF THE PLAYER CHARACTER, MAKES SENSE TO PUT IN THE CHARACTER CLASS BUT HOW DO I ALSO GET THAT IN THE GAMEOBJECT OR WHATEVER STORE FOR IT TO RENDER
    // addObjectToObjectStore = (object: GameObject) => {
    //     this.gameObjectManager.addGameObject(object)
    // }

    removeCharacterFromStore = (characterName: string) => {
        this.characterStore.delete(characterName)
    }

    getCharacterByName = (name: string) => {
        return this.characterStore.get(name)
    }

    // Set of information about how to render characters // maybe this is just characterStore?
    // getCharacterRenderSet = () => {
    // }
    getCharacterStoreAsArray = () => {
        let characterList: Character[] = Array.from(this.characterStore.values())
        return characterList
    }

    //TEMPORARY: FOR TESTING LOOP.
    //THIS MIGHT FIT UNDER A BROADER UPDATE OR TICK() FUNCTION FOR A CHARACTER. I.E. WHERE IT CHECKS IF ITS IN SOMETHINGS WAY, IF IT NEEDS TO MOVE POS ETC?
    updateCharacters = (delta: number, worldManager: WorldManager) => {
        this.getCharacterStoreAsArray().forEach((character: Character) => {
            character.update(worldManager)
        })
    }


}

export default CharacterManager