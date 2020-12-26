class Collider {

    constructor(shape, objectTags, ignoreTags) {
        this.colliding = false
        this.checkedForCollision = false
        this.shape = shape
        this.tags = new Tags(objectTags, ignoreTags)
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

    scale(ratio) {
        this.shape.scale(ratio)
    }

    rotate(degrees){
        this.shape.rotate(degrees)
    }

    get position() {
        return this.shape.position
    }

    set position(newPos) {
        this.shape.position = newPos
    }

    get centre() {
        return this.shape.centre
    }

    get objectTags() {
        return this.tags.objectTags
    }

    get ignoreTags() {
        return this.tags.ignoreTags
    }

    get shapeType() {
        return this.shape.constructor.name
    }
}