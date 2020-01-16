"use strict";
exports.__esModule = true;
/**
 * Input handler
 */
var InputHandler = /** @class */ (function () {
    function InputHandler() {
        var _this = this;
        this.keys = {};
        this.setupKeyDownListeners = function () {
            window.onkeyup = function (e) {
                _this.keys[e.key] = false;
                console.log(_this.isPressed("w"));
            };
            window.onkeydown = function (e) {
                _this.keys[e.key] = true;
                console.log(_this.isPressed("w"));
            };
        };
        /**
         * Runs once a loop, detects user's raw input and handles it
         */
        this.handleInput = function () {
        };
        /**
         * Check if given key is pressed
         */
        this.isPressed = function (key) {
            return _this.keys[key] ? true : false;
        };
        this.canvas = document.getElementById('game-canvas');
        this.setupKeyDownListeners();
    }
    return InputHandler;
}());
exports["default"] = InputHandler;
