import Character from "../../world/objects/character/Character"

class Commands {
    static makeMoveUnitCommand = (character: Character, direction: String): 
            (delta: number) => void => {
        return (delta: number): void => {
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
        return (delta: number): void => {
            character.input.jump(delta)
        }
    }

    static makeJetPackCommand = (character: Character): (delta: number) => void => {
        return (delta: number): void => {
            character.input.jetPack(delta)
        }
    }

    static makeShootCommand = (character: Character): (delta: number) => void => {
        return (delta: number): void => {
            character.input.makeProjectile(delta)
        }
    }
}

export default Commands