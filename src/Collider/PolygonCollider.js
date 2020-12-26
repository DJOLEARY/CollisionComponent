class PolygonCollider extends Collider {

    constructor(vertices, objectTags = [], ignoreTags = []) {
        super(new Polygon(vertices), objectTags, ignoreTags)
    }

    get vertices() {
        return this.shape.vertices
    }

    get position() {
        return this.shape.position
    }

    set position(newPos) {
        this.shape.position = newPos
    }

    /**
     * 
     * @param {Float} angle 
     */
    rotate(angle) {
        this.shape.rotate(angle)
    }
}