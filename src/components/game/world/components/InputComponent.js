"use strict";
exports.__esModule = true;
/**
 * Input component. Stuff that inputs (player / AI) can use.
 *
 * Affects character's x & y velocity and probably more things later on.
 *
 */
var InputComponent = /** @class */ (function () {
    function InputComponent(componentOwner) {
        var _this = this;
        // private WALK_ACCELERATION = 1
        // private RUN_ACCELERATION = 2
        this.MOVE_ACCELERATION = 0.035;
        this.MAX_VELOCITY_X = 50;
        this.moveLeft = function (delta) {
            _this.limitVelocity(_this.componentOwner.velocityX -= _this.MOVE_ACCELERATION * delta);
        };
        this.moveRight = function (delta) {
            _this.limitVelocity(_this.componentOwner.velocityX += _this.MOVE_ACCELERATION * delta);
        };
        this.limitVelocity = function (calculatedVelocity) {
            if ((Math.abs(calculatedVelocity) > _this.MAX_VELOCITY_X)) {
                _this.componentOwner.velocityX = _this.MAX_VELOCITY_X * Math.sign(calculatedVelocity);
            }
        };
        this.jump = function (delta) {
            if (_this.componentOwner.physics.isTouching("bottom")) {
                _this.componentOwner.velocityY -= 0.12 * delta;
            }
            console.log("my isTouching(bot) result:" + _this.componentOwner.physics.isTouching("bottom"));
            //this.componentOwner.velocityY -= this.MOVE_ACCELERATION * delta
        };
        this.jetPack = function (delta) {
            if (!_this.componentOwner.physics.isTouching("bottom")) {
                console.log(delta);
                _this.componentOwner.velocityY -= 0.018 * delta;
            }
        };
        this.down = function (delta) {
            _this.componentOwner.velocityY += _this.MOVE_ACCELERATION * delta;
        };
        this.clearVelocityX = function () {
            _this.componentOwner.velocityX = 0;
        };
        this.clearVelocityY = function () {
            _this.componentOwner.velocityY = 0;
        };
        this.componentOwner = componentOwner;
    }
    return InputComponent;
}());
exports["default"] = InputComponent;
