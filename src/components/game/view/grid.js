"use strict";
exports.__esModule = true;
var GameGrid = /** @class */ (function () {
    function GameGrid(canvasProps, colours) {
        var _this = this;
        this.initialiseGrid = function (height, width) {
            var grid = new Array();
            for (var i = 0; i < height; i++) {
                var row = new Array(width).fill(_this.colours.getColour("black"));
                grid.push(row);
            }
            return grid;
        };
        this.getGrid = function () {
            return _this.grid;
        };
        this.getCoord = function (x, y) {
            return _this.grid[y][x];
        };
        this.canvasProps = canvasProps;
        this.colours = colours;
        this.grid = this.initialiseGrid(this.canvasProps.height, this.canvasProps.width);
    }
    return GameGrid;
}());
exports["default"] = GameGrid;
//Probably want a list of objects in the world, and then just draw the objects
