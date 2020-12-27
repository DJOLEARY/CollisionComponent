class CircleCollision extends AbstractCollision {

    static ValidateShapes(shape1, shape2) {
        return shape1 instanceof Circle && shape2 instanceof Circle
    }

    constructor(shape1, shape2) {
        super(shape1, shape2)
    }

    testForCollision() {
        if (!CircleCollision.ValidateShapes(this.shape1, this.shape2))
            return false

        var distance = MathHelper.Distance(this.shape1.position, this.shape2.position)
        return distance < this.shape1.radius + this.shape2.radius
    }
}