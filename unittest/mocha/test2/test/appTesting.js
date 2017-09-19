var assert = require("chai").assert

var obj = require("../app.js")

// console.log(obj)


describe("Arithemetic operations:-", function(){
	
	describe("Addition:", function(){
		it("Addition of integers should be 15", function(){
			var result = obj.addition(10,5)
			assert.equal(result, 15)
		});
	})
	
	describe("Subtraction:", function(){
		it("Subtraction of integers should be 5", function(){
			var result = obj.subtraction(10,5)
			assert.equal(result, 5)
		});
	})

	describe("Multiplication:", function(){
		it("Multiplication of 2 integers should be 50", function(){
			var result = obj.multiplication(10,5)
			assert.equal(result, 50)
		});

		it("Multiplication of 2 integers should be > 40", function(){
			var result = obj.multiplication(10,5)
			assert.isAbove(result, 40)
		});
	})

	describe("Division:", function(){
		it("Divisor should not be 0", function(){
			var result = obj.isDivisorZero(10,5)
			assert.equal(result, false)
		});

		it("Division of integers should be 2", function(){
			var result = obj.division(10,5)
			assert.equal(result, 2)
		});

	})
})