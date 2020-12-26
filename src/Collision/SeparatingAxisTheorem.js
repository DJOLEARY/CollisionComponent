class SeperatingAxisTheorem extends AbstractCollision {

    constructor(collider1, collider2) {
        super(collider1, collider2)
    }

    testForCollision() {
        var axes1 = this._getProjectionAxes(this.collider1)
        var projectionsOverlap1 = this._compareProjections(this.collider1, this.collider2, axes1)
        if (!projectionsOverlap1)
            return false

        var axes2 = this._getProjectionAxes(this.collider2)
        var projectionsOverlap2 = this._compareProjections(this.collider1, this.collider2, axes2)
        if (!projectionsOverlap2)
            return false
        
        return true
    }

    _compareProjections(collider1, collider2, axes) {
        for (var i = 0; i < axes.length; i++) {
            const axis = axes[i]
            var proj1 = this._projectOntoAxis(collider1, axis)
            var proj2 = this._projectOntoAxis(collider2, axis)
            if (!this._doProjectionsOverlap(proj1, proj2))
                return false
        }
        return true
    }

    _getProjectionAxes(collider) {
        var axes = []
        var vertices = collider.vertices
        var length = vertices.length
        for (var i = 0; i < length; i++) {
            const vertex1 = vertices[i]
            const vertex2 = vertices[i + 1 == length ? 0 : i + 1]
            var edge = vertex1.subtract(vertex2)
            var normal = edge.perp()
            axes[i] = normal
        }
        return axes
    }

    _projectOntoAxis(collider, axis) {
        const vertices = collider.vertices
        var max = axis.dotProduct(vertices[0])
        var min = max 
        for (var i = 1; i < vertices.length; i++) {
            const projectedVertex = axis.dotProduct(vertices[i])
            if (projectedVertex < min)
                min = projectedVertex
            else if (projectedVertex > max)
                max = projectedVertex
        }

        var projection = {}
        projection.min = min
        projection.max = max
        return projection
    }

    _doProjectionsOverlap(proj1, proj2) {
        return proj1.min <= proj2.max && proj2.min <= proj1.max
    }
}