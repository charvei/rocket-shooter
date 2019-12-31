"use strict";
exports.__esModule = true;
var Character = /** @class */ (function () {
    function Character(name, code, height, width, position) {
        var _this = this;
        this.getColor = function () {
            return _this;
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
        this.incrementXPos = function (increment) {
            var newPosition = {
                position: {
                    x: _this.getPosition().x + increment,
                    y: _this.getPosition().y
                }
            };
            _this.setPosition(newPosition);
        };
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
    }
    return Character;
}());
exports["default"] = Character;
