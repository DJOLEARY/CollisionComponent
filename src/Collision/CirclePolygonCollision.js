class CirclePolygonCollision extends AbstractCollision {

    static ValidateShapes(shape1, shape2) {
        var isCircle1 = shape1 instanceof Circle
        var isPolygon1 = shape1 instanceof Polygon
        if (!isCircle1 && !isPolygon1)
            return false

        var isCircle2 = shape2 instanceof Circle
        var isPolygon2 = shape2 instanceof Polygon
        if (!isCircle2 && !isPolygon2)
            return false

        var areSameType = isCircle1 && isCircle2 || isPolygon1 && isPolygon2
        if (areSameType)
            return false

        return true
    }

    constructor(shape1, shape2) {
        super(shape1, shape2)
    }

    testForCollision() {
        if (!CircleRectangleCollision.ValidateShapes(this.shape1, this.shape2))
            return false

        const circle = this._getCircle()
        const polygon = this._getPolygon()

        var distX = Math.abs(circle.position.x - (rectangle.position.x + (rectangle.width / 2)))
        var distY = Math.abs(circle.position.y - (rectangle.position.y + (rectangle.height / 2)))
        var dX = distX - (rectangle.width / 2)
        var dY = distY - (rectangle.height / 2)

        return distX <= (rectangle.width / 2) + circle.radius &&
            distY <= (rectangle.height / 2) + circle.radius ||
            Math.pow(dX, 2) + Math.pow(dY, 2) <= Math.pow(circle.radius, 2)
    }

    _getCircle() {
        return this.shape1 instanceof Circle ? this.shape1 : this.shape2
    }

    _getPolygon() {
        return this.shape1 instanceof Polygon ? this.shape1 : this.shape2
    }

}