class Circle extends AbstractShape {

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

    render(context) {
        context.arc(this.position.x, this.position.y, this.radius, 0, 360)
    }

    get centre() {
        return this.position
    }
}