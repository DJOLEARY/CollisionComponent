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
        if (!CirclePolygonCollision.ValidateShapes(this.shape1, this.shape2))
            return false

        const circle = this._getCircle()
        const polygon = this._getPolygon()

        return false
    }

    _getCircle() {
        return this.shape1 instanceof Circle ? this.shape1 : this.shape2
    }

    _getPolygon() {
        return this.shape1 instanceof Polygon ? this.shape1 : this.shape2
    }

}