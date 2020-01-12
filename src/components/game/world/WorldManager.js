"use strict";
exports.__esModule = true;
var characterManager_js_1 = require("./characterManager.js");
var colours_js_1 = require("./colours.js");
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
        this.updateWorld = function (delta) {
            _this.getCharacterManager().updateCharacters(delta);
            // If we have multiple types of characters then we can create different managers for them and put them under characterManager
            // e.g. PlayerCharacter, Enemies, 
            // Potentially (and very possibly the correct choice) create a higher level class called entities, then fit Characters under that even, then we can put in 'Boundaries', 'missiles', etc under entities in the world too.  
        };
        this.characterManager = new characterManager_js_1["default"]();
        this.colours = new colours_js_1["default"](context);
        this.context = context;
    }
    return WorldManager;
}());
exports["default"] = WorldManager;
