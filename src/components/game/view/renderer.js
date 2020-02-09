"use strict";
exports.__esModule = true;
//Should change this into a RenderingManager class?
var Renderer = /** @class */ (function () {
    function Renderer(context, canvasProps, colours) {
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
        this.colours = colours;
    }
    return Renderer;
}());
exports["default"] = Renderer;
