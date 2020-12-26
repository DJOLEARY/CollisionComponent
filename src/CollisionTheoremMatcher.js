class CollisionTheoremMatcher {

    static CheckForCollision(shape1, shape2) {
        if (shape1 instanceof Rectangle && shape2 instanceof Rectangle)
            return new AxisAlignedBoundingBox(shape1, shape2).testForCollision()

        if (shape1 instanceof Circle && shape2 instanceof Circle)
            return new CircleCollision(shape1, shape2).testForCollision()

        if (shape1 instanceof Polygon && shape2 instanceof Polygon)
            return new SeperatingAxisTheorem(shape1, shape2).testForCollision()

        if ((shape1 instanceof Circle || shape1 instanceof Rectangle) &&
            (shape2 instanceof Circle || shape2 instanceof Rectangle))
            return new CircleRectangleCollision(shape1, shape2).testForCollision()

        return false
    }
}