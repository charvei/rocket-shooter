import CharacterManager from './CharacterManager.js'
import Colours from './colours.js'
import GameObjectManager from './GameObjectManager.js'

/**
 * Store world elements / managers
 */
class WorldManager {
    characterManager: CharacterManager
    gameObjectManager: GameObjectManager
    colours: Colours
    context: CanvasRenderingContext2D

    constructor(context: CanvasRenderingContext2D) {
        this.characterManager = new CharacterManager()
        this.gameObjectManager = new GameObjectManager()
        this.colours = new Colours(context)
        this.context = context  
    }

    getColours = () => {
        return this.colours
    }

    getCharacterManager = () => {
        return this.characterManager
    }

    getGameObjectManager = () => {
        return this.gameObjectManager
    }

    updateWorld = (delta: number) => {
        this.getCharacterManager().updateCharacters(delta)
        // If we have multiple types of characters then we can create different managers for them and put them under characterManager
        // e.g. PlayerCharacter, Enemies, 
        // Potentially (and very possibly the correct choice) create a higher level class called entities, then fit Characters under that even, then we can put in 'Boundaries', 'missiles', etc under entities in the world too.  
    }

    detectCollision = (): boolean => {
        // Probably want to use inheritance a little to allow for a single loop through array of the base class of GameObjects and Entities
        
        // But for now, will just hack it together because I want to code collision.
        this.characterManager.getCharacterStoreAsArray().forEach((character) => {
            // Get each side of character
            let characterLeft: number = character.getPosition().x
            let characterRight: number = characterLeft + character.getWidth()
            let characterTop: number = character.getPosition().y
            let characterBottom: number = characterTop + character.getHeight()
            
            this.gameObjectManager.getObjectStoreAsArray().forEach((object) => {
                // Get each side of object
                let objectLeft: number = object.getPosition().x
                let objectRight: number = objectLeft + object.getWidth()
                let objectTop: number = object.getPosition().y
                let objectBottom: number = objectTop + object.getHeight()
                
                let yCollisionFlag = this.detectYCollision(characterTop, characterBottom, objectTop, objectBottom)
                let xCollisionFlag = this.detectXCollision(characterLeft, characterRight, objectLeft, objectRight)

                if (yCollisionFlag && xCollisionFlag) {
                    //collision occurred
                    console.log("COLLISION")
                } else {
                    console.log("weeee")
                }
            })
        })

        return true
    }

    private detectYCollision = (characterTop, characterBottom, objectTop, objectBottom): boolean => {
        // character lands on top of object
        if (characterBottom > objectTop && characterBottom < objectBottom) {
            //console.log("character lands on top of object")
            //character.input.clearVelocityY()
            return true
        }

        // character hits head on bottom of object
        if (objectBottom > characterTop && objectBottom < characterBottom) {
            //console.log("character hits head on bottom of object")
            return true
        }

        return false
    }

    private detectXCollision = (characterLeft, characterRight, objectLeft, objectRight): boolean => {
        // character's right side hits object left side
        if (characterRight > objectLeft && characterRight < objectRight) {
            //console.log("character runs into left side of object")
            return true
        }

        // character's left side hits object's right side
        if (objectRight > characterLeft && objectRight < characterRight) {
            //console.log("character runs into right side of object")
            return true
        }

        return false
    }

    /**
     * Stuff to do when collision is detected
     */
    resolveCollision = () => {

    }
}

/**
 * TODO:
 *  - Consider inheritance of GameObjects & Entities
 *  - Better jump. Want character to jump once and maybe a little higher if jump button held
 */

export default WorldManager