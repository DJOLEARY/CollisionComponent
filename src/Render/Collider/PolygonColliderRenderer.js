class PolygonColliderRenderer extends AbstractColliderRenderer {

    constructor(context, colliders) {
        super(context, colliders)
    }

    drawShapeToContext(collider) {
        var vertices = collider.vertices;
        vertices.forEach((vertex, index) => {
            if (index === 0) {
                this.context.moveTo(vertex.x, vertex.y)
                return
            }
            this.context.lineTo(vertex.x, vertex.y)
        }, this)
    }
}