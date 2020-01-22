"use strict";
exports.__esModule = true;
//Should change this into a RenderingManager class. This guy can hold the gameGrid and manage passing data between
var Renderer = /** @class */ (function () {
    function Renderer(context, canvasProps, gameGrid, colours) {
        var _this = this;
        // Maybe when this gets more complicated this can be made more intelligent?
        this.drawWorld = function (characterList, objectList) {
            //background
            _this.context.fillStyle = "#000000";
            _this.context.fillRect(0, 0, _this.canvasProps.width, _this.canvasProps.height);
            //objects
            _this.drawObjects(objectList);
            //characters
            _this.drawCharacters(characterList);
        };
        this.testDraw = function () {
            _this.context.fillStyle = "#000000";
            _this.context.fillRect(0, 0, _this.canvasProps.height, _this.canvasProps.width);
        };
        this.drawPixels = function () {
            for (var x = 0; x < _this.canvasProps.width; x++) {
                for (var y = 0; y < _this.canvasProps.height; y++) {
                    try {
                        _this.context.putImageData(_this.gameGrid.getCoord(x, y).getImageData(), x, y);
                    }
                    catch (error) {
                        throw error;
                    }
                }
            }
        };
        // So at some point may want to consider having multiple canvas or something right? buffer screens and stuff
        this.drawCharacters = function (characterList) {
            characterList.forEach(function (character) {
                _this.context.fillStyle = "#0000ff";
                _this.context.fillRect(character.getPosition().x, character.getPosition().y, character.getWidth(), character.getHeight());
            });
        };
        this.drawObjects = function (objectList) {
            objectList.forEach(function (object) {
                _this.context.fillStyle = "#ffffff";
                _this.context.fillRect(object.getPosition().x, object.getPosition().y, object.getWidth(), object.getHeight());
            });
        };
        this.context = context;
        this.canvasProps = canvasProps;
        this.gameGrid = gameGrid;
        this.colours = colours;
    }
    return Renderer;
}());
exports["default"] = Renderer;
