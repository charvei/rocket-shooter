"use strict";
exports.__esModule = true;
var Colour = /** @class */ (function () {
    function Colour(name, code, imageData) {
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
        this.getImageData = function () {
            return _this.imageData;
        };
        this.name = name;
        this.code = code;
        this.imageData = imageData;
    }
    Colour.prototype.constructImageData = function () {
        this.code;
    };
    return Colour;
}());
exports["default"] = Colour;
