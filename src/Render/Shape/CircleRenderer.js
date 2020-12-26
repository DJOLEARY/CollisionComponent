class CircleRenderer extends AbstractShapeRenderer {

    constructor(context, shape) {
        super(context, shape)
    }

    drawShapeToContext() {
        var position = this.shape.position
        var radius = this.shape.radius
        this.context.arc(position.x, position.y, radius, 0, 360)
    }
}