class Collider {
    /**
     * The default constructor of the class.
     * @param {Shape} shape 
     * @param {String[]} objectTags
     * @param {String[]} ignoreTags
     */
    constructor(shape, objectTags, ignoreTags) {
        this.colliding = false;
        this.checkedForCollision = false;
        this.shape = shape;
        this.tags = new ColliderTags(objectTags, ignoreTags);
    }

    /**
     * 
     * @param {String} tag 
     * @return {Boolean}
     */
    hasObjectTag(tag) {
        return this.tags.hasObjectTag(tag);
    }

    /**
     * 
     * @param {String} tag 
     * @return {Boolean}
     */
    hasIgnoreTag(tag) {
        return this.tags.hasIgnoreTag(tag);
    }

    /**
     * 
     * @param {Integer} x 
     * @param {Integer} y 
     */
    move(x, y) {
        this.shape.move(x, y);
    }

    /**
     * 
     * @param {Float} scale 
     */
    scale(scale) {
        this.shape.scale(scale);
    }

    /**
     * 
     */
    get position() {
        return this.shape.position;
    }

    /**
     * 
     * @param {Vector2} newPos
     */
    set position(newPos) {
        this.shape.position = newPos;
    }

    get objectTags() {
        return this.tags.objectTags;
    }

    get ignoreTags() {
        return this.tags.ignoreTags;
    }
}