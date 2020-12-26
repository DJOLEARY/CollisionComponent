class AxisAlignedBoundingBox extends AbstractCollision {

    constructor(shape1, shape2) {
        super(shape1, shape2)
    }

    testForCollision() {
        if (!(this.shape1 instanceof Rectangle) || !(this.shape2 instanceof Rectangle))
            return false

        return this.shape1.position.x <= this.shape2.position.x + this.shape2.width &&
            this.shape1.position.x + this.shape1.width >= this.shape2.position.x &&
            this.shape1.position.y <= this.shape2.position.y + this.shape2.height &&
            this.shape1.position.y + this.shape1.height >= this.shape2.position.y
    }
}