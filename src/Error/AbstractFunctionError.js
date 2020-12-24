class AbstractFunctionError extends Error {

    constructor() {
        super("Abstract function has no implementation")
        this.name = this.constructor.name
    }
}