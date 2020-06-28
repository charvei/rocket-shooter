import Character from "./Character"
import WorldManager from "../../WorldManager"
import BaseEntityManager from "../base/BaseEntityManager"
import GameObjectManager from "../GameObjectManager"
import GameObject from "../GameObject"
import { Tickable } from "../../../Interfaces"

/**
 * Store characters and manage access and manipulation to character resources
 */
class CharacterManager extends BaseEntityManager {
    
    constructor() {
        super()

        this.addEntity(this.genericCharacterFactory())
        //this.addCharacterToStore("Adam", 20, 20, characterPosition)
    }

    genericCharacterFactory = (): Character => {
        return new Character("Adam", "Adam", 20, 20, {x: 320, y: 50}, "rgba(255, 255, 255, 0)")
    }
    
    tick = (delta: number, worldManager: WorldManager): void => {
        this.updateCharacters(delta, worldManager)
    }

    updateCharacters = (delta: number, worldManager: WorldManager) => {
        this.getEntityList().forEach((character: Character) => {
            character.update(worldManager)
        })
    }


}

export default CharacterManager