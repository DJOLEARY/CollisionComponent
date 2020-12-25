class SpatialHashingGridRenderer extends AbstractRenderer {

    constructor(context, grid) {
        super(context)

        this.grid = grid
    }

    render() {
        if (!this.grid.areDimensionsInitialised)
            return

        var canvasWidth = this.context.canvas.width;
        var canvasHeight = this.context.canvas.height;
        for (var x = 0; x < canvasWidth; x += this.grid.width) {
            for (var y = 0; y < canvasHeight; y += this.grid.height) {
                this.context.moveTo(x, 0);
                this.context.lineTo(x, canvasHeight);
                this.context.stroke();
                this.context.moveTo(0, y);
                this.context.lineTo(canvasWidth, y);
                this.context.stroke();
            }
        }
    }
}