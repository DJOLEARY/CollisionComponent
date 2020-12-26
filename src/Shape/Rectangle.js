class Rectangle extends Shape {
    
    constructor(position, width, height) {
        super(position)
        this.width = width
        this.height = height
    }

    get vertices() {
        var result = []
        result.push(this.position)
        result.push(new Vector2(this.position.x + this.width, this.position.y))
        result.push(new Vector2(this.position.x + this.width, this.position.y + this.height))
        result.push(new Vector2(this.position.x, this.position.y + this.height))
        return result
    }

    get centre() {
        return new Vector2(this.position.x + (this.width / 2), this.position.y + (this.height / 2))
    }

    move(x, y) {
        this.position.x += x
        this.position.y += y
    }

    scale(scale) {
        this.width *= scale
        this.height *= scale
    }
}