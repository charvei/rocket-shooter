"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var PhysicsComponent_js_1 = require("./components/PhysicsComponent.js");
var InputComponent_js_1 = require("./components/InputComponent.js");
var GameObject_js_1 = require("./objects/GameObject.js");
/**
 * Character or unit that exists in the game. This should probably go through some inheritance type things at some point
 */
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character(name, code, height, width, position) {
        var _this = _super.call(this, name, code, height, width, position) || this;
        _this.update = function (worldManager) {
            _this.physics.update(worldManager);
        };
        /*REMOVE THIS WHEN GRAVITY / JUMPING IS FULLY IMPLEMENTED*/
        _this.incrementYPos = function (increment) {
            var newPosition = {
                position: {
                    x: _this.getPosition().x,
                    y: _this.getPosition().y + increment
                }
            };
            _this.setPosition(newPosition);
        };
        // this.name = name
        // this.code = code
        // this.height = height
        // this.width = width
        // this.position = position
        _this.physics = new PhysicsComponent_js_1["default"](_this);
        _this.velocityX = 0;
        _this.velocityY = 0;
        _this.input = new InputComponent_js_1["default"](_this);
        return _this;
    }
    return Character;
}(GameObject_js_1["default"]));
exports["default"] = Character;
