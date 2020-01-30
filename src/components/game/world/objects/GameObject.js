"use strict";
exports.__esModule = true;
/**
 * Object in the game. Base class that more specific objects will inherit from.
 */
var GameObject = /** @class */ (function () {
    function GameObject(name, code, height, width, position) {
        var _this = this;
        this.update = function (worldManager) {
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
        this.getBoxCoords = function (xAdjustment, yAdjustment) {
            if (xAdjustment === void 0) { xAdjustment = 0; }
            if (yAdjustment === void 0) { yAdjustment = 0; }
            return {
                top: _this.getPosition().y + yAdjustment,
                bottom: _this.getPosition().y + _this.getHeight() + yAdjustment,
                left: _this.getPosition().x + xAdjustment,
                right: _this.getPosition().x + _this.getWidth() + xAdjustment
            };
        };
        this.name = name;
        this.code = code;
        this.height = height;
        this.width = width;
        this.position = position;
    }
    return GameObject;
}());
exports["default"] = GameObject;
