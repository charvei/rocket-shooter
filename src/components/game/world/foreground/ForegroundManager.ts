import RainForeground from "./RainForeground"

class ForegroundManager {
    private activeForeground: RainForeground
    private foregroundContext: CanvasRenderingContext2D
    private canvasProps: {height: number, width: number}

    constructor(foregroundContext: CanvasRenderingContext2D, canvasProps: {height: number, width: number}) {
        this.setForeground(foregroundContext, canvasProps)
    }

    public getActiveForeground = (): RainForeground => {
        return this.activeForeground
    }

    public setForeground = (foregroundContext: CanvasRenderingContext2D, canvasProps: {height: number, width: number}): void => {
        this.activeForeground = new RainForeground(foregroundContext, canvasProps)
    }

    public updateForeground = (delta: number): void => {
        this.activeForeground.update(delta)
    }



}

export default ForegroundManager