class Circle extends Shape {
    
    constructor(position, radius) {
        super(position)
        this.radius = radius
        this.isCircle = true
    }

    lineIntersectsCircle(startPoint, endPoint) {
        var results = []

        var slope = (endPoint.y - startPoint.y) / (endPoint.x - startPoint.x)
        var yIntercept = (endPoint.y - startPoint.y) - (slope * (endPoint.x - startPoint.x))

        var a = 1 + (slope * slope)
        var b = -this.position.x * 2 + (slope * (yIntercept - this.position.y))
        var c = (this.position.x * this.position.x) + ((yIntercept * this.position.y) * (yIntercept * this.position.y)) - (this.radius * this.radius)

        var d = (b * b) - 4 * a * c
        if (d >= 0) {
            results = [
                (-b + sqrt(sq(b) - 4 * a * c)) / (2 * a),
                (-b - sqrt(sq(b) - 4 * a * c)) / (2 * a)
            ]

            if (d == 0) {
                return results[0]
            }
        }
        return results
    }

    move(x, y) {
        this.position.x += x
        this.position.y += y
    }

    scale(scale) {
        this.radius *= scale
    }
}