class AbstractShape {

    constructor(position) {
        if (this.constructor == AbstractShape)
            throw new AbstractClassError()

        this.position = position
    }

    move(x, y) {
        throw new AbstractFunctionError()
    }

    scale(ratio){
        throw new AbstractFunctionError()
    }

    rotate(degrees){
        throw new AbstractFunctionError()
    }
}