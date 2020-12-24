class AbstractClassError extends Error {

    constructor() {
        super("Class cannot be instantiated as it is Abstract")
        this.name = this.constructor.name
    }
}