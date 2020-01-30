import Character from "../../world/Character"

class Commands {
    
    // static makeMoveUnitCommand = (character: Character) => {
    //     return () => {
    //         character.incrementXPos(10)
    //     }
    // }

    static makeMoveUnitCommand = (character: Character, direction: String): 
            (delta: number) => void => {
        return (delta: number) => {
            if (direction == "Up") {
                character.incrementYPos(-.5 * delta)
            } if (direction == "Down") {
                //character.incrementYPos(.5 * delta)
                character.input.down(delta)
            } if (direction == "Left") {
                character.input.moveLeft(delta)
            } if (direction == "Right") {
                character.input.moveRight(delta)
            }
        }
    }

    static makeJumpCommand = (character: Character): (delta: number) => void => {
        return (delta: number) => {
            character.input.jump(delta)
        }
    }
}

export default Commands