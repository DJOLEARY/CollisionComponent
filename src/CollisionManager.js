/*! CollisionComponent v0.1.0 - MIT license */
'use strict';

class CollisionManager {
    /**
     * Default constructor for the class
     */
    constructor() {
        this.boxColliderArray = [];
        this.circleColliderArray = [];
        this.polygonColliderArray = [];

        this.boxColliderArrayResults = [];
        this.circleColliderArrayResults = [];
        this.polygonColliderArrayResults = [];
        this.circleAndBoxColliderArrayResults = [];

        this.collisionColour = "Red";
        this.noCollisionColour = "Green";
        this.checkedColour = "Yellow";

        this.usingSpatialHashing = false;
        this.gridHeight = 0;
        this.gridWidth = 0;

        //  Be wary of making this value true as there is a major performance hit.
        this.renderGrid = false;
    }

    /**
     * Checks for collisions between the objects in each respective array.
     */
    checkAllColliders() {
        this.checkBoxColliderArray();
        this.checkCircleColliderArray();
        this.checkCircleAndBoxColliderArray();
        this.checkPolygonColliderArray();
    }

    /**
     * @return {Boolean[][]}
     */
    checkBoxColliderArray() {
        if (this.boxColliderArray.length > 0) {
            this.boxColliderArrayResults = this.checkArray(this.boxColliderArray, CollisionManager.AxisAlignedBoundingBox);
        }
        return this.boxColliderArrayResults;
    }

    /**
     * @return {Boolean[][]}
     */
    checkCircleColliderArray() {
        if (this.circleColliderArray.length > 0) {
            this.circleColliderArrayResults = this.checkArray(this.circleColliderArray, CollisionManager.CircleCollision);
        }
        return this.circleColliderArrayResults;
    }

    /**
     * @return {Boolean[][][]} Returns a boolean dictionary. The results for checking the boxColliders against the circleColliders is stored behind the key = 'BoxResults' while
     * the results for checking the circleColliders against the boxColliders is stored behind the key = 'CircleResults'.
     */
    checkCircleAndBoxColliderArray() {
        if (this.circleColliderArray.length > 0 && this.boxColliderArray.length > 0) {
            this.circleAndBoxColliderArrayResults = this.checkArrays(this.boxColliderArray, this.circleColliderArray, 'BoxResults', 'CircleResults', CollisionManager.CircleRectangleCollision);
        }
        return this.circleAndBoxColliderArrayResults;
    }

    /**
     * @return {Boolean[][]}
     */
    checkPolygonColliderArray() {
        if (this.polygonColliderArray.length > 0) {
            this.polygonColliderArrayResults = this.checkArray(this.polygonColliderArray, CollisionManager.SeperatingAxisTheorem);
        }
        return this.polygonColliderArrayResults;
    }

    /**
     * Renders all colliders for debugging or testing.
     * @param {Context} ctx 
     */
    render(ctx) {
        if (this.renderGrid === true && this.usingSpatialHashing === true && this.gridHeight > 0 && this.gridWidth > 0) {
            var width = ctx.canvas.width;
            var height = ctx.canvas.height;
            for (var x = 0; x < width; x += this.gridWidth) {
                for (var y = 0; y < height; y += this.gridHeight) {
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, height);
                    ctx.stroke();
                    ctx.moveTo(0, y);
                    ctx.lineTo(width, y);
                    ctx.stroke();
                }
            }
        }

        var boxRenderer = new BoxColliderRenderer(ctx, this.boxColliderArray)
        if (this.usingSpatialHashing)
            boxRenderer.usesSpatialHashing()
        boxRenderer.render()

