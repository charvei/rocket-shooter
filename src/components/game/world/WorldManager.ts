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

    updateWorld = () => {
        this.getCharacterManager().updateCharacters()
    }

}

export default WorldManager