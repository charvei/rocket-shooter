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
                //character.incrementYPos(.5 * delta)
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
    return Commands;
}());
exports["default"] = Commands;
