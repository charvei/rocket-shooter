import Colour from "./colour"
import ColourHelper from "../utility/colourHelper"

/**
 * THIS SHOULD GO TO 'VIEW' / RENDERER STUFF, OR MAYBE EVEN BE A STATIC CLASS?
 */
class Colours {
    colourStore: Map<string, Colour>
    colour: Colour
    context: CanvasRenderingContext2D
    
    constructor(context: CanvasRenderingContext2D) {
        this.context = context  
        this.colourStore = new Map<string, Colour>()
        // i think cause i'm trying to call stuff of THIS in THIS's constructor.
        this.loadColours()
    }

    loadColours = () => {
        this.addColour(
            new Colour("blue", "#0000ff", ColourHelper.createImageData(1, 1, "#0000ff", this.context))
        )
        this.addColour(
            new Colour("black", "#000000", ColourHelper.createImageData(1, 1, "#000000", this.context))
        )
    }

    addColour = (colour: Colour) => { 
        this.colourStore.set(colour.getName(), colour)
    }

    // make a class that has ALL REFERENCES to all objects than rather having to use in class constructor a param for colour, and grid and shit.
    getColour = (colourName: string) => {
        return this.colourStore.get(colourName)
    }
}

export default Colours