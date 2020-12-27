class Rectangle extends Polygon {

    constructor(position, width, height) {
        var offsets = [
            new Vector2(width, 0),
            new Vector2(0, height),
            new Vector2(-width, 0),
            new Vector2(0, -height)
        ]
        var vertices = Polygon.CreateOffsetVertexArray(position, offsets)
        super(vertices)
    }

    addVertex(vertex) {}

    removeVertex(vertex) {}

    rotate(angle) {}

    get centre() {
        const topLeftVertex = this.vertices[0]
        return new Vector2(topLeftVertex.x + (this.width / 2), topLeftVertex.y + (this.height / 2))
    }

    get width() {
        return MathHelper.Distance(this.vertices[0], this.vertices[1])
    }

    set width(newWidth) {
        var height = this.height
        var offsets = [
            new Vector2(newWidth, 0),
            new Vector2(0, height),
            new Vector2(-newWidth, 0),
            new Vector2(0, -height)
        ]
        this.vertices = Polygon.CreateOffsetVertexArray(this.position, offsets)
    }

    get height() {
        return MathHelper.Distance(this.vertices[1], this.vertices[2])
    }

    set height(newHeight) {
        var width = this.width
        var offsets = [
            new Vector2(width, 0),
            new Vector2(0, newHeight),
            new Vector2(-width, 0),
            new Vector2(0, -newHeight)
        ]
        this.vertices = Polygon.CreateOffsetVertexArray(this.position, offsets)
    }
}