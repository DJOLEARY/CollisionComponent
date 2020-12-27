class CollisionTheoremMatcher {

    static CheckForCollision(shape1, shape2) {
        if (AxisAlignedBoundingBox.ValidateShapes(shape1, shape2))
            return new AxisAlignedBoundingBox(shape1, shape2).testForCollision()

        if (CircleCollision.ValidateShapes(shape1, shape2))
            return new CircleCollision(shape1, shape2).testForCollision()

        if (SeperatingAxisTheorem.ValidateShapes(shape1, shape2))
            return new SeperatingAxisTheorem(shape1, shape2).testForCollision()

        if (CirclePolygonSAT.ValidateShapes(shape1, shape2))
            return new CirclePolygonSAT(shape1, shape2).testForCollision()

        return false
    }
}