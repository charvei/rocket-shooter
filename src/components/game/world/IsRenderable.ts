import { Renderable } from "../Types";

type GetRenderableFunc = (() => Renderable)

interface IsRenderable {
    getRenderable: GetRenderableFunc
    
    height: number
    width: number
    colour: string
    
    //position in world
    position: {
        x: number,
        y: number
    }
    
}

export default IsRenderable