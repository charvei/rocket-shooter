import Character from "../../world/objects/character/Character"

class Commands {
    static makeMoveUnitCommand = (character: Character, direction: String): 
            (delta: number) => void => {
        return (delta: number) => {
            /*if (direction == "Up") {
                character.incrementYPos(-.5 * delta)
            }*/ 
            if (direction == "Down") {
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

    static makeJetPackCommand = (character: Character): (delta: number) => void => {
        return (delta: number) => {
            character.input.jetPack(delta)
        }
    }

    static makeProjectileCommand = (character: Character): (delta: number) => void => {
        return (delta: number) => {
            character.input.makeProjectile(delta)
        }
    }
}

export default Commands