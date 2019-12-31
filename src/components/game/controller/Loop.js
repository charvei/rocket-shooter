"use strict";
exports.__esModule = true;
var Loop = /** @class */ (function () {
    function Loop(loopCode) {
        var _this = this;
        this.run = function () {
        };
        this.stop = function () {
        };
        this.start = function (timestamp /** not sure if this is the correct type// loopCode: LoopCode */) {
            var progress = timestamp - _this.lastRender;
            //update
            //draw
            _this.loopCode();
            console.log(timestamp);
            /*loopCode
                - calculate effects
                - calculate background
                - calculate character movement etc
                - each in different canvas's?
            */
            _this.lastRender = timestamp;
            window.requestAnimationFrame(_this.start);
        };
        this.loopCode = loopCode;
    }
    return Loop;
}());
exports["default"] = Loop;
/* when loop is done:
    - work on user input / movement
    - then rendering (using canvas's efficiently) and timing of drawing etc
*/ 