        //  If the circleColliderArray isn't empty.
        if (this.circleColliderArray.length > 0) {
            //  Cycle through each collider.
            this.circleColliderArray.forEach(collider => {
                ctx.beginPath();
                //  Draw the circle.
                ctx.arc(collider.shape.position.x, collider.shape.position.y, collider.shape.radius, 0, 360);
                //  If the collider is colliding make it [[RED]] otherwise check if it was checked for a collision and if it it was make it [[Yellow]], else it is [[GREEN]].
                if (collider.colliding === true) {
                    ctx.fillStyle = this.collisionColour;
                } else {
                    if (collider.checkedForCollision === true && this.usingSpatialHashing === true) {
                        ctx.fillStyle = this.checkedColour;
                    } else {
                        ctx.fillStyle = this.noCollisionColour;
                    }
                }
                ctx.fill();
            });
        }
        //  If the polygonColliderArray isn't empty.
        if (this.polygonColliderArray.length > 0) {
            //  Cycle through each collider.
            this.polygonColliderArray.forEach(collider => {
                var vertexArray = collider.shape.getVertices();
                ctx.beginPath();
                //  Draw all vertices of the polygon.
                for (var i = 0; i < vertexArray.length; i++) {
                    if (i === 0) {
                        ctx.moveTo(vertexArray[i].x, vertexArray[i].y);
                    } else {
                        ctx.lineTo(vertexArray[i].x, vertexArray[i].y);
                    }
                }
                //  If the collider is colliding make it [[RED]] otherwise check if it was checked for a collision and if it it was make it [[Yellow]], else it is [[GREEN]].
                if (collider.colliding === true) {
                    ctx.fillStyle = this.collisionColour;
                } else {
                    if (collider.checkedForCollision === true && this.usingSpatialHashing === true) {
                        ctx.fillStyle = this.checkedColour;
                    } else {
                        ctx.fillStyle = this.noCollisionColour;
                    }
                }
                ctx.fill()
            });
        }
    }

    /**
     * Checks all objects in the inputArray with the inputFunction to see if there is any collisions and records the results.
     * @param {Collider[]} inputArray 
     * @param {Function} inputFunction 
     * @return {Boolean[][]}
     */
    checkArray(inputArray, inputFunction) {
        /**
         * The result array is set up as follows:
         * 
         *             element1   element2   element3      ...
         *   element1 |    -    |          |          |
         *   element2 |         |     -    |          |
         *   element3 |         |          |     -    |
         *   ...      |         |          |          |     -
         *  
         * The result of the tests are put into the appropriate positions to prevent retesting the same elements against eachother.
         */
        var result = [];
        //  Reset the necessary values or each collider.
        this.resetColliderArray(inputArray);
        // Cycle through each element in the array.
        for (var i = 0; i < inputArray.length; i++) {
            result[i] = [];
            // Cycle through each element in the array.
            for (var j = 0; j < inputArray.length; j++) {
                if (result[j] === undefined) {
                    result[j] = [];
                }
                //  Check if the current element should be ignored.
                var ignoreObject = false;
                for (var k = 0; k < inputArray[j].objectTags.length; k++) {
                    var index = inputArray[i].ignoreTags.indexOf(inputArray[j].objectTags[k]);
                    if (index > -1) {
                        ignoreObject = true;
                        break;
                    }
                }

                if (ignoreObject === false && inputArray[i] !== inputArray[j] && result[i][j] === undefined) {
                    //  Checks if we should bother checking the collision.
                    var checkCollision = true;
                    if (this.usingSpatialHashing === true) {
                        checkCollision = this.compareSpatialHashingPositions(inputArray[i], inputArray[j]);
                    }

                    if (checkCollision === true) {
                        var testResult = inputFunction(inputArray[i], inputArray[j]);
                        inputArray[i].checkedForCollision = true;
                        inputArray[j].checkedForCollision = true;
                        result[i][j] = testResult;
                    }
                }
            }
        }
        //  Set each elements own colliding boolean to match their status.
        for (var i = 0; i < result.length; i++) {
            var colliding = false;
            for (var j = 0; j < result.length; j++) {
                if (result[i][j] === true) {
                    colliding = true;
                }
            }
            inputArray[i].colliding = colliding;
        }
        return result;
    }



    /**
     * Checks all objects in the inputArray with the inputFunction to see if there is any collisions and records the results.
     * @param {Collider[]} inputArray1
     * @param {Collider[]} inputArray2
     * @param {String} resultLabel1 the key that will be used for the results of inputArray1 compared to inputArray2.
     * @param {String} resultLabel2 the key that will be used for the results of inputArray2 compared to inputArray1.
     * @param {Function} inputFunction 
     * @return {Boolean[][][]}
     */
    checkArrays(inputArray1, inputArray2, resultLabel1, resultLabel2, inputFunction) {
        /**
         * The result array is set up as follows:
         *           
         * [resultLabel1]
         *                     array2.element1  array2.element2  array2.element3    array2....
         *   array1.element1 |                |                |                |
         *   array1.element2 |                |                |                |
         *   array1.element3 |                |                |                |
         *   array1....      |                |                |                |     
         * 
         * 
         * [resultLabel2]
         *                     array1.element1  array1.element2  array1.element3    array1....
         *   array2.element1 |                |                |                |
         *   array2.element2 |                |                |                |
         *   array2.element3 |                |                |                |
         *   array2....      |                |                |                |     
         *  
         *  We can't use the same results for checking if for example array1.element1 is colliding with array2.element1 as array1.element1 may have an 
         *  ignore tag that array2.element1 is looking for.
         */
        var result = [];
        //  Reset the necessary values or each collider.
        this.resetColliderArray(inputArray1);
        this.resetColliderArray(inputArray2);
        //  Test inputArray1 against inputArray2.
        result[resultLabel1] = [];
        for (var i = 0; i < inputArray1.length; i++) {
            result[resultLabel1][i] = [];
            for (var j = 0; j < inputArray2.length; j++) {
                //  Check if the current element should be ignored.
                var ignoreObject = false;
                var whileIndex = 0;
                while (ignoreObject === false && whileIndex < inputArray2[j].objectTags.length) {
                    var index = inputArray1[i].ignoreTags.indexOf(inputArray2[j].objectTags[whileIndex]);
                    if (index > -1) {
                        ignoreObject = true;
                    }
                    whileIndex++;
                }

                if (ignoreObject === false) {
                    //  Checks if we should bother checking the collision.
                    var checkCollision = true;
                    if (this.usingSpatialHashing === true) {
                        checkCollision = this.compareSpatialHashingPositions(inputArray1[i], inputArray2[j]);
                    }

                    if (checkCollision === true) {
                        var testResult = inputFunction(inputArray1[i], inputArray2[j]);
                        inputArray1[i].checkedForCollision = true;
                        inputArray2[j].checkedForCollision = true;
                        result[resultLabel1][i][j] = testResult;
                    }
                }
            }
        }
        //  Set each elements own colliding boolean to match their status.
        for (var i = 0; i < result[resultLabel1].length; i++) {
            var colliding = false;
            for (var j = 0; j < result[resultLabel1][i].length; j++) {
                if (result[resultLabel1][i][j] === true) {
                    colliding = true;
                }
            }
            inputArray1[i].colliding = colliding;
        }

        //  Test inputArray2 against inputArray1.
        result[resultLabel2] = [];
        for (var i = 0; i < inputArray2.length; i++) {
            result[resultLabel2][i] = [];
            for (var j = 0; j < inputArray1.length; j++) {
                //  Check if the current element should be ignored.
                var ignoreObject = false;
                var whileIndex = 0;
                while (ignoreObject === false && whileIndex < inputArray1[j].objectTags.length) {
                    var index = inputArray2[i].ignoreTags.indexOf(inputArray1[j].objectTags[whileIndex]);
                    if (index > -1) {
                        ignoreObject = true;
                    }
                    whileIndex++;
                }

                if (ignoreObject === false) {
                    //  Checks if we should bother checking the collision.
                    var checkCollision = true;
                    if (this.usingSpatialHashing === true) {
                        checkCollision = this.compareSpatialHashingPositions(inputArray2[i], inputArray1[j]);
                    }

                    if (checkCollision === true) {
                        var testResult = inputFunction(inputArray1[j], inputArray2[i]);
                        inputArray2[i].checkedForCollision = true;
                        inputArray1[j].checkedForCollision = true;
                        result[resultLabel2][i][j] = testResult;
                    }
                }
            }
        }
        //  Set each elements own colliding boolean to match their status.
        for (var i = 0; i < result[resultLabel2].length; i++) {
            var colliding = false;
            for (var j = 0; j < result[resultLabel2][i].length; j++) {
                if (result[resultLabel2][i][j] === true) {
                    colliding = true;
                }
            }
            inputArray2[i].colliding = colliding;
        }

        return result;
    }

    /**
     * Resets all the necessary values in each collider in the array.
     * @param {Collider[]} inputArray 
     */
    resetColliderArray(inputArray) {
        for (var i = 0; i < inputArray.length; i++) {
            inputArray[i].checkedForCollision = false;
        }
    }

    /**
     * Adds a boxCollider to boxColliderArray.
     * @param {BoxCollider} boxCollider 
     */
    addBoxCollider(boxCollider) {
        this.boxColliderArray.push(boxCollider);
    }

    /**
     * Removes a boxCollider from boxColliderArray.
     * @param {BoxCollider} boxCollider 
     */
    removeBoxCollider(boxCollider) {
        var index = this.boxColliderArray.indexOf(boxCollider);
        if (index > -1) {
            this.boxColliderArray.splice(index, 1);
        }
    }

    /**
     * Adds a circleCollider to circleColliderArray
     * @param {CircleCollider} circleCollider 
     */
    addCircleCollider(circleCollider) {
        this.circleColliderArray.push(circleCollider);
    }

    /**
     * Removes a circleCollider from circleColliderArray.
     * @param {CircleCollider} circleCollider 
     */
    removeCircleCollider(circleCollider) {
        var index = this.circleColliderArray.indexOf(circleCollider);
        if (index > -1) {
            this.circleColliderArray.splice(index, 1);
        }
    }

    /**
     * Adds a polygonCollider to polygonColliderArray
     * @param {PolygonCollider} polygonCollider 
     */
    addPolygonCollider(polygonCollider) {
        this.polygonColliderArray.push(polygonCollider)
    }

    /**
     * Removes a polygonCollider from polygonColliderArray.
     * @param {PolygonCollider} polygonCollider 
     */
    removePolygonCollider(polygonCollider) {
        var index = this.polygonColliderArray.indexOf(polygonCollider);
        if (index > -1) {
            this.polygonColliderArray.splice(index, 1);
        }
    }

    /**
     * 
     * @param {Scalar} gridWidth 
     * @param {Scalar} gridHeight 
     */
    updateSpatialHashing(gridWidth, gridHeight) {
        if (this.usingSpatialHashing === false) {
            this.usingSpatialHashing = true;
        }

        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;

        this.boxColliderArray.forEach(boxElement => {
            boxElement.updateSpatialHash(gridWidth, gridHeight);
        });

        this.circleColliderArray.forEach(circleElement => {
            circleElement.updateSpatialHash(gridWidth, gridHeight);
        });

        this.polygonColliderArray.forEach(polyElement => {
            polyElement.updateSpatialHash(gridWidth, gridHeight);
        });
    }

    /**
     * 
     * @param {Collider} collider1 
     * @param {Collider} collider2 
     */
    compareSpatialHashingPositions(collider1, collider2) {
        for (var x = -1; x < 2; x++) {
            for (var y = -1; y < 2; y++) {
                if (collider1.screenPos.x + x == collider2.screenPos.x &&
                    collider1.screenPos.y + y == collider2.screenPos.y) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 
     * @param {BoxCollider} collider 
     * @param {String} tag 
     */
    boxCollidedWithTag(collider, tag) {
        var result = false;
        var colliderIndex = CollisionManager.IndexOfElement(this.boxColliderArray, collider);
        result = CollisionManager.CollidedWithTag(colliderIndex, this.boxColliderArrayResults, this.boxColliderArray, tag);
        return result;
    }

    /**
     * 
     * @param {CircleCollider} collider 
     * @param {String} tag 
     */
    circleCollidedWithTag(collider, tag) {
        var result = false;
        var colliderIndex = CollisionManager.IndexOfElement(this.circleColliderArray, collider);
        result = CollisionManager.CollidedWithTag(colliderIndex, this.circleColliderArrayResults, this.circleColliderArray, tag);
        return result;
    }

    /**
     * 
     * @param {CircleCollider || BoxCollider} collider 
     * @param {String} colliderType the type of the collider typed as a string.
     * @param {String} tag 
     */
    circleAndBoxCollidedWithTag(collider, colliderType, tag) {
        var result = false;
        if (colliderType === "CircleCollider") {
            var colliderIndex = CollisionManager.IndexOfElement(this.circleColliderArray, collider);
            result = CollisionManager.CollidedWithTag(colliderIndex, this.circleAndBoxColliderArrayResults['CircleResults'], this.boxColliderArray, tag);
        } else if (colliderType === "BoxCollider") {
            var colliderIndex = CollisionManager.IndexOfElement(this.boxColliderArray, collider);
            result = CollisionManager.CollidedWithTag(colliderIndex, this.circleAndBoxColliderArrayResults['BoxResults'], this.circleColliderArray, tag);
        }
        return result;
    }

    /**
     * 
     * @param {PolygonCollider} collider 
     * @param {String} tag 
     */
    polygonCollidedWithTag(collider, tag) {
        var colliderIndex = CollisionManager.IndexOfElement(this.polygonColliderArray, collider);
        var result = CollisionManager.CollidedWithTag(colliderIndex, this.polygonColliderArrayResults, this.polygonColliderArray, tag);
        return result;
    }


    /**
     * 
     * @param {Collider} colliderIndex the index of the collider in the results array.
     * @param {Boolean[]} collisionResults 
     * @param {Collider[]} checkArray the array that you want to test the collider against.
     * @param {String} tag 
     * @return {Boolean}
     */
    static CollidedWithTag(colliderIndex, collisionResults, checkArray, tag) {
        var result = false;
        if (colliderIndex > -1) {
            var collidedObjectTags = [];
            for (var i = 0; i < collisionResults[colliderIndex].length; i++) {
                if (collisionResults[colliderIndex][i] === true) {
                    collidedObjectTags.push.apply(collidedObjectTags, checkArray[i].objectTags);
                }
            }
            result = CollisionManager.ArrayContainsElement(collidedObjectTags, tag);
        }
        return result;
    }

    /**
     * 
     * @param {Array} array 
     * @param {Element} element 
     * @return {Scalar}
     */
    static IndexOfElement(array, element) {
        return array.indexOf(element);
    }

    /**
     * 
     * @param {Array} array 
     * @param {Element} element 
     * @return {Boolean}
     */
    static ArrayContainsElement(array, element) {
        var containsElement = false;
        var index = array.indexOf(element);
        if (index > -1) {
            containsElement = true;
        }
        return containsElement;
    }

    /**
     * 
     * @param {BoxCollider} boxCollider 
     * @param {CircleCollider} circleCollider 
     */
    static CircleRectangleCollision(boxCollider, circleCollider) {
        var result = false;
        var distX = Math.abs(circleCollider.shape.position.x - (boxCollider.shape.position.x + (boxCollider.shape.width / 2)));
        var distY = Math.abs(circleCollider.shape.position.y - (boxCollider.shape.position.y + (boxCollider.shape.height / 2)));
        var dX = distX - (boxCollider.shape.width / 2);
        var dY = distY - (boxCollider.shape.height / 2);
        if (distX <= (boxCollider.shape.width / 2) + circleCollider.shape.radius && distY <= (boxCollider.shape.height / 2) + circleCollider.shape.radius) {
            result = true;
        } else if ((dX * dX) + (dY * dY) <= (circleCollider.shape.radius * circleCollider.shape.radius)) {
            result = true;
        }
        return result;
    }

    /**
     * Checks for a collision between two rectangles by checking for overlap in their positions.
     * @param {BoxCollider} collider1 
     * @param {BoxCollider} collider2 
     * @return {Boolean}
     */
    static AxisAlignedBoundingBox(collider1, collider2) {
        if (collider1.shape.position.x <= collider2.shape.position.x + collider2.shape.width &&
            collider1.shape.position.x + collider1.shape.width >= collider2.shape.position.x &&
            collider1.shape.position.y <= collider2.shape.position.y + collider2.shape.height &&
            collider1.shape.position.y + collider1.shape.height >= collider2.shape.position.y) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Checks for a collision between two circles using the distance between their centres and their radii.
     * @param {CircleCollider} collider1 
     * @param {CircleCollider} collider2 
     * @return {Boolean}
     */
    static CircleCollision(collider1, collider2) {
        var distance = MathHelper.distance(collider1.shape.position, collider2.shape.position);
        if (distance < collider1.shape.radius + collider2.shape.radius) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Checks for a collision between two convex polygons by projecting them onto an axis and then checking for overlap.
     * @param {PolygonCollider} collider1 
     * @param {PolygonCollider} collider2 
     * @return {Boolean}
     */
    static SeperatingAxisTheorem(collider1, collider2) {
        //  Get the axes
        var axes1 = collider1.shape.Axes();
        var axes2 = collider2.shape.Axes();
        //  Loop over the axes for polygon1
        for (var i = 0; i < axes1.length; i++) {
            var axis = axes1[i];
            //  Project both polygons onto the axis
            var p1 = collider1.shape.project(axis);
            var p2 = collider2.shape.project(axis);
            //  Do the projections overlap? if no we can exit
            if (!CollisionManager.Overlaps(p1, p2)) {
                return false;
            }
        }
        //  Loop over the axes for polygon2
        for (var i = 0; i < axes2.length; i++) {
            var axis = axes2[i];
            //  Project both polygons onto the axis
            var p1 = collider1.shape.project(axis);
            var p2 = collider2.shape.project(axis);
            //  Do the projections overlap? if no we can exit
            if (!CollisionManager.Overlaps(p1, p2)) {
                return false;
            }
        }
        //  If all axes have overlap then the polygons are colliding
        return true;
    }

    /**
     * Checks if the projections overlap
     * @param {Array} proj1 
     * @param {Array} proj2 
     * @return {Boolean}
     */
    static Overlaps(proj1, proj2) {
        if (proj1['min'] <= proj2['max'] && proj2['min'] <= proj1['max']) {
            return true;
        }
        return false;
    }
}