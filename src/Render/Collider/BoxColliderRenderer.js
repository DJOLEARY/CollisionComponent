class BoxColliderRenderer extends AbstractColliderRenderer {

    constructor(context, colliders) {
        super(context, colliders)
    }

    drawShapeToContext(collider) {
        var position = collider.shape.position
        var width = collider.shape.width
        var height = collider.shape.height
        this.context.rect(position.x, position.y, width, height)
    }
}