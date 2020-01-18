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
                console.log(character.velocityX);
            }
            if (direction == "Right") {
                character.input.moveRight();
                console.log(character.velocityX);
            }
        };
    };
    return Commands;
}());
exports["default"] = Commands;
