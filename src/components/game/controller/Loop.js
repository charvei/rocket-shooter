"use strict";
/**
 * Store controller managers
 */
exports.__esModule = true;
var Loop = /** @class */ (function () {
    function Loop(update, draw) {
        var _this = this;
        this.delta = 0;
        this.lastFrameTimeMs = 0;
        this.timestep = 1000 / 59; // timeSimulatedPerFrame
        this.run = function () {
        };
        this.stop = function () {
        };
        this.start = function (timestamp) {
            // Track accumulated time that hasn't been spent yet
            _this.delta += timestamp - _this.lastFrameTimeMs;
            _this.lastFrameTimeMs = timestamp;
            while (_this.delta >= _this.timestep) {
                _this.update(_this.timestep);
                _this.delta -= _this.timestep;
            }
            console.log(_this.delta);
            _this.draw();
            window.requestAnimationFrame(_this.start);
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
