"use strict";
exports.__esModule = true;
var Character_1 = require("./Character");
/**
 * Store characters and manage access and manipulation to character resources
 */
var CharacterManager = /** @class */ (function () {
    function CharacterManager() {
        var _this = this;
        //Remember we can create a destructor
        //We can also do other lifecycle functions
        this.addCharacter = function (character) {
            _this.characterStore.set(character.getName(), character);
        };
        // make a class that has ALL REFERENCES to all objects than rather having to use in class constructor a param for colour, and grid and shit.
        this.getCharacter = function (characterName) {
            return _this.characterStore.get(characterName);
        };
        this.removeCharacter = function (characterName) {
            _this.removeCharacterFromStore(characterName);
            // do error handling here
        };
        this.addCharacterToStore = function (characterName, height, width, position) {
            _this.characterStore.set(characterName, new Character_1["default"](characterName, "x", height, width, position));
        };
        this.removeCharacterFromStore = function (characterName) {
            _this.characterStore["delete"](characterName);
        };
        this.getCharacterByName = function (name) {
            return _this.characterStore.get(name);
        };
        // Set of information about how to render characters // maybe this is just characterStore?
        // getCharacterRenderSet = () => {
        // }
        this.getCharacterStoreAsArray = function () {
            var characterList = Array.from(_this.characterStore.values());
            return characterList;
        };
        //TEMPORARY: FOR TESTING LOOP.
        //THIS MIGHT FIT UNDER A BROADER UPDATE OR TICK() FUNCTION FOR A CHARACTER. I.E. WHERE IT CHECKS IF ITS IN SOMETHINGS WAY, IF IT NEEDS TO MOVE POS ETC?
        this.updateCharacters = function (delta, worldManager) {
            _this.getCharacterStoreAsArray().forEach(function (character) {
                character.update(worldManager);
            });
        };
        this.characterStore = new Map();
        //TESTING RENDERING:
        var characterPosition = {
            x: 320,
            y: 10
        };
        this.addCharacterToStore("Adam", 20, 20, characterPosition);
    }
    return CharacterManager;
}());
exports["default"] = CharacterManager;
