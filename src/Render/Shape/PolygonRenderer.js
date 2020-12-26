class PolygonRenderer extends AbstractShapeRenderer {

    constructor(context, shape) {
        super(context, shape)
    }

    drawShapeToContext() {
        var vertices = this.shape.vertices
        vertices.forEach((vertex, index) => {
            if (index === 0) {
                this.context.moveTo(vertex.x, vertex.y)
                return
            }
            this.context.lineTo(vertex.x, vertex.y)
        }, this)
    }
}