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
        this.updateWorld = function () {
            _this.getCharacterManager().updateCharacters();
        };
        this.characterManager = new characterManager_js_1["default"]();
        this.colours = new colours_js_1["default"](context);
        this.context = context;
    }
    return WorldManager;
}());
exports["default"] = WorldManager;
