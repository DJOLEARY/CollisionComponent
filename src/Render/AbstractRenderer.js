class AbstractRenderer {

    constructor(context) {
        if (this.constructor == AbstractRenderer)
            throw new AbstractClassError()

        this.context = context
    }

    render() {
        throw new AbstractFunctionError()
    }
}