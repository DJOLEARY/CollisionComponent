class AbstractCollision {

    constructor(collider1, collider2) {
        this.collider1 = collider1
        this.collider2 = collider2
    }

    testForCollision() {
        throw new AbstractFunctionError()
    }
}