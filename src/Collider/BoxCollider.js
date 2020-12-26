class BoxCollider extends Collider {

    constructor(position, width, height, objectTags = [], ignoreTags = []) {
        super(new Rectangle(position, width, height), objectTags, ignoreTags)
    }

    get width() {
        return this.shape.width
    }

    get height() {
        return this.shape.height
    }

    get vertices() {
        return this.shape.vertices
    }

    get centre() {
        return this.shape.centre
    }
}