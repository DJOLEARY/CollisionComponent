class SpatialHashingGridRenderer extends AbstractRenderer {

    constructor(context, gridHeight, gridWidth) {
        super(context)

        this.gridHeight = gridHeight
        this.gridWidth = gridWidth
    }

    render() {
        if (!this._areDimensionsInitialised)
            return

        var canvasWidth = this.context.canvas.width;
        var canvasHeight = this.context.canvas.height;
        for (var x = 0; x < canvasWidth; x += this.gridWidth) {
            for (var y = 0; y < canvasHeight; y += this.gridHeight) {
                this.context.moveTo(x, 0);
                this.context.lineTo(x, canvasHeight);
                this.context.stroke();
                this.context.moveTo(0, y);
                this.context.lineTo(canvasWidth, y);
                this.context.stroke();
            }
        }
    }

    get _areDimensionsInitialised() {
        var isWidthInitalised = this.gridWidth > 0
        var isHeightInitialised = this.gridHeight > 0
        return isWidthInitalised && isHeightInitialised
    }
}