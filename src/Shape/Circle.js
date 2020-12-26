class Circle extends Shape {

    constructor(position, radius) {
        super(position)
        this.radius = radius
    }

    move(x, y) {
        this.position.x += x
        this.position.y += y
    }

    scale(scale) {
        this.radius *= scale
    }

    get centre() {
        return this.position
    }
}