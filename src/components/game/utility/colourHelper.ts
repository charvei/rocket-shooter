class ColourHelper {

    static hexToRgb = (hex: string): {r: number, g: number, b: number} => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    static createImageData = (height: number, width: number, hex: string, context: CanvasRenderingContext2D) => {
        let rgb = ColourHelper.hexToRgb(hex)
        let imageData: ImageData = context.createImageData(height, width)

        imageData.data[0] = rgb.r
        imageData.data[1] = rgb.g
        imageData.data[2] = rgb.b
        imageData.data[3] = 255

        return imageData
    }
    
}

export default ColourHelper