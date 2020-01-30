"use strict";
exports.__esModule = true;
/**
 * Physics component
 */
var PhysicsComponent = /** @class */ (function () {
    function PhysicsComponent(componentOwner) {
        var _this = this;
        this.touchingObjects = [];
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
            if (!_this.landed) {
                _this.applyGravity();
            }
            var collisions = worldManager.getCollisions(_this.componentOwner);
            _this.resolveCollisions(collisions, _this.previousCollisions);
            _this.resolveTouchingRelationships(worldManager);
            //this.resolveCollision(collisions)
            //this.resolveCollisions(collisions)
            //this.hasLanded(collisions)
            _this.updateMovement();
            _this.previousCollisions = collisions;
            // this.setPrevPosition()
        };
        this.addTouchingObject = function (object) {
            if (!_this.touchingObjects.includes(object)) {
                _this.touchingObjects.push(object);
            }
        };
        this.resolveTouchingRelationships = function (worldManager) {
            _this.touchingObjects.forEach(function (object) {
                var objectIndex = _this.touchingObjects.indexOf(object);
                var collisioning = worldManager.getCollisionVectors(_this.componentOwner.getBoxCoords(), object.getBoxCoords());
                var touchRelationship = worldManager.getTouchRelationship(_this.componentOwner, object);
                if (!touchRelationship.didCollide) {
                    _this.landed = false;
                    console.log("in air");
                    if (objectIndex >= 0) {
                        _this.touchingObjects.splice(objectIndex, 1);
                    }
                    return;
                }
                if (collisioning.bottom == 0 && touchRelationship.vectors.bottom != 0) {
                    _this.landed = true;
                    console.log("landed");
                    return;
                }
                // let collisioning: CollisionVectors = worldManager.getCollisionVectors(this.componentOwner.getBoxCoords(), object.getBoxCoords())
                // let touching: CollisionVectors = worldManager.getCollisionVectors(this.componentOwner.getBoxCoords(1,1), object.getBoxCoords())
                // //HOL UP -- maybe i can just do a did collide check. 
                // if (collisioning.bottom == 0 && touching.bottom != 0) {
                //     this.landed = true
                // } else {
                //     this.landed = false
                // }
                // console.log(collisioning.bottom)
                // console.log(touching.bottom)
            });
            return;
        };
        // private getTouchingRelationship = (object: GameObject) => {
        //     this.componentOwner.getBoxCoords(1, 1)
        //     //worldManager.getBoxCoords
        //     //touching
        //     //touching angle
        // }
        this.updateMovement = function () {
            if (Math.abs(_this.componentOwner.velocityX) > 0) {
                _this.incrementXPos(_this.componentOwner.velocityX);
            }
            if (Math.abs(_this.componentOwner.velocityY) > 0) {
                _this.incrementYPos(_this.componentOwner.velocityY);
            }
        };
        this.resolveCollisions = function (collisions, prevCollisions) {
            console.log(collisions.didCollide);
            if (!collisions.didCollide) {
                return;
            }
            if (collisions.vectors.bottom != 0 && prevCollisions.vectors.bottom == 0) {
                _this.incrementYPos(_this.componentOwner.velocityY - collisions.vectors.bottom);
                _this.componentOwner.velocityY = 0;
                _this.landed = true;
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
            // collisionAngles.forEach(angle => {
            // })
        };
        /** Very verbose */
        /*
        private resolveCollision = (collisionVectors: CollisionVectors): void => {
            
            if (((Math.abs(collisionVectors.top) > 0) && (Math.abs(collisionVectors.bottom) > 0)) ||
                    ((Math.abs(collisionVectors.left) > 0) && (Math.abs(collisionVectors.right) ) > 0)) {
    
                if ((Math.abs(collisionVectors.top) > 0) && (Math.abs(collisionVectors.bottom) > 0)) {
                    // in between top and bottom > kill velocity x
                    this.incrementXPos(this.max(collisionVectors.left, collisionVectors.right) * -1)
                    this.componentOwner.velocityX = 0
                    
                }
    
                if ((Math.abs(collisionVectors.left) > 0) && (Math.abs(collisionVectors.right) ) > 0) {
                    // in between left and right > kill velocity y
                    this.incrementYPos(((this.max(collisionVectors.top, collisionVectors.bottom) - this.componentOwner.velocityY) * -1))
                    console.log(collisionVectors.bottom)
                    this.componentOwner.velocityY = 0
                    console.log("bop")cv
                }
    
            } else if (((Math.abs(collisionVectors.left) > 0) || (Math.abs(collisionVectors.right) > 0))
                    && ((Math.abs(collisionVectors.top) > 0) || (Math.abs(collisionVectors.bottom) > 0))) {
                
                if ((Math.abs(collisionVectors.left) > 0) && (Math.abs(collisionVectors.bottom) > 0)) {
                    // bottom left of subject is hitting top right
                    if (Math.abs(collisionVectors.bottom) < Math.abs(collisionVectors.left)) {
                        this.incrementYPos(-collisionVectors.bottom)
                        this.componentOwner.velocityY = 0
                    } else {
                        this.incrementXPos(-collisionVectors.left)
                        this.componentOwner.velocityX = 0
                    }
                }
    
                if ((Math.abs(collisionVectors.right) > 0) && (Math.abs(collisionVectors.bottom) > 0)) {
                    // bottom right of subject is hitting top right
                    if (Math.abs(collisionVectors.bottom) < Math.abs(collisionVectors.right)) {
                        this.incrementYPos(-collisionVectors.bottom)
                        this.componentOwner.velocityY = 0
                    } else {
                        this.incrementXPos(-collisionVectors.right)
                        this.componentOwner.velocityX = 0
                    }
                }
    
                if ((Math.abs(collisionVectors.left) > 0) && (Math.abs(collisionVectors.top) > 0)) {
                    // top left of subject is hitting top right
                    if (Math.abs(collisionVectors.top) < Math.abs(collisionVectors.left)) {
                        this.incrementYPos(-collisionVectors.top)
                        this.componentOwner.velocityY = 0
                    } else {
                        this.incrementXPos(-collisionVectors.left)
                        this.componentOwner.velocityX = 0
                    }
                }
    
                if ((Math.abs(collisionVectors.right) > 0) && (Math.abs(collisionVectors.top) > 0)) {
                    // top right of subject is hitting top right
                    if (Math.abs(collisionVectors.top) < Math.abs(collisionVectors.right)) {
                        this.incrementYPos(-collisionVectors.top)
                        this.componentOwner.velocityY = 0
                    } else {
                        this.incrementXPos(-collisionVectors.right)
                        this.componentOwner.velocityX = 0
                    }
                }
           // }
            } else {
                console.log("in air - no touching")
            }
        }
    
        */
        this.hasLanded = function (collisionVectors) {
            //collisionVectors.
        };
        this.setPrevPosition = function () {
            _this.componentOwner.prevPosition = _this.componentOwner.position;
        };
        this.applyFriction = function () {
            _this.componentOwner.velocityX = _this.componentOwner.velocityX * 0.9;
        };
        this.applyGravity = function () {
            _this.componentOwner.velocityY += 0.1;
            //this.componentOwner.velocityY = this.componentOwner.velocityY * 0.9 // Using friction instead of gravity to test collision
        };
        this.stopGravity = function () {
        };
        this.max = function (first, second) {
            if (Math.abs(first) > Math.abs(second)) {
                return first;
            }
            else {
                return second;
            }
        };
        this.componentOwner = componentOwner;
    }
    return PhysicsComponent;
}());
exports["default"] = PhysicsComponent;
