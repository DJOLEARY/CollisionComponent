class AbstractRenderer {

    constructor(context) {
        if (this.constructor == AbstractRenderer)
            throw new Error("Class cannot be instantiated as it is Abstract")

        this.context = context
    }

    render() {
        throw new Error("Abstract function has no implementation")
    }
}