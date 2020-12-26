class CircleCollider extends Collider {

    constructor(position, radius, objectTags = [], ignoreTags = []) {
        super(new Circle(position, radius), objectTags, ignoreTags) //  Call the parent classes constructor.
    }

    get radius() {
        return this.shape.radius
    }
}