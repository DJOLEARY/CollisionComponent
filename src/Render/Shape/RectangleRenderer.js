class RectangleRenderer extends AbstractShapeRenderer {

    constructor(context, shape) {
        super(context, shape)
    }

    drawShapeToContext() {
        var position = this.shape.position
        var width = this.shape.width
        var height = this.shape.height
        this.context.rect(position.x, position.y, width, height)
    }
}