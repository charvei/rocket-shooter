"use strict";
exports.__esModule = true;
var Commands_1 = require("./Commands");
/**
 * Input handler
 */
var InputHandler = /** @class */ (function () {
    function InputHandler(characterManager) {
        var _this = this;
        this.keys = {}; // record of keyboard keys and their corresponding state of pressed down or up
        /**
         * Set up keydown listeners to detect when keys are pressed down and lifted up
         */
        this.setupKeyDownListeners = function () {
            window.onkeyup = function (e) {
                _this.keys[e.key] = false;
            };
            window.onkeydown = function (e) {
                _this.keys[e.key] = true;
            };
        };
        /**
         * Runs once a loop, detects user's raw input and handles it
         */
        this.handleInput = function (delta) {
            if (_this.isPressed('w')) {
                _this.moveUp(delta);
            }
            if (_this.isPressed('a')) {
                _this.moveLeft(delta);
            }
            if (_this.isPressed('s')) {
                _this.moveDown(delta);
            }
            if (_this.isPressed('d')) {
                _this.moveRight(delta);
            }
        };
        /**
         * Check if given key is pressed
         */
        this.isPressed = function (key) {
            return _this.keys[key] ? true : false;
        };
        this.canvas = document.getElementById('game-canvas');
        this.setupKeyDownListeners();
        this.characterManagerRef = characterManager;
        this.moveRight = Commands_1["default"].makeMoveUnitCommand(this.characterManagerRef.getCharacterByName("Adam"), "Right");
        this.moveLeft = Commands_1["default"].makeMoveUnitCommand(this.characterManagerRef.getCharacterByName("Adam"), "Left");
        this.moveUp = Commands_1["default"].makeMoveUnitCommand(this.characterManagerRef.getCharacterByName("Adam"), "Up");
        this.moveDown = Commands_1["default"].makeMoveUnitCommand(this.characterManagerRef.getCharacterByName("Adam"), "Down");
    }
    return InputHandler;
}());
exports["default"] = InputHandler;
