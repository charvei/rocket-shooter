"use strict";
exports.__esModule = true;
var Loop_js_1 = require("./Loop.js");
/**
 * Store controller managers
 */
var ControllerManager = /** @class */ (function () {
    function ControllerManager(loopCode) {
        var _this = this;
        this.getLoop = function () {
            return _this.loop;
        };
        this.startLooping = function () {
            window.requestAnimationFrame(_this.getLoop().start);
        };
        this.loop = new Loop_js_1["default"](loopCode);
    }
    return ControllerManager;
}());
exports["default"] = ControllerManager;
