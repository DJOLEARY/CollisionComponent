class AxisAlignedBoundingBox extends AbstractCollision {

    static ValidateShapeTypes(shape1, shape2) {
        return shape1 instanceof Rectangle && shape2 instanceof Rectangle
    }

    constructor(shape1, shape2) {
        super(shape1, shape2)
    }

    testForCollision() {
        if (!AxisAlignedBoundingBox.ValidateShapeTypes(this.shape1, this.shape2))
            return false

        return this.shape1.position.x <= this.shape2.position.x + this.shape2.width &&
            this.shape1.position.x + this.shape1.width >= this.shape2.position.x &&
            this.shape1.position.y <= this.shape2.position.y + this.shape2.height &&
            this.shape1.position.y + this.shape1.height >= this.shape2.position.y
    }
}