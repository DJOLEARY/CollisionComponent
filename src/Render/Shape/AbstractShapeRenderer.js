class AbstractShapeRenderer {

    constructor(context, shape) {
        this.context = context
        this.shape = shape
    }

    drawShapeToContext() {
        throw new AbstractFunctionError()
    }
}