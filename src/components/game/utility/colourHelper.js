"use strict";
exports.__esModule = true;
var ColourHelper = /** @class */ (function () {
    function ColourHelper() {
    }
    ColourHelper.hexToRgb = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };
    ColourHelper.createImageData = function (height, width, hex, context) {
        var rgb = ColourHelper.hexToRgb(hex);
        var imageData = context.createImageData(height, width);
        imageData.data[0] = rgb.r;
        imageData.data[1] = rgb.g;
        imageData.data[2] = rgb.b;
        imageData.data[3] = 255;
        return imageData;
    };
    return ColourHelper;
}());
exports["default"] = ColourHelper;
