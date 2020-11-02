import Character from './world/objects/character/Character'
import Projectile from './world/objects/projectiles/Projectile'

export type BoxCoords = {
    top: number,
    bottom: number,
    left: number,
    right: number
}

export type BoxSides = {
    top: number,
    bottom: number,
    left: number,
    right: number
}

export type Corner = {
    x: number,
    y: number
}

export type Point = {
    x: number,
    y: number
}

export type BoxCorners = {
    topLeft: Corner,
    topRight: Corner,
    bottomLeft: Corner,
    bottomRight: Corner
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

/** Renderables */
export type Renderable = {
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    colour: string
}

export type GetRenderableFunc = (() => Renderable)

export type Position = {
    x: number,
    y: number
}

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

/** Unions */
export type PhysicsEntity = Character | Projectile


/** Enums */
export enum PositionState {
    Flying,
    Touching,
    Colliding,
    Landed
}

export enum GameState {
    Menu = "MENU",
    Game = "GAME",
    Pause = "PAUSE"
}