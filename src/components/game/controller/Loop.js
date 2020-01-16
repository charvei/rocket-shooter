"use strict";
exports.__esModule = true;
/**
 * Game loop class
 *
 * Written largely from: https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
 */
var Loop = /** @class */ (function () {
    function Loop(update, draw) {
        var _this = this;
        this.delta = 0;
        this.lastFrameTimeMs = 0;
        this.timestep = 1000 / 60; // timeSimulatedPerFrame
        this.fps = 60;
        this.framesThisSecond = 0;
        this.lastFpsUpdate = 0;
        this.fpsDecayWeight = 0.25;
        this.fpsDisplay = document.getElementById("fps-display");
        this.start = function (timestamp) {
            // Track Fps
            if (timestamp > _this.lastFpsUpdate + 1000) {
                _this.fps = _this.fpsDecayWeight * _this.framesThisSecond + (1 - _this.fpsDecayWeight) * _this.fps;
                _this.lastFpsUpdate = timestamp;
                _this.framesThisSecond = 0;
            }
            _this.framesThisSecond++;
            // Track accumulated time that hasn't been spent yet
            _this.delta += timestamp - _this.lastFrameTimeMs;
            _this.lastFrameTimeMs = timestamp;
            // Update word for every timestep that comprises delta time
            var numberOfSequentialUpdates = 0;
            while (_this.delta >= _this.timestep) {
                _this.update(_this.timestep);
                _this.delta -= _this.timestep;
                if (++numberOfSequentialUpdates >= 240) { // detect spiral of death
                    _this.panic(); // fix things
                    break; // break out
                }
            }
            _this.draw();
            _this.fpsDisplay.textContent = Math.round(_this.fps) + ' FPS';
            window.requestAnimationFrame(_this.start);
        };
        this.run = function () {
        };
        this.stop = function () {
        };
        this.panic = function () {
            console.log("<PANIC>");
            _this.stop();
        };
        this.update = update;
        this.draw = draw;
    }
    return Loop;
}());
exports["default"] = Loop;
/* when loop is done:
    - work on user input / movement
    - then rendering (using canvas's efficiently) and timing of drawing etc
*/ 
