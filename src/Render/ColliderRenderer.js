class ColliderRenderer extends AbstractRenderer {

    noCollisionColour = "Green"
    checkedColour = "Yellow"
    collisionColour = "Red"

    constructor(context, colliders) {
        super(context)

        this.colliders = colliders
        this.usingSpatialHashing = false
    }

    render() {
        this.colliders.forEach(collider => {
            this.context.beginPath()
            collider.shape.render(this.context)
            this.context.fillStyle = this._getFillColour(collider)
            this.context.fill()
        })
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