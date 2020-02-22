type RainParticle = {
    width: number,
    height: number,
    xPos: number,
    yPos: number,
    speed: number,
    opacity: number
}

type Renderable = {
    xPos: number,
    yPos: number,
    width: number,
    height: number
}

class RainForeground {
    context: CanvasRenderingContext2D
    //opacity: number = 0.5
    rainDensity: number = 0.20
    maxParticles: number = 200

    startingYPos: number = -5

    foregroundContext: CanvasRenderingContext2D
    canvasProps: {height: number, width: number}

    rainParticles: RainParticle[] = []

    constructor(foregroundContext: CanvasRenderingContext2D, canvasProps: {height: number, width: number} ) {
        this.foregroundContext = foregroundContext
        this.canvasProps = canvasProps
    }

    getRenderables = (): Renderable[] => {
        return this.rainParticles.map((particle) => {
            return {
                xPos: particle.xPos,
                yPos: particle.yPos,
                width: particle.width,
                height: particle.height
            }
        })
    } 

    createNewRainParticles = () => {
        for (let i: number = 0; i < 2; i++) {
            // Create 2 particles per row
            // randomize these properties to a certain extent later
            let particle: RainParticle = {
                width: Math.random() * 2,
                height: Math.random() * 2,
                xPos: Math.random() * this.canvasProps.width,
                yPos: this.startingYPos,
                speed: 0.2 + Math.random() * 1.5,
                opacity: 0.5
            }
            this.rainParticles.push(particle)
        }
    }

    update = (delta: number) => {
        if (this.rainParticles.length < this.maxParticles) {
            this.createNewRainParticles()
        }
        // Generate new particles (if enough are available)
        
        // OR recycle old particles (put them back to top of screen)
        
        // Increment particles down according to speed
        this.rainParticles.forEach((particle) => {
            particle.yPos += particle.speed
            
            // return from whence you came
            if (particle.yPos > this.canvasProps.height) {
                particle.yPos = this.startingYPos
                particle.xPos = Math.random() * this.canvasProps.width           
            }
        })
        // 
    }
}

export default RainForeground