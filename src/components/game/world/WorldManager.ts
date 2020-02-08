import CharacterManager from './CharacterManager.js'
import Colours from './colours.js'
import GameObjectManager from './GameObjectManager.js'
import Character from './Character.js'
import GameObject from './objects/GameObject'

type BoxCoords = {
    top: number,
    bottom: number,
    left: number,
    right: number
}

type CollisionVectors = {
    top: number,
    bottom: number,
    left: number,
    right: number
}

type CollisionResult = {
    didCollide: boolean,
    vectors: CollisionVectors
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

    getTouchRelationship = (thisObject: GameObject, otherObject: GameObject): CollisionResult => {
        let touchResult: CollisionResult = {
            didCollide: false,
            vectors: {
                top: 0, 
                bottom: 0, 
                left: 0, 
                right: 0
            }
        }

        let thisBox: BoxCoords = thisObject.getBoxCoords(-1, 1, -1, 1)
        let otherBox: BoxCoords = otherObject.getBoxCoords()

        touchResult.vectors = this.getCollisionVectors(thisBox, otherBox)
        
        if (this.checkCollision(thisBox, otherBox)) {
            touchResult.didCollide = true
        }

        return touchResult
    }

    // not accounting for multiple collisions at once currently
    getCollisions = (character: Character): CollisionResult[] => {
        let collisionResults: CollisionResult[] = []

        this.gameObjectManager.getObjectStoreAsArray().forEach((object) => {
            let characterBox: BoxCoords = character.getBoxCoords(character.velocityY, character.velocityY, character.velocityX, character.velocityX)
            let objectBox: BoxCoords = object.getBoxCoords()

            let collision: CollisionResult = {
                didCollide: false,
                vectors: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            }
            collision.vectors = this.getCollisionVectors(characterBox, objectBox)
            
            if (this.checkCollision(characterBox, objectBox)) {
                collision.didCollide = true
                
                //call function in object's physics that updates array storing all objects that that object is touching.
                character.physics.addTouchingObject(object) // what if it touches but never collides... hmmm maybe separate this to a different function call from character / gameobject
                console.log("ADDED: " + object.name)
            }

            collisionResults.push(collision)
        })
        return collisionResults
    }

    private checkCollision = (subjectBox: BoxCoords, otherBox: BoxCoords): boolean => {
        if (subjectBox.bottom <= otherBox.top) {
            return false
        }
        if (subjectBox.top >= otherBox.bottom) {
            return false
        }
        if (subjectBox.right <= otherBox.left) {
            return false
        }
        if (subjectBox.left >= otherBox.right) {
            return false
        }

        return true
    }

    getCollisionVectors = (subjectBox: BoxCoords, otherBox: BoxCoords): CollisionVectors => {
        let collisionVectors: CollisionVectors = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }

        if (subjectBox.top <= otherBox.bottom && subjectBox.top >= otherBox.top) {
            collisionVectors.top = subjectBox.top - otherBox.bottom
        }
        if (subjectBox.bottom >= otherBox.top && subjectBox.bottom <= otherBox.bottom) {
            collisionVectors.bottom = subjectBox.bottom - otherBox.top
        }
        if (subjectBox.left <= otherBox.right && subjectBox.left >= otherBox.left) {
            collisionVectors.left = subjectBox.left - otherBox.right
        }
        if (subjectBox.right >= otherBox.left && subjectBox.right <= otherBox.right) {
            collisionVectors.right = subjectBox.right - otherBox.left
        }

        return collisionVectors
    }

}

/**
 * TODO:
 *  - Consider inheritance of GameObjects & Entities
 *  - Better jump. Want character to jump once and maybe a little higher if jump button held
 */

export default WorldManager