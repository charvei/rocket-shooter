"use strict";
exports.__esModule = true;
var colour_1 = require("./colour");
var colourHelper_1 = require("../utility/colourHelper");
/**
 * THIS SHOULD GO TO 'VIEW' / RENDERER STUFF, OR MAYBE EVEN BE A STATIC CLASS?
 */
var Colours = /** @class */ (function () {
    function Colours(context) {
        var _this = this;
        this.loadColours = function () {
            _this.addColour(new colour_1["default"]("blue", "#0000ff", colourHelper_1["default"].createImageData(1, 1, "#0000ff", _this.context)));
            _this.addColour(new colour_1["default"]("black", "#000000", colourHelper_1["default"].createImageData(1, 1, "#000000", _this.context)));
        };
        this.addColour = function (colour) {
            _this.colourStore.set(colour.getName(), colour);
        };
        // make a class that has ALL REFERENCES to all objects than rather having to use in class constructor a param for colour, and grid and shit.
        this.getColour = function (colourName) {
            return _this.colourStore.get(colourName);
        };
        this.context = context;
        this.colourStore = new Map();
        // i think cause i'm trying to call stuff of THIS in THIS's constructor.
        this.loadColours();
    }
    return Colours;
}());
exports["default"] = Colours;
