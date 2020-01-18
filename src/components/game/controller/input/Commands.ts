import Character from "../../world/character"

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
                character.incrementYPos(.5 * delta)
            
            } if (direction == "Left") {
                character.input.moveLeft()
                console.log(character.velocityX)
            } if (direction == "Right") {
                character.input.moveRight()
                console.log(character.velocityX)
            }
        }
    }
}

export default Commands