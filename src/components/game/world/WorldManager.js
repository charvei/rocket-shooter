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
        this.detectCollision = function () {
            // Probably want to use inheritance a little to allow for a single loop through array of the base class of GameObjects and Entities
            // But for now, will just hack it together because I want to code collision.
            var collisionResult = {
                axis: "null",
                distance: 0
            };
            _this.characterManager.getCharacterStoreAsArray().forEach(function (character) {
                // Get each side of character
                var characterLeft = character.getPosition().x;
                var characterRight = characterLeft + character.getWidth();
                var characterTop = character.getPosition().y;
                var characterBottom = characterTop + character.getHeight();
                _this.gameObjectManager.getObjectStoreAsArray().forEach(function (object) {
                    // Get each side of object
                    var objectLeft = object.getPosition().x;
                    var objectRight = objectLeft + object.getWidth();
                    var objectTop = object.getPosition().y;
                    var objectBottom = objectTop + object.getHeight();
                    character.physics.xCollisionFlag = _this.detectXCollision(characterLeft, characterRight, objectLeft, objectRight);
                    character.physics.yCollisionFlag = _this.detectYCollision(characterTop, characterBottom, objectTop, objectBottom);
                    if (Math.abs(character.physics.xCollisionFlag) > 0 && Math.abs(character.physics.yCollisionFlag) > 0) {
                        // collision occurred
                        if (Math.abs(character.physics.previousXCollisionFlag) > 0 && !(Math.abs(character.physics.previousYCollisionFlag) > 0)) {
                            // hit occured on character's y axis
                            character.input.clearVelocityY();
                            collisionResult = {
                                axis: "y",
                                distance: character.physics.yCollisionFlag
                            };
                        }
                        if (!(Math.abs(character.physics.previousXCollisionFlag) > 0) && character.physics.previousYCollisionFlag > 0) {
                            // hit occured on character's x axis
                            character.input.clearVelocityX();
                            //collisionAmount = character.physics.yCollisionFlag
                            collisionResult = {
                                axis: "x",
                                distance: character.physics.xCollisionFlag
                            };
                        }
                    }
                    else {
                        // no collision
                    }
                    character.physics.previousXCollisionFlag = character.physics.xCollisionFlag;
                    character.physics.previousYCollisionFlag = character.physics.yCollisionFlag;
                });
            });
            return collisionResult;
        };
        this.detectYCollision = function (characterTop, characterBottom, objectTop, objectBottom) {
            if (characterBottom > objectTop && characterBottom < objectBottom) {
                // character lands on top of object
                return characterBottom - objectTop;
            }
            if (objectBottom > characterTop && objectBottom < characterBottom) {
                // character hits head on bottom of object
                return characterTop - objectBottom;
            }
            return 0;
        };
        this.detectXCollision = function (characterLeft, characterRight, objectLeft, objectRight) {
            if (characterRight > objectLeft && characterRight < objectRight) {
                // character's right side hits object left side
                return characterRight - objectLeft;
            }
            if (objectRight > characterLeft && objectRight < characterRight) {
                // character's left side hits object's right side
                return characterLeft - objectRight;
            }
            return 0;
        };
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
