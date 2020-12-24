class AbstractColliderRenderer extends AbstractRenderer {

    collisionColour = "Red"
    noCollisionColour = "Green"
    checkedColour = "Yellow"

    constructor(context, colliders) {
        super(context)

        if (this.constructor == AbstractColliderRenderer)
            throw new Error("Class cannot be instantiated as it is Abstract")

        this.colliders = colliders
        this.usingSpatialHashing = false
    }

    render() {
        this.colliders.forEach(collider => {
            this.context.beginPath()

            this.drawShapeToContext(collider)

            if (collider.colliding)
                this.context.fillStyle = this.collisionColour
            else {
                var useCheckedColour = collider.checkedForCollision && this.usingSpatialHashing
                this.context.fillStyle = useCheckedColour ? this.checkedColour : this.noCollisionColour
            }

            this.context.fill()
        });
    }

    drawShapeToContext() {
        throw new Error("Abstract function has no implementation")
    }
    
    usesSpatialHashing() {
        this.usingSpatialHashing = true
    }
}