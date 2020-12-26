class AxisAlignedBoundingBox extends AbstractCollision {

    constructor(collider1, collider2) {
        super(collider1, collider2)
    }

    testForCollision() {
        return this.collider1.position.x <= this.collider2.position.x + this.collider2.width &&
            this.collider1.position.x + this.collider1.width >= this.collider2.position.x &&
            this.collider1.position.y <= this.collider2.position.y + this.collider2.height &&
            this.collider1.position.y + this.collider1.height >= this.collider2.position.y
    }
}