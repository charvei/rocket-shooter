import Colour from "../world/colour"
import Colours from "../world/colours"

class GameGrid {
    canvasProps: {
        height: number,
        width: number
    }
    grid: Colour[][]
    colours: Colours

    constructor(canvasProps: {height: number, width: number}, colours: Colours) {
        this.canvasProps = canvasProps
        this.colours = colours
        this.grid = this.initialiseGrid(this.canvasProps.height, this.canvasProps.width)
    }

    initialiseGrid = (height:number, width:number): Colour[][] => {
        let grid: Colour[][] = new Array<Colour[]>()
        for (let i:number = 0; i < height; i++) {
            let row: Colour[] = new Array<Colour>(width).fill(this.colours.getColour("black"))
            grid.push(row)
        }
        return grid
    }

    getGrid = (): Colour[][] => {
        return this.grid
    }

    getCoord = (x: number, y: number): Colour => {
        return this.grid[y][x]
    }
}

export default GameGrid


//Probably want a list of objects in the world, and then just draw the objects