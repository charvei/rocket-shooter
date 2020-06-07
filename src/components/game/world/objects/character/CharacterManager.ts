import Character from "./Character"
import WorldManager from "../../WorldManager"
import GameObjectManager from "../GameObjectManager"
import GameObject from "../GameObject"

/**
 * Store characters and manage access and manipulation to character resources
 */
class CharacterManager {
    private characterStore: Map<string, Character>
    gameObjectManager: GameObjectManager
    character: Character
    
    constructor(gameObjectManager: GameObjectManager) {
        this.characterStore = new Map<string, Character>()
        this.gameObjectManager = gameObjectManager

        //TESTING RENDERING:
        let characterPosition = {
            x: 320,
            y: 10
        }
        this.addCharacterToStore("Adam", 20, 20, characterPosition)
    }

    //Remember we can create a destructor
    //We can also do other lifecycle functions

    private addCharacter = (character: Character) => { 
        this.characterStore.set(character.getName(), character)
    }

    // make a class that has ALL REFERENCES to all objects than rather having to use in class constructor a param for colour, and grid and shit.
    getCharacter = (characterName: string) => {
        return this.characterStore.get(characterName)
    }

    private removeCharacter = (characterName: string) => {
        this.removeCharacterFromStore(characterName)
        // do error handling here
    }

    addCharacterToStore = (characterName: string, height: number, width: number, position: { x: number, y: number }) => {
        this.characterStore.set(
            characterName, 
            new Character(characterName, "x", height, width, position, "rgba(255, 255, 255, 0)")
            // new Character({
            //     name: characterName,
            //     code: "x",
            //     height: height,
            //     width: width,
            //     position: position,
            //     colour: ""
            // })
        )
    }

    //NOT SURE ABOUT THIS AT ALL. SO I WANT TO ADD THE RETICULE AS A COMPONENT OF THE PLAYER CHARACTER, MAKES SENSE TO PUT IN THE CHARACTER CLASS BUT HOW DO I ALSO GET THAT IN THE GAMEOBJECT OR WHATEVER STORE FOR IT TO RENDER
    addObjectToObjectStore = (object: GameObject) => {
        this.gameObjectManager.addGameObject(object)
    }

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