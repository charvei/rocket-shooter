"use strict";
exports.__esModule = true;
var PhysicsComponent_js_1 = require("./components/PhysicsComponent.js");
var InputComponent_js_1 = require("./components/InputComponent.js");
/**
 * Character or unit that exists in the game. This should probably go through some inheritance type things at some point
 */
var Character = /** @class */ (function () {
    function Character(name, code, height, width, position) {
        var _this = this;
        this.update = function () {
            _this.physics.update();
        };
        this.getName = function () {
            return _this.name;
        };
        this.getCode = function () {
            return _this.code;
        };
        this.getHeight = function () {
            return _this.height;
        };
        this.getWidth = function () {
            return _this.width;
        };
        this.getPosition = function () {
            return _this.position;
        };
        this.setPosition = function (_a) {
            var position = _a.position;
            _this.position = position;
        };
        /*REMOVE THIS WHEN GRAVITY / JUMPING IS FULLY IMPLEMENTED*/
        this.incrementYPos = function (increment) {
            var newPosition = {
                position: {
                    x: _this.getPosition().x,
                    y: _this.getPosition().y + increment
                }
            };
            _this.setPosition(newPosition);
        };
        this.name = name;
        this.code = code;
        this.height = height;
        this.width = width;
        this.position = position;
        this.physics = new PhysicsComponent_js_1["default"](this);
        this.velocityX = 0;
        this.velocityY = 0;
        this.input = new InputComponent_js_1["default"](this);
    }
    return Character;
}());
exports["default"] = Character;
