export type BoxCoords = {
    top: number,
    bottom: number,
    left: number,
    right: number
}

export type ObjectParams = {
    name: string, 
    code: string, 
    height: number, 
    width: number,
    colour: string,
    position: {x: number, y: number}
}

export type EntityParams = {
    name: string, 
    code: string, 
    height: number, 
    width: number,
    colour: string,
    position: {x: number, y: number}
}

export type CollisionVectors = {
    top: number,
    bottom: number,
    left: number,
    right: number
}

export type CollisionResult = {
    didCollide: boolean,
    vectors: CollisionVectors
}

export type Particle = {
    colour: string,
    width: number,
    height: number,
    xPos: number,
    yPos: number,
    xDirection: number,
    xSpeed: number,
    ySpeed: number,
    opacity: number
}

export type Renderable = {
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    colour: string
}

// export type TouchingState = {
//     top: boolean,
//     bottom: boolean,
//     left: boolean,
//     right: boolean
// }

export type TouchingState = {
    [key: string]: boolean
}

/** CONTROLLER TYPES */
export type updateFunc = (delta: number) => void

export type drawFunc = () => void

export type KeyPressEvent = {
    heldDown: boolean,
    firstPress: boolean
}