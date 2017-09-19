module.exports = {
	addition: function(a, b){
		return a+b;
	},

	subtraction: function(a, b){
		return a-b;
	},

	multiplication: function(a, b){
		return a*b
	},

	division: function(a, b){
		return a/b
	},

	isDivisorZero: function(a, b){
		if(b == 0){
			return true
		} else {
			return false
		}
	}
}
