"use strict";
exports.__esModule = true;
/**
 * Input component
 *
 * Affects character's x & y velocity and probably more things later on.
 *
 */
var InputComponent = /** @class */ (function () {
    function InputComponent(componentOwner) {
        var _this = this;
        // private WALK_ACCELERATION = 1
        // private RUN_ACCELERATION = 2
        this.MOVE_ACCELERATION = 1;
        this.moveLeft = function () {
            _this.componentOwner.velocityX -= _this.MOVE_ACCELERATION;
        };
        this.moveRight = function () {
            _this.componentOwner.velocityX += _this.MOVE_ACCELERATION;
        };
        this.componentOwner = componentOwner;
    }
    return InputComponent;
}());
exports["default"] = InputComponent;
