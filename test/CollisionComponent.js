/* global CollisionComponent, describe, it, expect, should */

describe('CollisionManager()', function () {
    'use strict'

    it('Test AABB - Collision', function () {
        var rect1 = new Rectangle(new Vector2(0, 0), 2, 2)
        var rect2 = new Rectangle(new Vector2(0, 0), 2, 2)

        var collisionTheorem = new AxisAlignedBoundingBox(rect1, rect2)
        var result = collisionTheorem.testForCollision()
        expect(result).to.equal(true)
    })

    it('Test AABB - No Collision', function () {
        var rect1 = new Rectangle(new Vector2(0, 0), 2, 2)
        var rect2 = new Rectangle(new Vector2(5, 0), 2, 2)

        var collisionTheorem = new AxisAlignedBoundingBox(rect1, rect2)
        var result = collisionTheorem.testForCollision()
        expect(result).to.equal(false)
    })

    it('Test CircleCollision - Collision', function () {
        var circle1 = new Circle(new Vector2(0, 0), 2)
        var circle2 = new Circle(new Vector2(1, 0), 2)

        var collisionTheorem = new CircleCollision(circle1, circle2)
        var result = collisionTheorem.testForCollision()
        expect(result).to.equal(true)
    })

    it('Test CircleCollision - No Collision', function () {
        var circle1 = new Circle(new Vector2(0, 0), 2)
        var circle2 = new Circle(new Vector2(5, 0), 2)

        var collisionTheorem = new CircleCollision(circle1, circle2)
        var result = collisionTheorem.testForCollision()
        expect(result).to.equal(false)
    })

    it('Test SAT - Collision', function () {
        var polygon1 = new Polygon([new Vector2(0, 0), new Vector2(2, 0), new Vector2(2, -2), new Vector2(0, -2)])
        var polygon2 = new Polygon([new Vector2(1, 0), new Vector2(3, 0), new Vector2(3, -2), new Vector2(1, -2)])

        var collisionTheorem = new SeperatingAxisTheorem(polygon1, polygon2)
        var result = collisionTheorem.testForCollision()
        expect(result).to.equal(true)
    })

    it('Test SAT - No Collision', function () {
        var polygon1 = new Polygon([new Vector2(0, 0), new Vector2(2, 0), new Vector2(2, -2), new Vector2(0, -2)])
        var polygon2 = new Polygon([new Vector2(3, 0), new Vector2(5, 0), new Vector2(5, -2), new Vector2(3, -2)])

        var collisionTheorem = new SeperatingAxisTheorem(polygon1, polygon2)
        var result = collisionTheorem.testForCollision()
        expect(result).to.equal(false)
    })

})