class BoxColliderRenderer extends AbstractColliderRenderer {

    constructor(context, colliders) {
        super(context, colliders)
    }

    drawShapeToContext(collider) {
        var position = collider.position
        var width = collider.width
        var height = collider.height
        this.context.rect(position.x, position.y, width, height)
    }
}