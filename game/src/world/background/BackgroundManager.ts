import { Renderable } from "../../Types"
import SnowBackground from "./SnowBackground"

class BackgroundManager {
    private activeBackground: SnowBackground
    private backgroundContext: CanvasRenderingContext2D
    //private canvasProps: {height: number, width: number}

    constructor(backgroundContext: CanvasRenderingContext2D, canvasProps: {height: number, width: number}) {
        this.backgroundContext = backgroundContext
        this.activeBackground = new SnowBackground(backgroundContext, canvasProps)
    }

    public getBackgroundContext = (): CanvasRenderingContext2D => {
        return this.backgroundContext
    }

    public getActiveBackground = (): SnowBackground => {
        return this.activeBackground
    }

    public getActiveBackgroundRenderables = (): Renderable[] => {
        return this.activeBackground.getRenderables()
    }

    public setBackground = (backgroundContext: CanvasRenderingContext2D, canvasProps: {height: number, width: number}): void => {
        this.activeBackground = new SnowBackground(backgroundContext, canvasProps)
    }

    public updateBackground = (delta: number): void => {
        this.activeBackground.update(delta)
    }

}

export default BackgroundManager