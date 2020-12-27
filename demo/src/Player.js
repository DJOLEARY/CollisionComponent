class Player {

    constructor(position) {
        var shape = new Rectangle(position, 50, 50)
        var tags = new Tags(["player"], [])
        this.collider = new Collider(shape, tags)
    }

    convertToRectangle() {
        if (this.collider.shape instanceof Rectangle)
            return

        var shape = new Rectangle(this.collider.position, 50, 50)
        this.collider.shape = shape
    }

    convertToCircle() {
        if (this.collider.shape instanceof Circle)
            return

        var shape = new Circle(this.collider.position, 25)
        this.collider.shape = shape
    }

    convertToConvexPolygon() {
        if (this.collider.shape instanceof Polygon)
            return

        var offsets = [
            new Vector2(10, -15),
            new Vector2(20, 30),
            new Vector2(20, 30),
            new Vector2(10, 20),
            new Vector2(-20, 30),
            new Vector2(-20, 30),
            new Vector2(-20, -70),
        ]
        var vertices = Polygon.CreateOffsetVertexArray(this.collider.position, offsets)
        var shape = new Polygon(vertices)
        this.collider.shape = shape
    }

    move(x, y) {
        this.collider.move(x, y)
    }

    rotate(degrees) {
        if (this.collider.shape instanceof Polygon)
            this.collider.rotate(degrees)
    }

    scale(ratio) {
        this.collider.scale(ratio)
    }
}