class Vector2 {

    static FromArray(array) {
        return new Vector2(array[0], array[1])
    }

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    dotProduct(otherVector) {
        return (this.x * otherVector.x) + (this.y * otherVector.y)
    }

    add(otherVector) {
        return new Vector2(this.x + otherVector.x, this.y + otherVector.y)
    }

    subtract(otherVector) {
        return new Vector2(this.x - otherVector.x, this.y - otherVector.y)
    }

    isEqual(otherVector) {
        return this.x === otherVector.x && this.y === otherVector.y
    }

    asArray() {
        return [this.x, this.y]
    }

    get unit() {
        return MathHelper.Normalise(this)        
    }

    get normal() {
        return new Vector2(-this.y, this.x)
    }
}