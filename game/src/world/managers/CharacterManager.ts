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

        // this.addEntity(this.characterFactory("Adam", {x: 620, y: 150}, "#0000ff"))
        // this.addEntity(this.characterFactory("Eve", {x: 150, y: 150}, "#ff0000"))
    }

    getCharacterList = (): Character[] => {
        return this.getEntityList() as Character[]
    }

    addCharacter = (name: string, position: {x: number, y: number}, colour: string) => {
        this.addEntity(this.characterFactory(name, position, colour))
    }

    characterFactory = (name: string, position: {x: number, y: number}, colour: string): Character => {
        return new Character(name, name, 20, 20, position, colour)
    }
    
    getCharacterRenderables = (): Renderable[] => {
        let characterRenderables: Renderable[] = []
        this.getCharacterList().forEach(character => {
            // Improvement: construct all of character renderables from the character itself
            characterRenderables.push(character.getRenderable())
            characterRenderables.push(character.reticule.getRenderable())
        })
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