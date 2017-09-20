const assert = require("chai").assert;

const app = require("../app")


describe("Hello App", function(){
		it("It should return 'Hello coders'", function(){
			assert.equal(app(), "Hello coders")
		})
})

// describe("Hello App", function(){
// 		it("It should return 'Hello coders'", function(){
// 			assert.equal(app(), "Hello doctors")
// 		})
// })


