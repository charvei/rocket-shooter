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
                character.incrementXPos(-.5 * delta);
            }
            if (direction == "Right") {
                character.incrementXPos(.5 * delta);
            }
        };
    };
    return Commands;
}());
exports["default"] = Commands;
