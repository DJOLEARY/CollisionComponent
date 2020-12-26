class Polygon extends AbstractShape {

    static CreateOffsetVertexArray(startPosition, offsets) {
        var result = [startPosition]
        var lastPosition = startPosition
        for (let i = 0; i < offsets.length; i++) {
            const offset = offsets[i]
            var nextPosition = lastPosition.add(offset)
            result.push(nextPosition)
            lastPosition = nextPosition
        }
        return result
    }

    constructor(vertices) {
        super(vertices[0])
        this.vertices = vertices
    }

    addVertex(vertex) {
        this.vertices.push(vertex)
    }

    removeVertex(vertex) {
        var index = this.vertices.indexOf(vertex)
        if (index > -1)
            this.vertices.splice(index, 1)
    }

    move(x, y) {
        this.position = new Vector2(this.position.x + x, this.position.y + y)
    }

    scale(scale) {
        var vertexMatrix = []
        this.vertices.forEach(vertex => {
            vertexMatrix.push([vertex.x, vertex.y])
        })
        var centre = this.centre
        var centreMatrix = []
        for (var i = 0; i < vertexMatrix.length; i++) {
            centreMatrix.push([centre.x, centre.y])
        }
        var scaleMatrix = [
            [scale, 0],
            [0, scale]
        ]
        var subResultMatrix = MathHelper.SubMatrices(vertexMatrix, centreMatrix)
        var multiplyMatrixResult = MathHelper.MultiplyMatrices(subResultMatrix, scaleMatrix)
        var newVertexMatrix = MathHelper.AddMatrices(multiplyMatrixResult, centreMatrix)
        for (var i = 0; i < newVertexMatrix.length; i++) {
            this.vertices[i] = new Vector2(newVertexMatrix[i][0], newVertexMatrix[i][1])
        }
    }

    rotate(angle) {
        var angleInRadians = MathHelper.DegreesToRadians(angle)
        var vertexMatrix = []
        this.vertices.forEach(vertex => {
            vertexMatrix.push([vertex.x, vertex.y])
        })
        var centre = this.centre
        var centreMatrix = []
        for (var i = 0; i < vertexMatrix.length; i++) {
            centreMatrix.push([centre.x, centre.y])
        }
        var rotationMatrix = [
            [Math.cos(angleInRadians), Math.sin(angleInRadians)],
            [-Math.sin(angleInRadians), Math.cos(angleInRadians)]
        ]
        var subResultMatrix = MathHelper.SubMatrices(vertexMatrix, centreMatrix)
        var multiplyMatrixResult = MathHelper.MultiplyMatrices(subResultMatrix, rotationMatrix)
        var newVertexMatrix = MathHelper.AddMatrices(multiplyMatrixResult, centreMatrix)
        for (var i = 0; i < newVertexMatrix.length; i++) {
            this.vertices[i] = new Vector2(newVertexMatrix[i][0], newVertexMatrix[i][1])
        }
    }

    render(context) {
        this.vertices.forEach((vertex, index) => {
            if (index === 0) {
                context.moveTo(vertex.x, vertex.y)
                return
            }
            context.lineTo(vertex.x, vertex.y)
        }, this)
    }

    get centre() {
        //  https://stackoverflow.com/questions/9692448/how-can-you-find-the-centroid-of-a-concave-irregular-polygon-in-javascript
        var vertexArrayCopy = []
        this.vertices.forEach(vertex => {
            vertexArrayCopy.push(vertex)
        })
        var first = vertexArrayCopy[0]
        var last = vertexArrayCopy[vertexArrayCopy.length - 1]
        //  Close the shape if not already closed.
        if (first != last)
            vertexArrayCopy.push(first)

        var twiceArea = 0
        var x = 0
        var y = 0
        var numOfVertices = vertexArrayCopy.length
        var f = 0
        for (var i = 0, j = numOfVertices - 1; i < numOfVertices; j = i++) {
            var p1 = vertexArrayCopy[i]
            var p2 = vertexArrayCopy[j]
            f = (p1.y - first.y) * (p2.x - first.x) - (p2.y - first.y) * (p1.x - first.x)
            twiceArea += f
            x += (p1.x + p2.x - 2 * first.x) * f
            y += (p1.y + p2.y - 2 * first.y) * f
        }
        f = twiceArea * 3
        return new Vector2(x / f + first.x, y / f + first.y)
    }

    get position() {
        return this.vertices.length > 0 ? this.vertices[0] : new Vector2(0, 0)
    }

    set position(newPos) {
        if (!this.vertices)
            return

        var differenceVector = []
        for (var i = 0, j = 1; j < this.vertices.length; i++, j++) {
            differenceVector.push(this.vertices[j].subtract(this.vertices[i]))
        }

        this.vertices[0] = newPos
        for (var i = 1; i < this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i - 1].add(differenceVector[i - 1])
        }
    }

}