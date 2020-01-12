import CharacterManager from './characterManager.js'
import Colours from './colours.js'

/**
 * Store world elements / managers
 */
class WorldManager {
    characterManager: CharacterManager
    colours: Colours
    context: CanvasRenderingContext2D

    constructor(context: CanvasRenderingContext2D) {
        this.characterManager = new CharacterManager()
        this.colours = new Colours(context)
        this.context = context  
    }

    getColours = () => {
        return this.colours
    }

    getCharacterManager = () => {
        return this.characterManager
    }

    updateWorld = (delta: number) => {
        this.getCharacterManager().updateCharacters(delta)
        // If we have multiple types of characters then we can create different managers for them and put them under characterManager
        // e.g. PlayerCharacter, Enemies, 
        // Potentially (and very possibly the correct choice) create a higher level class called entities, then fit Characters under that even, then we can put in 'Boundaries', 'missiles', etc under entities in the world too.  
    }

}

export default WorldManager