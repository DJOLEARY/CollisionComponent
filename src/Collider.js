class Collider {

    constructor(shape, tags) {
        this.shape = shape
        this.tags = tags

        this.checkedForCollision = false
        this.collisions = []
    }

    move(x, y) {
        this.shape.move(x, y)
    }

    scale(ratio) {
        this.shape.scale(ratio)
    }

    rotate(degrees) {
        this.shape.rotate(degrees)
    }

    hasObjectTag(tag) {
        return this.tags.hasObjectTag(tag)
    }

    hasIgnoreTag(tag) {
        return this.tags.hasIgnoreTag(tag)
    }

    canIgnoreObject(objectTags) {
        return this.tags.canIgnoreObject(objectTags)
    }

    collidedWithTag(tag) {
        var numOfCollisions = this.collisions.length
        for (let i = 0; i < numOfCollisions; i++) {
            const collider = this.collisions[i]
            if (collider.hasObjectTag(tag)) {
                return true
            }
        }
        return false
    }
    
    wasCheckedForCollision() {
        this.checkedForCollision = true
    }

    resetCollisions() {
        this.checkedForCollision = false
        this.collisions = []
    }

    get isColliding() {
        return this.collisions.length > 0
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
}