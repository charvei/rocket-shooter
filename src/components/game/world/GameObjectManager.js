"use strict";
exports.__esModule = true;
var Platform_1 = require("./objects/Platform");
/**
 * Store characters and manages access to and manipulation of character resources
 */
var GameObjectManager = /** @class */ (function () {
    function GameObjectManager() {
        var _this = this;
        this.addGameObject = function (object) {
            _this.objectStore.set(object.getName(), object);
        };
        // make a class that has ALL REFERENCES to all objects than rather having to use in class constructor a param for colour, and grid and shit.
        this.getGameObject = function (objectName) {
            return _this.objectStore.get(objectName);
        };
        this.removeGameObject = function (objectName) {
            _this.removeObjectFromStore(objectName);
            // do error handling here
        };
        // createAndAddGameObjectToStore = (objectName: string, height: number, width: number, position: { x: number, y: number }) => {
        //     this.objectStore.set(
        //         objectName, 
        //         new GameObject(objectName, "x", height, width, position)
        //     )
        // }
        this.removeObjectFromStore = function (objectName) {
            _this.objectStore["delete"](objectName);
        };
        this.getObjectByName = function (name) {
            return _this.objectStore.get(name);
        };
        // Set of information about how to render characters // maybe this is just characterStore?
        // getCharacterRenderSet = () => {
        // }
        this.getObjectStoreAsArray = function () {
            var objectList = Array.from(_this.objectStore.values());
            return objectList;
        };
        //TEMPORARY: FOR TESTING LOOP.
        //THIS MIGHT FIT UNDER A BROADER UPDATE OR TICK() FUNCTION FOR A CHARACTER. I.E. WHERE IT CHECKS IF ITS IN SOMETHINGS WAY, IF IT NEEDS TO MOVE POS ETC?
        this.updateCharacters = function (delta) {
            _this.getObjectStoreAsArray().forEach(function (object) {
                object.update();
            });
        };
        this.objectStore = new Map();
        var testPlatform = new Platform_1["default"]("test", "1", 100, 100, { x: 300, y: 150 });
        this.addGameObject(testPlatform);
    }
    return GameObjectManager;
}());
exports["default"] = GameObjectManager;
