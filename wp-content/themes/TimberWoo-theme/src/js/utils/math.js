export default const math = {

	// Interpolation
	lerp: (a, b, n) => {
		return (1 - n) * a + n * b
	},

	// Normalization
	norm: (value, min, max) => {
	  	return (value - min) / (max - min)
	}
	
}