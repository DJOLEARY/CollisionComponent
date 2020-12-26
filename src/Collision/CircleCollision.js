class CircleCollision extends AbstractCollision {

    constructor(collider1, collider2) {
        super(collider1, collider2)
    }

    testForCollision() {
        var distance = MathHelper.distance(this.collider1.position, this.collider2.position)
        return distance < this.collider1.radius + this.collider2.radius
    }
}