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
        this.getBoxCoords = function (topAdjustment, bottomAdjustment, leftAdjustment, rightAdjustment) {
            if (topAdjustment === void 0) { topAdjustment = 0; }
            if (bottomAdjustment === void 0) { bottomAdjustment = 0; }
            if (leftAdjustment === void 0) { leftAdjustment = 0; }
            if (rightAdjustment === void 0) { rightAdjustment = 0; }
            return {
                top: _this.getPosition().y + topAdjustment,
                bottom: _this.getPosition().y + _this.getHeight() + bottomAdjustment,
                left: _this.getPosition().x + leftAdjustment,
                right: _this.getPosition().x + _this.getWidth() + rightAdjustment
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
