class Collider {

    constructor(shape, objectTags, ignoreTags) {
        this.colliding = false
        this.checkedForCollision = false
        this.shape = shape
        this.tags = new ColliderTags(objectTags, ignoreTags)
    }

    hasObjectTag(tag) {
        return this.tags.hasObjectTag(tag)
    }

    hasIgnoreTag(tag) {
        return this.tags.hasIgnoreTag(tag)
    }

    move(x, y) {
        this.shape.move(x, y)
    }

    scale(scale) {
        this.shape.scale(scale)
    }

    get position() {
        return this.shape.position
    }

    set position(newPos) {
        this.shape.position = newPos
    }

    get objectTags() {
        return this.tags.objectTags
    }

    get ignoreTags() {
        return this.tags.ignoreTags
    }
}