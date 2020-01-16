"use strict";
exports.__esModule = true;
var Loop_js_1 = require("./Loop.js");
var InputHandler_js_1 = require("./InputHandler.js");
/**
 * Store controller managers
 */
var ControllerManager = /** @class */ (function () {
    function ControllerManager(worldManager, renderingManager) {
        var _this = this;
        this.getLoop = function () {
            return _this.loop;
        };
        this.update = function (delta) {
            _this.worldManager.updateWorld(delta);
        };
        this.draw = function () {
            _this.renderingManager.getRenderer().drawWorld(_this.worldManager.getCharacterManager().getCharacterStoreAsArray());
        };
        this.startLooping = function () {
            window.requestAnimationFrame(_this.getLoop().start);
        };
        this.worldManager = worldManager;
        this.renderingManager = renderingManager;
        this.inputHandler = new InputHandler_js_1["default"]();
        this.loop = new Loop_js_1["default"](this.update, this.draw);
    }
    return ControllerManager;
}());
exports["default"] = ControllerManager;
