/*! CollisionComponent v0.1.0 - MIT license */
'use strict'

class CollisionManager {

    constructor() {
        this.colliders = []
        this.grid = new SpatialHashingGrid(0, 0)
    }

    checkForCollisions() {
        this._resetColliders()

        this.colliders.forEach(collider1 => {
            this.colliders.forEach(collider2 => {
                if (collider1 === collider2)
                    return

                var ignoreCollider = collider1.canIgnoreObject(collider2.objectTags)
                if (ignoreCollider)
                    return

                if (this.useSpatialHashing && !this.grid.canCollide(collider1.centre, collider2.centre))
                    return

                collider1.wasCheckedForCollision()
                collider2.wasCheckedForCollision()

                var collided = CollisionTheoremMatcher.CheckForCollision(collider1.shape, collider2.shape)
                if (collided)
                    collider1.collisions.push(collider2)
            }, this)
        }, this)
    }

    _resetColliders() {
        this.colliders.forEach(collider => {
            collider.resetCollisions()
        }, this)
    }

    addCollider(collider) {
        this.colliders.push(collider)
    }

    removeCollider(collider) {
        var index = this.colliders.indexOf(collider)
        if (index > -1)
            this.boxColliderArray.splice(index, 1)
    }

    useSpatialHashing(height, width) {
        this.grid.setDimensions(height, width)
    }

    render(ctx) {
        var gridRenderer = new SpatialHashingGridRenderer(ctx, this.grid)
        gridRenderer.render()

        var colliderRenderer = new ColliderRenderer(ctx, this.colliders)
        if (this.grid.areDimensionsInitialised)
            colliderRenderer.useSpatialHashing()
        colliderRenderer.render()
    }
}