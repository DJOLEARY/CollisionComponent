class CircleColliderRenderer extends AbstractColliderRenderer {

    constructor(context, colliders) {
        super(context, colliders)
    }

    drawShapeToContext(collider) {
        var position = collider.position
        var radius = collider.radius
        this.context.arc(position.x, position.y, radius, 0, 360);
    }
}