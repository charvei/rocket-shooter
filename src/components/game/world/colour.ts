class Colour {
    name: string
    code: string
    imageData: ImageData
    
    constructor(name, code, imageData) {
        this.name = name
        this.code = code
        this.imageData = imageData
    }

    constructImageData() {
        this.code
    }

    getColor = () => {
        return this
    }

    getName = () => {
        return this.name
    }
    
    getCode = () => {
        return this.code
    }

    getImageData = () => {
        return this.imageData
    }
    
}

export default Colour