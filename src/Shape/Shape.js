class Shape {

    constructor(position) {
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