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
            if (direction == "Up") {
                character.incrementYPos(-.5 * delta);
            }
            if (direction == "Down") {
                character.incrementYPos(.5 * delta);
            }
            if (direction == "Left") {
                character.input.moveLeft();
            }
            if (direction == "Right") {
                character.input.moveRight();
            }
        };
    };
    Commands.makeJumpCommand = function (character) {
        return function (delta) {
            character.input.jump();
        };
    };
    return Commands;
}());
exports["default"] = Commands;
