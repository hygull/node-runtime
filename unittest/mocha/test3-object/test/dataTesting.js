var assert = require("chai").assert
var expect = require("chai").expect

describe("Testing data and their types", function(){
	it("number type test for 4 - done", function(){ 
		assert.typeOf(4, "number", "4 is of type integer")
	})

	it("number type test for 4.67 - done", function(){ 
		assert.typeOf(4.67, "number", "4.67 is of type integer")
	})

	it("object type test for {name: 'Let Us C'} - done", function(){ 
		assert.typeOf({name: 'Let Us C'}, "object", "4 is of type integer")
	})

	it("object type test for [1, 3, 4] - done", function(){ 
		expect([1, 3, 4]).to.be.a("array")
	})
})


