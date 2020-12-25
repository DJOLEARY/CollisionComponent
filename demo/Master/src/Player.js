class Player {

    constructor() {
        var position = new Vector2(0, 0)
        var width = 50
        var height = 50
        var objectTags = ["player"]
        var ignoreTags = []
        this.collider = new BoxCollider(position, width, height, objectTags, ignoreTags)

        this.previousCollider = this.collider
    }

    convertToBoxCollider() {
        if (this.collider instanceof BoxCollider)
            return

        var width = 50
        var height = 50
        this._replaceCollider(new BoxCollider(this.collider.position, width, height, this.collider.objectTags, this.collider.ignoreTags))
    }

    convertToCircleCollider() {
        if (this.collider instanceof CircleCollider)
            return

        var radius = 25
        this._replaceCollider(new CircleCollider(this.collider.position, radius, this.collider.objectTags, this.collider.ignoreTags))
    }

    convertToPolygonCollider() {
        if (this.collider instanceof PolygonCollider)
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
        this._replaceCollider(new PolygonCollider(vertices, this.collider.objectTags, this.collider.ignoreTags))
    }

    _replaceCollider(newCollider) {
        this.previousCollider = this.collider
        this.collider = newCollider
    }

    get refreshCollider() {
        return this.previousCollider.constructor.name !== this.collider.constructor.name
    }

    move(x, y) {
        this.collider.move(x, y)
    }

    rotate(degrees) {
        if (this.collider instanceof PolygonCollider)
            this.collider.rotate(degrees)
    }

    scale(ratio) {
        this.collider.scale(ratio)
    }
}