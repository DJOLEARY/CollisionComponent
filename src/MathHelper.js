class MathHelper {

	static Magnitude(vec) {
		return Math.sqrt((vec.x * vec.x) + (vec.y * vec.y))
	}

	static Normalize(vec) {
		mag = MathHelper.Magnitude(vec)
		normalizedVec.x = vec.x / mag
		normalizedVec.y = vec.y / mag
		return normalizedVec
	}

	static Distance(vec1, vec2) {
		return Math.sqrt(MathHelper.DistanceSquared(vec1, vec2))
	}

	static DistanceSquared(vec1, vec2) {
		return Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2)
	}

	static DegreesToRadians(angle) {
		return angle * (Math.PI / 180)
	}

	static RadiansToDegrees(angle) {
		return angle * (180 / Math.PI)
	}

	static MultiplyMatrices(m1, m2) {
		var result = []
		for (var i = 0; i < m1.length; i++) {
			result[i] = []
			for (var j = 0; j < m2[0].length; j++) {
				var sum = 0
				for (var k = 0; k < m1[0].length; k++) {
					sum += m1[i][k] * m2[k][j]
				}
				result[i][j] = sum
			}
		}
		return result
	}

	static AddMatrices(m1, m2) {
		var result = []
		for (var i = 0; i < m1.length; i++) {
			result[i] = [m1[i][0] + m2[i][0], m1[i][1] + m2[i][1]]
		}
		return result
	}

	static SubMatrices(m1, m2) {
		var result = []
		for (var i = 0; i < m1.length; i++) {
			result[i] = [m1[i][0] - m2[i][0], m1[i][1] - m2[i][1]]
		}
		return result
	}

}