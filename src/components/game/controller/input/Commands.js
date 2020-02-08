"use strict";
exports.__esModule = true;
var Commands = /** @class */ (function () {
    function Commands() {
    }
    // static makeMoveUnitCommand = (character: Character) => {
    //     return () => {
    //         character.incrementXPos(10)
    //     }
    // }
    Commands.makeMoveUnitCommand = function (character, direction) {
        return function (delta) {
            /*if (direction == "Up") {
                character.incrementYPos(-.5 * delta)
            }*/
            if (direction == "Down") {
                character.input.down(delta);
            }
            if (direction == "Left") {
                character.input.moveLeft(delta);
            }
            if (direction == "Right") {
                character.input.moveRight(delta);
            }
        };
    };
    Commands.makeJumpCommand = function (character) {
        return function (delta) {
            character.input.jump(delta);
        };
    };
    Commands.makeJetPackCommand = function (character) {
        return function (delta) {
            character.input.jetPack(delta);
        };
    };
    return Commands;
}());
exports["default"] = Commands;
