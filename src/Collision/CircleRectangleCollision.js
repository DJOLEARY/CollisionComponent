class CircleRectangleCollision extends AbstractCollision {

    constructor(shape1, shape2) {
        super(shape1, shape2)
    }

    testForCollision() {
        if (!this._validateShapeTypes())
            return false

        const circle = this._getCircle()
        const rectangle = this._getRectangle()

        var distX = Math.abs(circle.position.x - (rectangle.position.x + (rectangle.width / 2)))
        var distY = Math.abs(circle.position.y - (rectangle.position.y + (rectangle.height / 2)))
        var dX = distX - (rectangle.width / 2)
        var dY = distY - (rectangle.height / 2)

        return distX <= (rectangle.width / 2) + circle.radius &&
            distY <= (rectangle.height / 2) + circle.radius ||
            Math.pow(dX, 2) + Math.pow(dY, 2) <= Math.pow(circle.radius, 2)
    }

    _validateShapeTypes() {
        var isCircle1 = this.shape1 instanceof Circle
        var isRectangle1 = this.shape1 instanceof Rectangle
        if (!isCircle1 && !isRectangle1)
            return false

        var isCircle2 = this.shape2 instanceof Circle
        var isRectangle2 = this.shape2 instanceof Rectangle
        if (!isCircle2 && !isRectangle2)
            return false

        var areSameType = isCircle1 && isCircle2 || isRectangle1 && isRectangle2
        if (areSameType)
            return false

        return true
    }

    _getCircle() {
        return this.shape1 instanceof Circle ? this.shape1 : this.shape2
    }

    _getRectangle() {
        return this.shape1 instanceof Rectangle ? this.shape1 : this.shape2
    }

}