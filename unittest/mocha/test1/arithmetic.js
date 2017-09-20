var obj = {}

obj["addition"] = function(num1, num2){
					return num1+num2
				}

obj["subtraction"] = function(num1, num2){
					return num1-num2
				}

obj["multiplication"] = function(num1, num2){
					return num1*num2
				}

obj["division"] = function(num1, num2){
					return num1/num2
				}

obj["isDivisorNotZero"] = function(num1, num2){
	if (num2 === 0) {
		return false
	}
	return true
}

module.exports = obj