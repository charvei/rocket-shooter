"use strict";
exports.__esModule = true;
var grid_js_1 = require("./grid.js");
var renderer_js_1 = require("./renderer.js");
var colours_js_1 = require("../world/colours.js");
//Should change this into a RenderingManager class. This guy can hold the gameGrid and manage passing data between
var RenderingManager = /** @class */ (function () {
    function RenderingManager(context, canvasProps) {
        var _this = this;
        this.getRenderer = function () {
            return _this.renderer;
        };
        //load grid and colours
        this.colours = new colours_js_1["default"](context);
        this.gameGrid = new grid_js_1["default"](canvasProps, this.colours);
        // colours and gamegrid need to be passed to renderer... is this a sign that i need to refactor renderer?
        this.renderer = new renderer_js_1["default"](context, canvasProps, this.gameGrid, this.colours);
    }
    return RenderingManager;
}());
exports["default"] = RenderingManager;
