class AbstractCollision {

    static ValidateShapeTypes(shape1, shape2) {
        throw new AbstactFunctionError()
    }

    constructor(shape1, shape2) {
        if (this.constructor == AbstractCollision)
            throw new AbstractClassError()

        this.shape1 = shape1
        this.shape2 = shape2
    }

    testForCollision() {
        throw new AbstractFunctionError()
    }
}