const assert = require("chai").assert;

const obj = require("../arithmetic")

//Addition
describe("Arithmetic operations:-", function(){
	describe("Addition", function(){
		it("addition(10, 5) equals 15", function(){
			let result = obj.addition(10, 5)
			assert.equal(result, 15)
		})

		it("addition(10, 5) is greater than 10", function(){
			let result = obj.addition(10, 5)
			assert.isAbove(result, 10)
		})

		it("addition(10, 5) returns a number", function(){
			let result = obj.addition(10, 5)
			assert.typeOf(result, "number")
		})
	})

	//Subtraction
	describe("Subtraction", function(){
		it("subtraction(10, 5) equals 5", function(){
			let result = obj.subtraction(10, 5)
			assert.equal(result, 5)
		})

		it("subtraction(10, 5) is less than 8", function(){
			let result = obj.subtraction(10, 5)
			assert.isBelow(result, 8)
		})

		it("subtraction(10, 5) returns a number", function(){
			let result = obj.subtraction(10, 5)
			assert.typeOf(result, "number")
		})
	})

	//Multiplication
	describe("Multiplication", function(){
		it("multiplication(10, 5) equals 50", function(){
			let result = obj.multiplication(10, 5)
			assert.equal(result, 50)
		})

		it("multiplication(10, 5) is less than 51", function(){
			let result = obj.multiplication(10, 5)
			assert.isBelow(result, 51)
		})

		it("multiplication(10, 5) returns a number", function(){
			let result = obj.multiplication(10, 5)
			assert.typeOf(result, "number")
		})
	})

	//Divison
	describe("Division", function(){
		it("isDivisorNotZero(10, 5) returns true", function(){
			let result = obj.isDivisorNotZero(10, 5)
			assert.equal(result, true)
		})

		it("divison(10, 5) equals 2", function(){
			let result = obj.division(10, 5)
			assert.equal(result, 2)
		})
	})
})