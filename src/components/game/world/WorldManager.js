"use strict";
exports.__esModule = true;
var CharacterManager_js_1 = require("./CharacterManager.js");
var colours_js_1 = require("./colours.js");
var GameObjectManager_js_1 = require("./GameObjectManager.js");
/**
 * Store world elements / managers
 */
var WorldManager = /** @class */ (function () {
    function WorldManager(context) {
        var _this = this;
        this.getColours = function () {
            return _this.colours;
        };
        this.getCharacterManager = function () {
            return _this.characterManager;
        };
        this.getGameObjectManager = function () {
            return _this.gameObjectManager;
        };
        this.updateWorld = function (delta) {
            _this.getCharacterManager().updateCharacters(delta, _this);
            // If we have multiple types of characters then we can create different managers for them and put them under characterManager
            // e.g. PlayerCharacter, Enemies, 
            // Potentially (and very possibly the correct choice) create a higher level class called entities, then fit Characters under that even, then we can put in 'Boundaries', 'missiles', etc under entities in the world too.  
        };
        this.getTouchRelationship = function (thisObject, otherObject) {
            var touchResult = {
                didCollide: false,
                vectors: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            };
            var thisBox = thisObject.getBoxCoords(1, 1);
            var otherBox = otherObject.getBoxCoords();
            touchResult.vectors = _this.getCollisionVectors(thisBox, otherBox);
            if (_this.checkCollision(thisBox, otherBox)) {
                touchResult.didCollide = true;
            }
            return touchResult;
        };
        // not accounting for multiple collisions at once currently
        this.getCollisions = function (character) {
            var collisionResult = {
                didCollide: false,
                vectors: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            };
            _this.gameObjectManager.getObjectStoreAsArray().forEach(function (object) {
                var characterBox = character.getBoxCoords(character.velocityX, character.velocityY);
                var objectBox = object.getBoxCoords();
                collisionResult.vectors = _this.getCollisionVectors(characterBox, objectBox);
                if (_this.checkCollision(characterBox, objectBox)) {
                    collisionResult.didCollide = true;
                    //call function in object's physics that updates array storing all objects that that object is touching.
                    character.physics.addTouchingObject(object);
                    //the array will then be iterated inside of the physics component to check if touching relationship still exists and resolve those touches (e.g. prevent velocity x from changing / velocity y from increasing if 'landed' touching relationship)
                }
            });
            return collisionResult;
        };
        this.checkCollision = function (subjectBox, otherBox) {
            if (subjectBox.bottom <= otherBox.top) {
                return false;
            }
            if (subjectBox.top >= otherBox.bottom) {
                return false;
            }
            if (subjectBox.right <= otherBox.left) {
                return false;
            }
            if (subjectBox.left >= otherBox.right) {
                return false;
            }
            return true;
        };
        this.getCollisionVectors = function (subjectBox, otherBox) {
            var collisionVectors = {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            };
            if (subjectBox.top <= otherBox.bottom && subjectBox.top >= otherBox.top) {
                collisionVectors.top = subjectBox.top - otherBox.bottom;
            }
            if (subjectBox.bottom >= otherBox.top && subjectBox.bottom <= otherBox.bottom) {
                collisionVectors.bottom = subjectBox.bottom - otherBox.top;
            }
            if (subjectBox.left <= otherBox.right && subjectBox.left >= otherBox.left) {
                collisionVectors.left = subjectBox.left - otherBox.right;
            }
            if (subjectBox.right >= otherBox.left && subjectBox.right <= otherBox.right) {
                collisionVectors.right = subjectBox.right - otherBox.left;
            }
            return collisionVectors;
        };
        // get vicinity collision
        /**
         * Stuff to do when collision is detected
         */
        this.resolveCollision = function () {
        };
        this.characterManager = new CharacterManager_js_1["default"]();
        this.gameObjectManager = new GameObjectManager_js_1["default"]();
        this.colours = new colours_js_1["default"](context);
        this.context = context;
    }
    return WorldManager;
}());
/**
 * TODO:
 *  - Consider inheritance of GameObjects & Entities
 *  - Better jump. Want character to jump once and maybe a little higher if jump button held
 */
exports["default"] = WorldManager;
