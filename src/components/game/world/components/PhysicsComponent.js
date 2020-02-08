"use strict";
exports.__esModule = true;
/**
 * Physics component
 */
var PhysicsComponent = /** @class */ (function () {
    function PhysicsComponent(componentOwner) {
        var _this = this;
        this.touchingState = {
            top: false,
            bottom: false,
            left: false,
            right: false
        };
        this.previousCollisions = [];
        this.touchingObjects = [];
        /**
         * Runs once per tick
         */
        this.update = function (worldManager) {
            _this.applyFriction();
            _this.applyGravity();
            _this.updateTouches(worldManager);
            _this.resolveTouches();
            var collisions = worldManager.getCollisions(_this.componentOwner);
            collisions.forEach(function (collision, index) {
                _this.resolveCollisions(collision, _this.previousCollisions[index]); // may create issues if these indices get out of sync
            });
            _this.updateTouches(worldManager);
            _this.resolveTouches();
            _this.updateMovement();
            _this.previousCollisions = collisions;
        };
        this.getFreshTouchingState = function () {
            return {
                top: false,
                bottom: false,
                left: false,
                right: false
            };
        };
        this.updateMovement = function () {
            if (Math.abs(_this.componentOwner.velocityX) > 0) {
                _this.incrementXPos(_this.componentOwner.velocityX);
            }
            if (Math.abs(_this.componentOwner.velocityY) > 0) {
                _this.incrementYPos(_this.componentOwner.velocityY);
            }
        };
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
        this.addTouchingObject = function (object) {
            if (!_this.touchingObjects.includes(object)) {
                _this.touchingObjects.push(object);
            }
        };
        //TODO: think about what will happen with multiple touching relationships (i.e. address what to return and how to deal with it appropriately)
        this.updateTouches = function (worldManager) {
            _this.touchingState = _this.getFreshTouchingState();
            var touchingIndexRemovalQueue = [];
            _this.touchingObjects.forEach(function (object, index) {
                var collision = worldManager.getCollisionVectors(_this.componentOwner.getBoxCoords(), object.getBoxCoords());
                var touch = worldManager.getTouchRelationship(_this.componentOwner, object);
                if (!touch.didCollide) { //rename didCollide to something more general
                    touchingIndexRemovalQueue.push(index);
                    return;
                }
                _this.setTouchingState(collision, touch.vectors);
            });
            touchingIndexRemovalQueue.forEach(function (objectToRemoveIndex) {
                _this.touchingObjects.splice(objectToRemoveIndex, 1);
                //probably should remove it in reverse order to account for changing index?
            });
        };
        this.setTouchingState = function (collision, touch) {
            if (collision.bottom == 0 && touch.bottom != 0) {
                _this.touchingState.bottom = true;
            }
            if (collision.top == 0 && touch.top != 0) {
                _this.touchingState.top = true;
            }
            if (collision.left == 0 && touch.left != 0) {
                _this.touchingState.left = true;
            }
            if (collision.right == 0 && touch.right != 0) {
                _this.touchingState.right = true;
            }
        };
        /**
         * Prevent velocity change if grinding against another object
         */
        this.resolveTouches = function () {
            if (_this.touchingState.bottom == true && _this.componentOwner.velocityY > 0) {
                _this.componentOwner.velocityY = 0;
            }
            if (_this.touchingState.top == true && _this.componentOwner.velocityY < 0) {
                _this.componentOwner.velocityY = 0;
            }
            if (_this.touchingState.right == true && _this.componentOwner.velocityX > 0) {
                _this.componentOwner.velocityX = 0;
            }
            if (_this.touchingState.left == true && _this.componentOwner.velocityX < 0) {
                _this.componentOwner.velocityX = 0;
            }
        };
        this.resolveCollisions = function (collisions, prevCollisions) {
            if (!collisions.didCollide) {
                return;
            }
            if (collisions.vectors.bottom != 0 && prevCollisions.vectors.bottom == 0) {
                _this.incrementYPos(_this.componentOwner.velocityY - collisions.vectors.bottom);
                _this.componentOwner.velocityY = 0;
            }
            if (collisions.vectors.top != 0 && prevCollisions.vectors.top == 0) {
                _this.incrementYPos(_this.componentOwner.velocityY - collisions.vectors.top);
                _this.componentOwner.velocityY = 0;
            }
            if (collisions.vectors.left != 0 && prevCollisions.vectors.left == 0) {
                _this.incrementXPos(_this.componentOwner.velocityX - collisions.vectors.left);
                _this.componentOwner.velocityX = 0;
            }
            if (collisions.vectors.right != 0 && prevCollisions.vectors.right == 0) {
                _this.incrementXPos(_this.componentOwner.velocityX - collisions.vectors.right);
                _this.componentOwner.velocityX = 0;
            }
        };
        this.applyFriction = function () {
            _this.componentOwner.velocityX = _this.componentOwner.velocityX * 0.9;
        };
        this.applyGravity = function () {
            _this.componentOwner.velocityY += 0.2;
            //this.componentOwner.velocityY = this.componentOwner.velocityY * 0.9 // Use friction instead of gravity to test collision
        };
        this.isTouching = function (direction) {
            return _this.touchingState[direction];
        };
        this.componentOwner = componentOwner;
    }
    return PhysicsComponent;
}());
exports["default"] = PhysicsComponent;
