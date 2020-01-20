"use strict";
exports.__esModule = true;
/**
 * Physics component
 */
var PhysicsComponent = /** @class */ (function () {
    function PhysicsComponent(componentOwner) {
        var _this = this;
        // setPosition = ({position}: {position: { x: number, y: number }}): void => {
        //     this.componentOwner.position = position
        // }
        this.incrementXPos = function (increment) {
            var newPosition = {
                position: {
                    x: _this.componentOwner.getPosition().x + increment,
                    y: _this.componentOwner.getPosition().y
                }
            };
            _this.componentOwner.setPosition(newPosition);
        };
        this.incrementYPos = function (increment) {
            var newPosition = {
                position: {
                    x: _this.componentOwner.getPosition().x,
                    y: _this.componentOwner.getPosition().y + increment
                }
            };
            _this.componentOwner.setPosition(newPosition);
        };
        this.update = function () {
            if (Math.abs(_this.componentOwner.velocityX) > 0) {
                _this.incrementXPos(_this.componentOwner.velocityX);
            }
            if (Math.abs(_this.componentOwner.velocityY) > 0) {
                _this.incrementYPos(_this.componentOwner.velocityY);
            }
            _this.applyFriction();
            _this.applyGravity();
            // CALL WORLD'S COLLISION CHECK HERE.
        };
        this.applyFriction = function () {
            _this.componentOwner.velocityX = _this.componentOwner.velocityX * 0.9;
        };
        this.applyGravity = function () {
            //this.componentOwner.velocityY += 0.1
            _this.componentOwner.velocityY = _this.componentOwner.velocityY * 0.9; // Using friction instead of gravity to test collision
        };
        this.componentOwner = componentOwner;
    }
    return PhysicsComponent;
}());
exports["default"] = PhysicsComponent;
