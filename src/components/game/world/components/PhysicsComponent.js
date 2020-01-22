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
        this.update = function (worldManager) {
            _this.applyFriction();
            _this.applyGravity();
            var collision = worldManager.detectCollision();
            /**
             * once final velocity is calculated (friction / gravity applies)
             * calculate the future amount of x/y movement from velocity and
             * limit it according to how far away a colliding object is
             */
            // adjust velocity if we calculate that we're going to hit
            if (collision.axis == "x") {
                _this.componentOwner.velocityX = collision.distance;
            }
            if (collision.axis == "y") {
                //this.componentOwner.velocityY = collision.distance
                _this.componentOwner.velocityY = 0;
                _this.componentOwner.incrementYPos(-collision.distance);
                // TODO: implement this better (currently just a quick hack), don't forget to add x axis (figuring out how to do x which is missing the incrementypos function will give solution)
                // TODO: figure out why box is rendering inside box still, then getting kicked out
            }
            if (Math.abs(_this.componentOwner.velocityX) > 0) {
                _this.incrementXPos(_this.componentOwner.velocityX);
            }
            if (Math.abs(_this.componentOwner.velocityY) > 0) {
                console.log(_this.componentOwner.velocityY);
                _this.incrementYPos(_this.componentOwner.velocityY);
            }
            _this.setPrevPosition();
        };
        this.setPrevPosition = function () {
            _this.componentOwner.prevPosition = _this.componentOwner.position;
        };
        this.applyFriction = function () {
            _this.componentOwner.velocityX = _this.componentOwner.velocityX * 0.9;
        };
        this.applyGravity = function () {
            //this.componentOwner.velocityY += 0.1
            _this.componentOwner.velocityY = _this.componentOwner.velocityY * 0.9; // Using friction instead of gravity to test collision
        };
        this.componentOwner = componentOwner;
        // this.xCollisionFlag = false
        // this.yCollisionFlag = false
        // this.previousXCollisionFlag = false
        // this.previousYCollisionFlag = false
    }
    return PhysicsComponent;
}());
exports["default"] = PhysicsComponent;
