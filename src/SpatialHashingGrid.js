class SpatialHashingGrid {

    constructor(height, width) {
        this.setDimensions(height, width)
    }

    setDimensions(height, width) {
        this.height = height
        this.width = width
    }

    get areDimensionsInitialised() {
        return this.width > 0 && this.height > 0
    }

    getScreenPosition(position) {
        if (!this.areDimensionsInitialised)
            return new Vector2(0, 0)

        var x = Math.floor(position.x / this.width)
        var y = Math.floor(position.y / this.height)
        return new Vector2(x, y)
    }

    comparePositions(pos1, pos2) {
        var scrPos1 = this.getScreenPosition(pos1)
        var scrPos2 = this.getScreenPosition(pos2)

        for (var x = -1; x < 2; x++) {
            for (var y = -1; y < 2; y++) {
                if (scrPos1.x + x == scrPos2.x && scrPos1.y + y == scrPos2.y)
                    return true
            }
        }
        return false
    }
}