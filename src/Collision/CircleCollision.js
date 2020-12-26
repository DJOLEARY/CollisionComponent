class CircleCollision extends AbstractCollision {

    constructor(shape1, shape2) {
        super(shape1, shape2)
    }

    testForCollision() {
        if (!(this.shape1 instanceof Circle) || !(this.shape2 instanceof Circle))
            return false

        var distance = MathHelper.Distance(this.shape1.position, this.shape2.position)
        return distance < this.shape1.radius + this.shape2.radius
    }
}