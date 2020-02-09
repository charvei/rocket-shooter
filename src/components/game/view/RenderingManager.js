"use strict";
exports.__esModule = true;
var renderer_js_1 = require("./renderer.js");
var colours_js_1 = require("../world/colours.js");
var RenderingManager = /** @class */ (function () {
    function RenderingManager(context, canvasProps) {
        var _this = this;
        this.getRenderer = function () {
            return _this.renderer;
        };
        //load grid and colours
        this.colours = new colours_js_1["default"](context);
        // colours and gamegrid need to be passed to renderer... is this a sign that i need to refactor renderer?
        this.renderer = new renderer_js_1["default"](context, canvasProps, this.colours);
    }
    return RenderingManager;
}());
exports["default"] = RenderingManager;
