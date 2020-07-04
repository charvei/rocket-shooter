import Character from "../objects/character/Character"
import WorldManager from "../WorldManager"
import BaseEntityManager from "../managers/BaseEntityManager"
import { Tickable } from "../../Interfaces"
import { Renderable } from "../../Types"

/**
 * Store characters and manage access and manipulation to character resources
 */
class CharacterManager extends BaseEntityManager {
    constructor() {
        super()


        this.addEntity(this.genericCharacterFactory())
        //this.addCharacterToStore("Adam", 20, 20, characterPosition)
        
    }

    getCharacterList = (): Character[] => {
        return this.getEntityList() as Character[]
    }

    genericCharacterFactory = (): Character => {
        return new Character("Adam", "Adam", 20, 20, {x: 320, y: 50}, "#0000ff")
    }
    
    getCharacterRenderables = (): Renderable[] => {
        let characterRenderables: Renderable[] = []
        this.getCharacterList().forEach(character => {
            // Improvement: construct all of character renderables from the character itself
            characterRenderables.push(character.getRenderable())
            characterRenderables.push(character.reticule.getRenderable())
        })
        console.log("Renderables charater: " + characterRenderables)
        console.log(characterRenderables[0].colour)
        return characterRenderables
    }

    tick = (delta: number, worldManager: WorldManager): void => {
        this.updateCharacters(delta, worldManager)
    }

    updateCharacters = (delta: number, worldManager: WorldManager) => {
        this.getCharacterList().forEach((character: Character): void => {
            character.update(worldManager)
        })
    }


}

export default CharacterManager