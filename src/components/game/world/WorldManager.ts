import CharacterManager from './managers/CharacterManager'
import PlatformManager from './managers/PlatformManager.js'
import Character from './objects/character/Character'
import Entity from './objects/base/Entity'
import ForegroundManager from './foreground/ForegroundManager.js'

import {
    BoxCoords,
    CollisionVectors,
    CollisionResult
} from "../Types"

/**
 * Store world elements / managers
 */
class WorldManager {
    characterManager: CharacterManager
    platformManager: PlatformManager
    foregroundManager: ForegroundManager
    context: CanvasRenderingContext2D

    constructor(context: CanvasRenderingContext2D, foregroundContext: CanvasRenderingContext2D, canvasProps: {height: number, width: number}) {
        this.platformManager = new PlatformManager()
        this.characterManager = new CharacterManager()
        
        this.foregroundManager = new ForegroundManager(foregroundContext, canvasProps)
        this.context = context  
    }

    getCharacterManager = () => {
        return this.characterManager
    }

    getPlatformManager = () => {
        return this.platformManager
    }

    getForegroundManager = () => {
        return this.foregroundManager
    }

    updateWorld = (delta: number) => {
        this.getCharacterManager().tick(delta, this)
        // If we have multiple types of characters then we can create different managers for them and put them under characterManager
        // e.g. PlayerCharacter, Enemies, 
        // Potentially (and very possibly the correct choice) create a higher level class called entities, then fit Characters under that even, then we can put in 'Boundaries', 'missiles', etc under entities in the world too.  

        //this.getCharacterManager().
    }

    updateForeground = (delta: number) => {
        this.foregroundManager.updateForeground(delta)
    }

    getTouchRelationship = (thisEntity: Entity, otherEntity: Entity): CollisionResult => {
        let touchResult: CollisionResult = {
            didCollide: false,
            vectors: {
                top: 0, 
                bottom: 0, 
                left: 0, 
                right: 0
            }
        }

        let thisBox: BoxCoords = thisEntity.getBoxCoords(-1, 1, -1, 1)
        let otherBox: BoxCoords = otherEntity.getBoxCoords()

        touchResult.vectors = this.getCollisionVectors(thisBox, otherBox)
        
        if (this.checkCollision(thisBox, otherBox)) {
            touchResult.didCollide = true
        }

        return touchResult
    }

    // not accounting for multiple collisions at once currently
    getCollisions = (character: Character): CollisionResult[] => {
        let collisionResults: CollisionResult[] = []

        this.platformManager.getEntityList().forEach((entity) => {
            let characterBox: BoxCoords = character.getBoxCoords(character.velocityY, character.velocityY, character.velocityX, character.velocityX)
            let entityBox: BoxCoords = entity.getBoxCoords()

            let collision: CollisionResult = {
                didCollide: false,
                vectors: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            }
            collision.vectors = this.getCollisionVectors(characterBox, entityBox)
            
            if (this.checkCollision(characterBox, entityBox)) {
                collision.didCollide = true
                
                //call function in entity's physics that updates array storing all entitys that that entity is touching.
                character.physics.addTouchingEntity(entity) // what if it touches but never collides... hmmm maybe separate this to a different function call from character / gameentity
                console.log("ADDED: " + entity.name)
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