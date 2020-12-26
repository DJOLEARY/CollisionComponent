class ColliderRenderer extends AbstractRenderer {

    collisionColour = "Red"
    noCollisionColour = "Green"
    checkedColour = "Yellow"

    constructor(context, colliders) {
        super(context)

        this.colliders = colliders
        this.usingSpatialHashing = false
    }

    render() {
        this.colliders.forEach(collider => {
            this.context.beginPath()
            this._drawShapeToContext(collider.shape)
            this.context.fillStyle = this._getFillColour(collider)
            this.context.fill()
        })
    }

    _drawShapeToContext(shape) {
        switch (shape.constructor) {
            case Rectangle:
                var renderer = new RectangleRenderer(this.context, shape)
                break

            case Circle:
                var renderer = new CircleRenderer(this.context, shape)
                break

            case Polygon:
                var renderer = new PolygonRenderer(this.context, shape)
                break

            default:
                throw new Error("Unsupported shape type")
        }

        renderer.drawShapeToContext()
    }

    _getFillColour(collider) {
        if (collider.isColliding)
            return this.collisionColour

        return this.usingSpatialHashing && collider.checkedForCollision ? this.checkedColour : this.noCollisionColour
    }

    useSpatialHashing() {
        this.usingSpatialHashing = true
    }
}