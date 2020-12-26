class CollisionTheoremMatcher {

    static CheckForCollision(shape1, shape2) {
        if (AxisAlignedBoundingBox.ValidateShapeTypes(shape1, shape2))
            return new AxisAlignedBoundingBox(shape1, shape2).testForCollision()

        if (CircleCollision.ValidateShapeTypes(shape1, shape2))
            return new CircleCollision(shape1, shape2).testForCollision()

        if (SeperatingAxisTheorem.ValidateShapeTypes(shape1, shape2))
            return new SeperatingAxisTheorem(shape1, shape2).testForCollision()

        if (CircleRectangleCollision.ValidateShapeTypes(shape1, shape2))
            return new CircleRectangleCollision(shape1, shape2).testForCollision()

        return false
    }
}