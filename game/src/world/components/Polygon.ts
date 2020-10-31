import { Point } from '../../Types'

class Polygon {
    corners: Point[]
    
    constructor(corners: Point[]) {
        try {
            this.validateCornerInput(corners)
            this.corners = corners
        } catch (error) {
            throw error
        }
        this.corners = corners

    }

    validateCornerInput = (corners: Point[]) => {
        if (corners.length < 3) {
            throw Error(this.errorMessage("Less than 3 corners provided"))
        }
    }

    errorMessage = (reason: string): string => {
        return "Failed to create Polygon. Reason: " + reason
    }

}

export default Polygon