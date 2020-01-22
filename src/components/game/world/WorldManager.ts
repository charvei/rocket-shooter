import CharacterManager from './CharacterManager.js'
import Colours from './colours.js'
import GameObjectManager from './GameObjectManager.js'

// type XCollisionLocation = {
//     didCollide: boolean,
//     leftCollision: boolean,
//     rightCollision: boolean
// }

// type YCollisionLocation = {
//     didCollide: boolean,
//     topCollision: boolean,
//     bottomCollision: boolean,
// }

type CollisionLocation = {
    xCollision: number,
    yCollision: number
}

type CollisionResult = {
    axis: string,
    distance: number
}

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
        this.getCharacterManager().updateCharacters(delta, this)
        // If we have multiple types of characters then we can create different managers for them and put them under characterManager
        // e.g. PlayerCharacter, Enemies, 
        // Potentially (and very possibly the correct choice) create a higher level class called entities, then fit Characters under that even, then we can put in 'Boundaries', 'missiles', etc under entities in the world too.  
    }

    detectCollision = (): CollisionResult => {
        // Probably want to use inheritance a little to allow for a single loop through array of the base class of GameObjects and Entities
        // But for now, will just hack it together because I want to code collision.
        let collisionResult = {
            axis: "null",
            distance: 0
        }

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
                
                character.physics.xCollisionFlag = this.detectXCollision(characterLeft, characterRight, objectLeft, objectRight)
                character.physics.yCollisionFlag = this.detectYCollision(characterTop, characterBottom, objectTop, objectBottom)

                if (Math.abs(character.physics.xCollisionFlag) > 0 && Math.abs(character.physics.yCollisionFlag) > 0) {
                    // collision occurred

                    
                    if (Math.abs(character.physics.previousXCollisionFlag) > 0 && !(Math.abs(character.physics.previousYCollisionFlag) > 0)) {
                        // hit occured on character's y axis
                        character.input.clearVelocityY()
                        collisionResult = {
                            axis: "y",
                            distance: character.physics.yCollisionFlag
                        }
                        
                    }
                    if (!(Math.abs(character.physics.previousXCollisionFlag) > 0) && character.physics.previousYCollisionFlag > 0) {
                        // hit occured on character's x axis
                        character.input.clearVelocityX()
                        //collisionAmount = character.physics.yCollisionFlag
                        collisionResult = {
                            axis: "x",
                            distance: character.physics.xCollisionFlag
                        }
                    }
                } else {
                    // no collision
                }

                character.physics.previousXCollisionFlag = character.physics.xCollisionFlag
                character.physics.previousYCollisionFlag = character.physics.yCollisionFlag

            })
        })

        return collisionResult
    }

    private detectYCollision = (characterTop, characterBottom, objectTop, objectBottom): number => {
        if (characterBottom > objectTop && characterBottom < objectBottom) {
            // character lands on top of object
            return characterBottom - objectTop
        }
        if (objectBottom > characterTop && objectBottom < characterBottom) {
            // character hits head on bottom of object
            return characterTop - objectBottom
        }
        return 0
    }

    private detectXCollision = (characterLeft, characterRight, objectLeft, objectRight): number => {
        if (characterRight > objectLeft && characterRight < objectRight) {
            // character's right side hits object left side
            return characterRight - objectLeft
        }
        if (objectRight > characterLeft && objectRight < characterRight) {
            // character's left side hits object's right side
            return characterLeft - objectRight
        }
        return 0
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