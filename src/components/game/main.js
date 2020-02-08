"use strict";
exports.__esModule = true;
var WorldManager_1 = require("./world/WorldManager");
var RenderingManager_js_1 = require("./view/RenderingManager.js");
var ControllerManager_js_1 = require("./controller/ControllerManager.js");
var context;
var worldManager;
var renderingManager;
var controllerManager;
var canvas;
var width = 800;
var height = 480;
var main = function () {
    loadStuff();
    doStuff();
};
exports.main = main;
var loadStuff = function () {
    loadCanvas();
    loadWorld();
    loadRendering();
    loadController();
};
var doStuff = function () {
    controllerManager.getLoop().start(0); // could potentially load the code inline here
};
var loadCanvas = function () {
    var tempCanvas = document.getElementById('game-canvas');
    canvas = {
        element: tempCanvas,
        props: {
            height: tempCanvas.height,
            width: tempCanvas.width
        }
    };
    context = getContext(canvas.element);
};
var loadWorld = function () {
    worldManager = new WorldManager_1["default"](context);
};
var loadRendering = function () {
    renderingManager = new RenderingManager_js_1["default"](context, canvas.props);
};
var loadController = function () {
    controllerManager = new ControllerManager_js_1["default"](worldManager, renderingManager);
};
var getContext = function (canvas) {
    if (canvas.getContext) {
        console.log("Successfully got context");
        return canvas.getContext('2d');
    }
    else {
        console.log("Failed to get context");
    }
};
